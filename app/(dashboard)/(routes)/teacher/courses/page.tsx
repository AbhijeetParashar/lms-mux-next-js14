import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

export const metadata: Metadata = {
  title: "Analytics | LearnSync | Abhijeet Kumar",
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
        url: "https://github-production-user-asset-6210df.s3.amazonaws.com/53019674/410917980-9cd35b97-de2d-475c-a79c-e8eac1122558.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20250207%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250207T125447Z&X-Amz-Expires=300&X-Amz-Signature=7c160eb515969822d2635efd2f4329bbf657e72e3b50fbc6c705785409bafd7b&X-Amz-SignedHeaders=host",
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
      "https://github-production-user-asset-6210df.s3.amazonaws.com/53019674/410917980-9cd35b97-de2d-475c-a79c-e8eac1122558.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20250207%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250207T125447Z&X-Amz-Expires=300&X-Amz-Signature=7c160eb515969822d2635efd2f4329bbf657e72e3b50fbc6c705785409bafd7b&X-Amz-SignedHeaders=host",
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

const CoursesPage = async () => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const courses = await db.course.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="p-6">
      <DataTable columns={columns} data={courses} />
    </div>
  );
};

export default CoursesPage;
