import React from "react";
import { getAllEvents } from "../../helpers/api-util";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";
import { useRouter } from "next/router";

function EventsPage(props) {
  const router = useRouter();

  const { events } = props;
  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }
  return (
    <>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </>
  );
}
export async function getStaticProps(context) {
  const events = await getAllEvents();
  return {
    props: { events },
    // regenerate the page every 60 seconds
    revalidate: 60,
  };
}
export default EventsPage;
