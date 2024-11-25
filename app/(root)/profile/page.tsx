import { Collection } from "@/components/Collection";
import { Button } from "@/components/ui/button";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import Link from "next/link";
import React from "react";

const page = async () => {
  const user = await currentUser();
  const events = await db.event.findMany({ where: { userId: user?.id } });
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">My Tickets</h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/#events">Explore More Events</Link>
          </Button>
        </div>
      </section>
      <section className="wrapper my-8">
        <Collection
          data={events}
          emptyTitle="No event tickets purchased yet"
          emptyStateSubtext="No worries - plenty of exciting events to explore!"
          collectionType="My_Tickets"
        />
      </section>
    </>
  );
};

export default page;
