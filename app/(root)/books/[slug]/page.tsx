import React from "react";
import { auth } from "@clerk/nextjs/server";
import { getBookBySlug } from "@/lib/actions/book.actions";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import VapiControls from "@/components/VapiControls";

export default async function BookDetailsPage({
                                                params,
                                              }: {
  params: Promise<{ slug: string }>;
}) {

  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const { slug } = await params;

  const result = await getBookBySlug(slug);

  if (!result.success || !result.data) {
    redirect("/");
  }

  const book = result.data;

  return (
      <div className="book-page-container mx-auto max-w-4xl px-4 py-8">

        {/* Floating Back Button */}
        <Link href="/" className="back-btn-floating">
          <ArrowLeft className="size-6 text-[#212a3b]" />
        </Link>

        <VapiControls book={book} />

      </div>
  );
}