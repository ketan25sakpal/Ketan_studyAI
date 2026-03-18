'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { SearchIcon } from 'lucide-react';

const Search = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const query = searchParams.get('query') || '';

    const [text, setText] = useState(query);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            const params = new URLSearchParams(searchParams);

            if (text) {
                params.set('query', text);
            } else {
                params.delete('query');
            }

            router.push(`${pathname}?${params.toString()}`, { scroll: false });
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [text, searchParams, pathname, router]);

    return (
        <div className="library-search-wrapper">
            <SearchIcon className="ml-4 w-5 h-5 text-[#3d485e]" />
            <input
                type="text"
                placeholder="Search by title or author"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="library-search-input"
            />
        </div>
    );
};

export default Search;
