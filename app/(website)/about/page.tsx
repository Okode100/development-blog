import { getAllAuthors, getSettings } from "@/lib/sanity/client";
import About from "./about";
import { Metadata } from "next";

export const revalidate = 0; // Revalidate the page at the edge

export async function generateMetadata() {
  const settings = await getSettings();
  return {
    title: `About Us | ${settings?.title || ""}`,
    description: "Meet our team of content creators and experts"
  };
}

export default async function AboutPage() {
  const authors = await getAllAuthors();
  const settings = await getSettings();
  return <About settings={settings} authors={authors} />;
}