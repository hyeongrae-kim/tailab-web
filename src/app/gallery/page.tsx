import type { Metadata } from "next";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { Section } from "@/components/ui/Section";
import { getGalleryItems } from "@/lib/notion";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Lab photos and events gallery.",
};

export const revalidate = 3600;

export default async function GalleryPage() {
  const items = await getGalleryItems();

  return (
    <Section title="Gallery" description="Photos from seminars, conferences, and lab events.">
      <GalleryGrid items={items} />
    </Section>
  );
}
