"use client"
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import qs from 'query-string'
import { SearchIcon } from 'lucide-react'
import { Input } from './ui/input'

export const Search = () => {
    const [title, setTitle] = useState("")
    const router = useRouter()
    const searchParams = useSearchParams()
    const category = searchParams.get("category")
    const pathname = usePathname()
    useEffect(() => {
        const debounce = setTimeout(()=> {
            const url = qs.stringifyUrl({
                url: pathname,
                query: {
                    title,
                    category
                }
            }, {skipNull: true, skipEmptyString: true})
            router.push(url, { scroll: false })
        }, 2000)
        return () => clearTimeout(debounce)
    })
  return (
    <div className="flex-center min-h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
        <SearchIcon className="mr-2 h-4 w-4 text-grey-400" />
        <Input 
        type="text"
        placeholder={"Search by title..."}
        onChange={(e) => setTitle(e.target.value)}
        className="p-regular-16 border-0 bg-grey-50 outline-offset-0 placeholder:text-grey-500 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    </div>
  )
}
