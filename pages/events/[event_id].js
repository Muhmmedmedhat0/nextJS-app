import React from "react";
import Head from 'next/head';

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
      <Head>
      <title>{event.title}</title>
      <meta name="description" content={event.description} />
    </Head>
    <main>
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
    </main>
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
      * fallback: false // render 404 page for unknown id
      * fallback: true // tell next there are more pages to be generated than the ones that we prepared here
      * fallback: 'blocking' 
              /* nextjs will not serve any thing untill 
                we are done generating the page and the
                loading takes longer and got the entire
                page right from the start
     */
    fallback: true,
  };
}

export default EventDetailPage;
