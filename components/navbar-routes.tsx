"use client"

import { UserButton } from "@clerk/nextjs";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import SearchInput from "./search-input";

const NavbarRoutes = () => {
    const pathName = usePathname();

    const isTeacherPage = pathName?.startsWith("/teacher");
    const isCoursePage = pathName?.includes("/courses");
    const isSearchPage = pathName === "/search";

    return (
        <>
            {isSearchPage && (
                <div className="hidden md:block">
                    <SearchInput />
                </div>
            )}
            <div className="flex gap-x-2 ml-auto">
                {isTeacherPage || isCoursePage ?
                    (
                        <Link href="/">
                            <Button size="sm" variant="ghost">
                                <LogOut className="h-4 w-4 mr-2" />
                                Exit
                            </Button>
                        </Link>

                    ) : (
                        <Link href="/teacher/courses">
                            <Button size="sm" variant="ghost">
                                Teacher Mode
                            </Button>
                        </Link>
                    )

                }
                <UserButton
                    afterSignOutUrl="/"
                />
            </div>
        </>

    );
}

export default NavbarRoutes;