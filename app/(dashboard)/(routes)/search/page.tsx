import { getCourses } from "@/action/get-courses";
import { CoursesList } from "@/components/courses-list";
import SearchInput from "@/components/search-input";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import Categories from "./_components/categories";

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}

export const metadata: Metadata = {
  title: "Home | LearnSync | Abhijeet Kumar",
  description:
    "LearnSync, created by Abhijeet Kumar, is a platform designed to synchronize and streamline your learning process. Explore tools and resources to enhance your educational journey.",
  keywords: [
    "LearnSync",
    "Abhijeet Kumar",
    "learning platform",
    "education tools",
    "online learning",
    "study resources",
  ],
  authors: [
    {
      name: "Abhijeet Kumar",
      url: "https://www.linkedin.com/in/abhijeetkumar29/details/recommendations/",
    },
  ],
  openGraph: {
    title: "LearnSync - Streamline Your Learning | Abhijeet Kumar",
    description:
      "Join LearnSync to enhance your learning experience with tools and resources curated by Abhijeet Kumar.",
    url: "https://www.linkedin.com/in/abhijeetkumar29/details/recommendations/",
    siteName: "LearnSync",
    images: [
      {
        url: "https://i.pinimg.com/736x/03/38/49/033849c02cce59f381bc7d122f71d737.jpg",
        width: 800,
        height: 600,
        alt: "LearnSync - Streamline Your Learning",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LearnSync - Streamline Your Learning | Abhijeet Kumar",
    description:
      "Discover LearnSync, a platform by Abhijeet Kumar, designed to enhance your learning experience with innovative tools and resources.",
    images: [
      "https://i.pinimg.com/736x/03/38/49/033849c02cce59f381bc7d122f71d737.jpg",
      "https://i.pinimg.com/736x/74/f9/56/74f9569e940a6155371ee950544e4f38.jpg",
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }
  const courses = await getCourses({
    userId,
    ...searchParams,
  });
  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6 space-y-4">
        <Categories items={categories} />
        <CoursesList items={courses} />
      </div>
    </>
  );
};

export default SearchPage;
