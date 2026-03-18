'use client';

import Link from "next/link";
import Image from "next/image";
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";
import {SignedIn, SignedOut, SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";

const navItems = [
    { label: "Library", href: "/" },
    { label: "Add New", href: "/books/new" },
    { label: "Pricing", href: "/subscriptions" },
]

const Navbar = () => {
    const pathName = usePathname();
    const { user } = useUser();
    return (
        <header className="w-full fixed bg-[var(--bg-primary)] z-50">
            <div className="wrapper navbar-height py-4 flex justify-between items-center">
                <Link href="/" className="flex gap-0.5 items-center">

                    <Image src="/assets/logo.png" alt="AskMyPDF" width={42} height={26} className="rounded-full"/>
                    <span className="logo-text">AskMyPDF</span>
                </Link>

                <nav className="w-fit flex gap-7.5 items-center">
                    { navItems.map(({ label, href}) => {
                        const isActive = pathName === href || (href !== '/' && pathName.startsWith(href));

                        return (
                            <Link href={href} key={label} className={cn("nav-link-base", isActive ? 'nav-link-active': 'text-black hover:opacity-70')}>
                                {label}
                            </Link>
                        )
                    })}

                    <div className="flex gap-7.5 items-center">
                        <SignedOut>
                            <SignInButton mode="modal">
                                <button className="nav-link-base text-black hover:opacity-70">Sign In</button>
                            </SignInButton>
                        </SignedOut>
                        <SignedIn>
                            <div className="nav-user-link">
                                <UserButton />
                                {user ?.firstName && (
                                    <Link href="/subscriptions" className="nav-user-name">{user.firstName}</Link>
                                )}
                            </div>
                        </SignedIn>
                    </div>
                </nav>
            </div>
        </header>
    )
}
export default Navbar
