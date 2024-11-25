"use client";

import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import qs from "query-string";
import { categories } from "@/lib/constant";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
export const CategoryFilter = () => {
    const [value, setValue] = useState("")
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const currentTitle = searchParams.get("title")
    useEffect(() => {
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                title: currentTitle,
                category: value
            }
        } , {skipNull: true, skipEmptyString: true})
        router.push(url, { scroll: false })
    }, [value, pathname, router, currentTitle])
  return (
    <div className="flex justify-between w-full items-center">
        <Select onValueChange={(value) => setValue(value)}>
<SelectTrigger>
    <SelectValue placeholder="Select Category" />
</SelectTrigger>
<SelectContent>
    {categories.map((category)=> (
        <SelectItem key={category} value={category} className="select-item p-regular-14">
            {category}
        </SelectItem>
    ))}
</SelectContent>
    </Select>
    <Button onClick={() => setValue("")}>
        Clear
    </Button>
    </div>
  )
}
