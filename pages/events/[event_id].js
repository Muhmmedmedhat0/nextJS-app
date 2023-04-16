import React from "react";
import { getEventById, getAllEvents } from "../../helpers/api-util";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";

function EventDetailPage(props) {
  const { event } = props;

  if (!event) {
    return (
      <div>
        <h1 className="center">Loading...</h1>
      </div>
    );
  }

  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.imageAlt}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
}
//
export async function getStaticProps(context) {
  const { event_id } = context.params;
  const event = await getEventById(event_id);

  return {
    props: { event },
    // pregenerate after some time
    revalidate: 30, //seconds
  };
}
/* 
    This is Daynamic page and getStaticPaths will tell nextjs
    for wich pramter values so wich event id's 
    it should prerender this page and wich id's to call 
*/

export async function getStaticPaths() {
  const events = await getAllEvents();
  const event_ids = events.map((event) => ({ params: { event_id: event.id } }));
  return {
    paths: event_ids,
    /* USER EXPERIENCE AND PREFORMANCE
      * tell nextjs to know there are more pages to be generated
      * fallback: false // serve a 404 page for any path that is not generated at build time
      * fallback: true // tell next there are more pages to be generated than the ones that we prepared here
      
      * fallback: 'blocking' 
              /* will behave like the true option, but with one difference.
              Instead of serving a fallback page immediately on the first request,
              the server will wait for getStaticProps to finish running before serving a fully-fledged version of the page.
              This option is especially useful when you want to render content that takes a longer time to load,
              and you don't want the user to see a loading indicator.
     */
    fallback: true,
  };
}

export default EventDetailPage;
