import React from 'react'
import Hero from '@/components/Hero'
import BookCard from "@/components/BookCard";
import {getAllBooks} from "@/lib/actions/book.actions";
import Search from "@/components/Search";

export const dynamic = 'force-dynamic';

interface Props {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const Page = async ({ searchParams }: Props) => {
    const { query } = await searchParams;
    const bookResults = await getAllBooks(query as string)
    const books = bookResults.success ? bookResults.data ?? [] : []
    return (
        <main className="wrapper container">
            <Hero />

            <div className="mt-10 mb-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <h2 className="section-title">Recent Books</h2>
                <Search />
            </div>

            <div className="library-books-grid">
                {books.length > 0 ? (
                    books.map((book) => (
                        <BookCard key={book._id} title={book.title} author={book.author} coverURL={book.coverURL} slug={book.slug} />
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center">
                        <p className="text-xl text-[var(--text-secondary)]">No books found matching your search.</p>
                    </div>
                )}
            </div>
        </main>
    )
}
export default Page
