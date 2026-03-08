import React from 'react';
import { auth } from '@clerk/nextjs/server';
import { getBookBySlug } from '@/lib/actions/book.actions';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Mic, MicOff } from 'lucide-react';
import Image from 'next/image';

interface Props {
  params: Promise<{ slug: string }>;
}

const BookDetailsPage = async ({ params }: Props) => {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');

  const { slug } = await params;
  const result = await getBookBySlug(slug);

  if (!result.success || !result.data) {
    redirect('/');
  }

  const book = result.data;

  return (
    <div className="book-page-container mx-auto max-w-4xl px-4 py-8">
      {/* Floating Back Button */}
      <Link href="/" className="back-btn-floating">
        <ArrowLeft className="size-6 text-[#212a3b]" />
      </Link>

      <div className="flex flex-col gap-8">
        {/* Header Card */}
        <div className="vapi-header-card">
          <div className="vapi-cover-wrapper">
            <Image
              src={book.coverURL || '/images/book-placeholder.png'}
              alt={book.title}
              width={120}
              height={180}
              className="vapi-cover-image"
            />
            <button className="vapi-mic-btn vapi-mic-btn-inactive vapi-mic-wrapper">
              <MicOff className="size-6 text-[#212a3b]" />
            </button>
          </div>

          <div className="flex flex-col gap-3">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold font-serif text-[#212a3b]">
                {book.title}
              </h1>
              <p className="text-[#3d485e] font-medium">by {book.author}</p>
            </div>

            <div className="flex flex-wrap gap-2 mt-1">
              <div className="vapi-status-indicator">
                <span className="vapi-status-dot vapi-status-dot-ready" />
                <span className="vapi-status-text">Ready</span>
              </div>
              <div className="vapi-status-indicator">
                <span className="vapi-status-text">Voice: {book.persona || 'Default'}</span>
              </div>
              <div className="vapi-status-indicator">
                <span className="vapi-status-text">0:00/15:00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Transcript Area */}
        <div className="transcript-container min-h-[400px]">
          <div className="transcript-empty">
            <Mic className="size-12 text-[#212a3b] mb-4" strokeWidth={1.5} />
            <p className="transcript-empty-text">No conversation yet</p>
            <p className="transcript-empty-hint">Click the mic button above to start talking</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;
