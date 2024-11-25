"use client";
import { Event } from "@prisma/client";
import { Button } from "./ui/button";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { CheckCircle } from "lucide-react";

export const CheckOutButton = ({ event }: { event: Event }) => {
  const hasEventFinished = new Date(event.startTime) < new Date();
  const searchParams = useSearchParams();
  const onClick = async () => {
    try {
        const res = await axios.post(`/api/events/${event.id}/checkout`)
        window.location.href = res.data.url
    } catch (error) {
        console.log(error);
    }
  };
  return (
    <div className="flex items-center gap-3">
      {hasEventFinished ? (
        <p className="p-2 text-red-400">
          Sorry, tickets are no longer available.
        </p>
      ) : (
        <>
          <Button onClick={onClick} size="lg" className="button sm:w-fit">
       {searchParams.get("success") ? <CheckCircle className="mr-2 h-4 w-4 stroke-green-600" /> : "Buy Now"}
      </Button>
        </>
      )}
    </div>
  );
};
