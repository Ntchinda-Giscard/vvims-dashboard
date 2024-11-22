"use client"
import {useEffect, useState} from "react";
import { Scheduler } from "@bitnoi.se/react-scheduler"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
// import '@fullcalendar/core/main.css';
// import '@fullcalendar/daygrid/main.css';
// import '@fullcalendar/timegrid/main.css';
// import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import { useNextCalendarApp, ScheduleXCalendar, useCalendarApp } from '@schedule-x/react';
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar';
import { createEventsServicePlugin } from '@schedule-x/events-service'
import '@schedule-x/theme-default/dist/index.css';


export default function MyCalendar(){
    const [isLoading, setIsLoading] = useState(false);
    const events = [
      { id: '1', title: 'Meeting', start: '2024-11-21T10:00:00', end: '2024-11-21T11:00:00' },
      { id: '2', title: 'Lunch', start: '2024-11-21T12:00:00', end: '2024-11-21T13:00:00' },
    ];
    const plugins = [createEventsServicePlugin()]
    const calendar = useCalendarApp({
      views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
      events: [
        {
          id: '1',
          title: 'Event 1',
          start: '2024-11-22 09:00',
          end: '2024-11-22 14:00',
        },
      ],
      selectedDate: '2024-11-22'
    }, plugins)

    useEffect(() => {
      setIsLoading(true);

      // fetching data
      calendar.eventsService.getAll()
      setIsLoading(false);
    }, [calendar]);

    
    return(
        <>
        <div className='relative w-full h-full'>
          <ScheduleXCalendar calendarApp={calendar} />
            {/* <FullCalendar
                // plugins={[dayGridPlugin]}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView='dayGridMonth'
                weekends={false}
                events={events}
                headerToolbar={{
                        start: "taday, prev,next", 
                        end: "dayGridMonth,timeGridWeek,timeGridDay", 
                        center: "title",
                    }
                }
            /> */}
        </div>
        </>
    )
}



function renderEventContent(eventInfo: any) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
  }