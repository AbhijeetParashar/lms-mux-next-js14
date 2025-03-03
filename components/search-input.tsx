"use client"

import { useDebounce } from "@/hooks/use-debounce";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import qs from "query-string"

const SearchInput = () => {
    const [value, setValue] = useState("");
    const debounceValue = useDebounce(value);

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathName = usePathname();
    const currentCategoryId = searchParams.get("categoryId");

    useEffect(() => {
        const url = qs.stringifyUrl({
            url: pathName,
            query: {
                categoryId: currentCategoryId,
                title: debounceValue
            }
        }, { skipEmptyString: true, skipNull: true })
        router.push(url)
    }, [debounceValue, router, pathName, currentCategoryId])


    return (
        <div className="relative">
            <Search className="h-4 w-4 absolute top-3 left-3 text-slate-600 " />
            <Input
                value={value}
                className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200"
                placeholder="Search for a course"
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    );
}

export default SearchInput;