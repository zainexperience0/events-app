"use client"

import { Button } from "@/components/ui/button"
import { Chrome } from "lucide-react"
import { signIn } from "next-auth/react"

const page = () => {
  return (
    <div className="flex-center min-h-screen w-full bg-primary-50 bg-cover bg-fixed bg-center">
      <Button onClick={()=> signIn("google")}>
        <Chrome />
        <span>Sign in with Google</span>
      </Button>
    </div>
  )
}

export default page