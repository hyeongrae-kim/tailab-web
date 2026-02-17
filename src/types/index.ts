export type Member = {
  id: string;
  name: string;
  role: string;
  email: string;
  researchInterests: string[];
  profileImage: string | null;
  isAlumni: boolean;
  sortOrder: number;
};

export type ProfessorProfile = Member & {
  biography: string;
  education: string[];
  experience: string[];
};

export type Publication = {
  id: string;
  title: string;
  authors: string;
  venue: string;
  year: number | null;
  doi: string;
  category: string;
  abstract: string;
};

export type NewsItem = {
  id: string;
  title: string;
  category: string;
  publishedAt: string | null;
  summary: string;
  imageUrl: string | null;
  isPinned: boolean;
};

export type GalleryItem = {
  id: string;
  title: string;
  date: string | null;
  description: string;
  imageUrls: string[];
};

export type ResearchArea = {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
};
