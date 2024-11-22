"use client"
import {useEffect, useState} from "react";
import { Scheduler } from "@bitnoi.se/react-scheduler"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useNextCalendarApp, ScheduleXCalendar, useCalendarApp } from '@schedule-x/react';
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar';
import { createEventsServicePlugin } from '@schedule-x/events-service'
import '@schedule-x/theme-default/dist/index.css';
import { GET_EVENTS_CALENDAR} from "@/app/dashboard/calendar/query/query";
import { useQuery } from "@apollo/client";
import {useSelector} from "react-redux";


export default function MyCalendar(){
    const [isLoading, setIsLoading] = useState(false);
    const userInfo = useSelector((state: any) => state.auth.userInfo)
    const {data: dataEvent, loading: loadEvent, error: errEvents} = useQuery(GET_EVENTS_CALENDAR, {
        variables:{
            employee_id: userInfo?.employee?.id
        }
    })
    const events = [
      { id: '1', title: 'Meeting', start: '2024-11-21T10:00:00', end: '2024-11-21T11:00:00' },
      { id: '2', title: 'Lunch', start: '2024-11-21T12:00:00', end: '2024-11-21T13:00:00' },
    ];
    const plugins = [createEventsServicePlugin()]
    const calendar = useCalendarApp({
      views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
      events: [
        {
          id: 'da77ee8e-bb7b-4789-a19c-2c0341f835dd',
          title: 'Event 1',
          start: '2024-11-22 09:00',
          end: '2024-11-22 14:00',
        },
      ],
      selectedDate: new Date().toISOString().split('T')[0]
    }, plugins)

    useEffect(() => {
      setIsLoading(true);

      // fetching data
      calendar.eventsService.getAll()
      setIsLoading(false);
      console.log("Events calendar :", dataEvent)
    }, [calendar, dataEvent]);

    
    return(
        <>
        <div className='relative w-full h-[500px]'>
          <ScheduleXCalendar
              calendarApp={calendar}
          />
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