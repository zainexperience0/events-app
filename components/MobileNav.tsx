import {
    Sheet,
    SheetContent,
    SheetTrigger,
  } from "@/components/ui/sheet"
  import Image from "next/image"
  import NavItems from "./NavItems"
import { Menu } from "lucide-react"
import { Separator } from "./ui/separator"
  
  
  const MobileNav = () => {
    return (
      <nav className="md:hidden">
        <Sheet>
          <SheetTrigger className="align-middle">
            <Menu />
          </SheetTrigger>
          <SheetContent className="flex flex-col gap-6 bg-white md:hidden">
            <Image 
              src="/assets/images/logo.svg"
              alt="logo"
              width={128}
              height={38}
            />
            <Separator className="border border-gray-50" />
            <NavItems />
          </SheetContent>
        </Sheet>
      </nav>
    )
  }
  
  export default MobileNav