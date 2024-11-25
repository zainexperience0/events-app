import { EventForm } from "@/components/EventForm"
import { db } from "@/lib/db"

interface Props {
    params: {
        id: string
    }
}
const page = async ({params}: Props) => {
    const event = await db.event.findUnique({where: {id: params.id}})
  return (
    <>
    <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
    <h3 className="wrapper h3-bold text-center sm:text-left">Update Event</h3>
  </section>

  <div className="wrapper my-8">
    <EventForm 
      type="Update" 
      intialData={event!} 
    />
  </div>
    </>
  )
}

export default page