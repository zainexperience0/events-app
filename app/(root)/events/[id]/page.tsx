import { CheckOutButton } from '@/components/CheckOutButton'
import { Collection } from '@/components/Collection'
import { db } from '@/lib/db'
import { formatDateTime } from '@/lib/utils'
import { Calendar, LocateIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
interface Props{
    params: {
        id: string
    }
}
const page = async ({params}: Props) => {
    const event = await db.event.findUnique({
        where: {
            id: params.id
        }
    })


    const relatedEventsBtCategory = await db.event.findMany({
        where: {
            category: event?.category
        }
    })

    const filteredEvents = relatedEventsBtCategory.filter((e) => e.id !== event?.id)
  return (
    <>
    <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain">
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
        <Image
          src={event?.imageUrl!}
          alt="hero image"
          width={1000}
          height={1000}
          className="h-full min-h-[300px] object-cover object-center"
        />

        <div className="flex w-full flex-col gap-8 p-5 md:p-10">
          <div className="flex flex-col gap-6">
            <h2 className='h2-bold'>{event?.title}</h2>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex gap-3">
                <p className="p-bold-20 rounded-full bg-green-500/10 px-5 py-2 text-green-700">
                  ${event?.price}
                </p>
                <p className="p-medium-16 rounded-full bg-grey-500/10 px-4 py-2.5 text-grey-500">
                  {event?.category}
                </p>
              </div>

              <p className="p-medium-18 ml-2 mt-2 sm:mt-0">
                by{' '}
                <span className="text-primary-500">{event?.createdBy}</span>
              </p>
            </div>
          </div>
          <CheckOutButton event={event!} />
          <div className="flex flex-col gap-5">
            <div className='flex gap-2 md:gap-3'>
              <Calendar className='w-6 h-6'/>
              <div className="p-medium-16 lg:p-regular-20 flex flex-wrap items-center">
                <p>
                  {formatDateTime(event?.startTime!).dateOnly} - {' '}
                  {formatDateTime(event?.startTime!).timeOnly}
                </p>
                <p>
                  {formatDateTime(event?.endTime!).dateOnly} -  {' '}
                  {formatDateTime(event?.endTime!).timeOnly}
                </p>
              </div>
            </div>

            <div className="p-regular-20 flex items-center gap-3">
              <LocateIcon className="w-6 h-6" />
              <p className="p-medium-16 lg:p-regular-20">{event?.location}</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="p-bold-20 text-grey-600">What You&apos;ll Learn:</p>
            <p className="p-medium-16 lg:p-regular-18">{event?.description}</p>
            <p className="p-medium-16 lg:p-regular-18 truncate text-primary-500 underline">{event?.url}</p>
          </div>
        </div>
      </div>
    </section>

    {/* EVENTS with the same category */}
    <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
      <h2 className="h2-bold">Related Events</h2>

      <Collection
          data={filteredEvents!}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
        />
    </section>
    </>
  )
}

export default page