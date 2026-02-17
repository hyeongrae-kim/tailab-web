import { Client } from "@notionhq/client";
import type {
  BlockObjectResponse,
  PageObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";
import type {
  GalleryItem,
  Member,
  NewsItem,
  ProfessorProfile,
  Publication,
  ResearchArea,
} from "@/types";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

type PropertyValue = PageObjectResponse["properties"][string];

function hasNotionAuth(): boolean {
  return Boolean(process.env.NOTION_API_KEY);
}

function textFromRichText(items: RichTextItemResponse[]): string {
  return items.map((item) => item.plain_text).join("").trim();
}

function getPropertyByName(page: PageObjectResponse, names: string[]): PropertyValue | undefined {
  const normalizedNames = names.map((name) => name.toLowerCase());

  for (const [key, value] of Object.entries(page.properties)) {
    if (normalizedNames.includes(key.toLowerCase())) {
      return value;
    }
  }

  return undefined;
}

function getPropertyByType(page: PageObjectResponse, type: PropertyValue["type"]): PropertyValue | undefined {
  return Object.values(page.properties).find((value) => value.type === type);
}

function textFromProperty(property: PropertyValue | undefined): string {
  if (!property) {
    return "";
  }

  switch (property.type) {
    case "title":
      return textFromRichText(property.title);
    case "rich_text":
      return textFromRichText(property.rich_text);
    case "select":
      return property.select?.name ?? "";
    case "status":
      return property.status?.name ?? "";
    case "email":
      return property.email ?? "";
    case "phone_number":
      return property.phone_number ?? "";
    case "url":
      return property.url ?? "";
    case "number":
      return property.number === null ? "" : String(property.number);
    case "date":
      return property.date?.start ?? "";
    case "multi_select":
      return property.multi_select.map((item) => item.name).join(", ");
    case "formula":
      return property.formula.type === "string" ? property.formula.string ?? "" : "";
    default:
      return "";
  }
}

function boolFromProperty(property: PropertyValue | undefined): boolean {
  if (!property) {
    return false;
  }

  if (property.type === "checkbox") {
    return property.checkbox;
  }

  if (property.type === "status") {
    return property.status?.name.toLowerCase() === "alumni";
  }

  if (property.type === "select") {
    return property.select?.name.toLowerCase() === "alumni";
  }

  return false;
}

function numberFromProperty(property: PropertyValue | undefined): number {
  if (!property) {
    return 9999;
  }

  if (property.type === "number") {
    return property.number ?? 9999;
  }

  const parsed = Number(textFromProperty(property));
  return Number.isFinite(parsed) ? parsed : 9999;
}

function firstFileUrl(property: PropertyValue | undefined): string | null {
  if (!property || property.type !== "files" || property.files.length === 0) {
    return null;
  }

  const file = property.files[0];
  return "external" in file ? file.external.url : file.file.url;
}

function pageCoverUrl(page: PageObjectResponse): string | null {
  if (!page.cover) {
    return null;
  }

  return page.cover.type === "external" ? page.cover.external.url : page.cover.file.url;
}

function isPageObject(result: unknown): result is PageObjectResponse {
  return typeof result === "object" && result !== null && "object" in result && (result as { object: string }).object === "page";
}

async function queryPages(databaseId: string | undefined, limit = 100): Promise<PageObjectResponse[]> {
  if (!hasNotionAuth() || !databaseId) {
    return [];
  }

  const response = await notion.databases.query({
    database_id: databaseId,
    page_size: limit,
    sorts: [{ timestamp: "created_time", direction: "descending" }],
  });

  return response.results.filter(isPageObject);
}

function mapPageToNews(page: PageObjectResponse): NewsItem {
  const title = textFromProperty(getPropertyByName(page, ["title", "name", "제목"])) || textFromProperty(getPropertyByType(page, "title"));
  const category = textFromProperty(getPropertyByName(page, ["category", "카테고리"]));
  const publishedAt = textFromProperty(getPropertyByName(page, ["date", "published", "날짜"])) || null;
  const summary = textFromProperty(getPropertyByName(page, ["summary", "description", "요약", "본문"]));
  const isPinned = boolFromProperty(getPropertyByName(page, ["pinned", "isPinned", "고정"]));

  return {
    id: page.id,
    title: title || "Untitled",
    category,
    publishedAt,
    summary,
    imageUrl: pageCoverUrl(page),
    isPinned,
  };
}

export async function getMembers(): Promise<Member[]> {
  const pages = await queryPages(process.env.NOTION_MEMBERS_DB_ID, 200);

  const members = pages.map((page) => {
    const interestsText = textFromProperty(getPropertyByName(page, ["researchInterests", "interests", "연구관심사"]));

    return {
      id: page.id,
      name:
        textFromProperty(getPropertyByName(page, ["name", "이름"])) ||
        textFromProperty(getPropertyByType(page, "title")) ||
        "Unnamed",
      role: textFromProperty(getPropertyByName(page, ["role", "position", "직급", "직위"])),
      email: textFromProperty(getPropertyByName(page, ["email", "e-mail", "이메일"])),
      researchInterests: interestsText
        ? interestsText.split(",").map((item) => item.trim()).filter((item) => item.length > 0)
        : [],
      profileImage:
        firstFileUrl(getPropertyByName(page, ["profileImage", "photo", "image", "프로필"])) ||
        pageCoverUrl(page),
      isAlumni: boolFromProperty(getPropertyByName(page, ["isAlumni", "alumni", "졸업여부"])),
      sortOrder: numberFromProperty(getPropertyByName(page, ["sortOrder", "order", "정렬순서"])),
    };
  });

  return members.sort((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name));
}

export async function getProfessorProfile(): Promise<ProfessorProfile | null> {
  const members = await getMembers();
  if (members.length === 0) {
    return null;
  }

  const professor =
    members.find((member) => member.role.toLowerCase().includes("professor")) ?? members[0];

  return {
    ...professor,
    biography: "Profile content will be populated from Notion.",
    education: [],
    experience: [],
  };
}

export async function getPublications(): Promise<Publication[]> {
  const pages = await queryPages(process.env.NOTION_PUBLICATIONS_DB_ID, 200);

  return pages.map((page) => ({
    id: page.id,
    title:
      textFromProperty(getPropertyByName(page, ["title", "name", "제목"])) ||
      textFromProperty(getPropertyByType(page, "title")) ||
      "Untitled publication",
    authors: textFromProperty(getPropertyByName(page, ["authors", "저자"])),
    venue: textFromProperty(getPropertyByName(page, ["venue", "journal", "conference", "학회/저널"])),
    year: (() => {
      const value = numberFromProperty(getPropertyByName(page, ["year", "연도"]));
      return value === 9999 ? null : value;
    })(),
    doi: textFromProperty(getPropertyByName(page, ["doi", "DOI"])),
    category: textFromProperty(getPropertyByName(page, ["category", "카테고리"])),
    abstract: textFromProperty(getPropertyByName(page, ["abstract", "요약"])),
  }));
}

export async function getNews(limit = 10): Promise<NewsItem[]> {
  const pages = await queryPages(process.env.NOTION_NEWS_DB_ID, limit);
  const news = pages.map(mapPageToNews);

  return news.sort((a, b) => {
    if (a.isPinned !== b.isPinned) {
      return Number(b.isPinned) - Number(a.isPinned);
    }

    const left = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
    const right = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
    return right - left;
  });
}

export async function getNewsById(id: string): Promise<NewsItem | null> {
  if (!hasNotionAuth()) {
    return null;
  }

  try {
    const response = await notion.pages.retrieve({ page_id: id });
    if (!isPageObject(response)) {
      return null;
    }

    return mapPageToNews(response);
  } catch {
    return null;
  }
}

export async function getResearchAreas(): Promise<ResearchArea[]> {
  const pages = await queryPages(process.env.NOTION_RESEARCH_DB_ID, 50);

  return pages.map((page) => ({
    id: page.id,
    title:
      textFromProperty(getPropertyByName(page, ["title", "name", "연구분야"])) ||
      textFromProperty(getPropertyByType(page, "title")) ||
      "Untitled research area",
    description: textFromProperty(getPropertyByName(page, ["description", "설명"])),
    imageUrl:
      firstFileUrl(getPropertyByName(page, ["image", "thumbnail", "대표이미지"])) ||
      pageCoverUrl(page),
  }));
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  const pages = await queryPages(process.env.NOTION_GALLERY_DB_ID, 100);

  return pages.map((page) => {
    const files = getPropertyByName(page, ["images", "image", "사진", "이미지"]);
    const imageUrls =
      files && files.type === "files"
        ? files.files.map((file) => ("external" in file ? file.external.url : file.file.url))
        : [];

    return {
      id: page.id,
      title:
        textFromProperty(getPropertyByName(page, ["title", "name", "제목"])) ||
        textFromProperty(getPropertyByType(page, "title")) ||
        "Untitled gallery item",
      date: textFromProperty(getPropertyByName(page, ["date", "날짜"])) || null,
      description: textFromProperty(getPropertyByName(page, ["description", "설명"])),
      imageUrls,
    };
  });
}

export async function getPageBlocks(blockId: string): Promise<BlockObjectResponse[]> {
  if (!hasNotionAuth()) {
    return [];
  }

  try {
    const response = await notion.blocks.children.list({ block_id: blockId, page_size: 100 });
    return response.results.filter((result): result is BlockObjectResponse => result.object === "block");
  } catch {
    return [];
  }
}
