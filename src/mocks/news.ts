import type { NewsItem } from "@/types";

export const NEWS_MOCK_DATA: NewsItem[] = [
  {
    id: "mock-news-1",
    title: "TAILAB seminar series opens with Trustworthy AI keynote",
    category: "Seminar",
    publishedAt: "2026-02-15",
    summary:
      "The semester opened with a keynote on dependable AI deployment, focusing on transparency and robustness evaluation.",
    imageUrl: "/images/mock/news-trustworthy-ai.jpg",
    isPinned: false,
  },
  {
    id: "mock-news-2",
    title: "New project launched on Neural-Symbolic planning for education",
    category: "Research",
    publishedAt: "2026-01-30",
    summary:
      "The lab started a joint project to integrate symbolic planning with LLM-based tutoring agents for interpretable decisions.",
    imageUrl: "/images/mock/news-neural-symbolic.jpg",
    isPinned: false,
  },
  {
    id: "mock-news-3",
    title: "Paper accepted on controllable generation for Korean academic writing",
    category: "Publication",
    publishedAt: "2026-01-09",
    summary:
      "Our latest NLP study introduces control objectives for fluent, style-aware writing assistance in multilingual settings.",
    imageUrl: "/images/mock/news-nlp-paper.jpg",
    isPinned: false,
  },
  {
    id: "mock-news-4",
    title: "Undergraduate research internship applications are now open",
    category: "Announcement",
    publishedAt: "2025-12-18",
    summary:
      "Applications are open for students interested in language technologies and responsible AI systems.",
    imageUrl: "/images/mock/news-internship.jpg",
    isPinned: false,
  },
];

export function getLatestMockNews(limit = 3): NewsItem[] {
  return [...NEWS_MOCK_DATA]
    .sort((a, b) => {
      const left = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
      const right = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
      return right - left;
    })
    .slice(0, limit);
}
