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


export default function MyCalendar(){
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      setIsLoading(true);

      // fetching data
      
      setIsLoading(false);
    }, []);

    const events = [
        { title: 'Meeting', start: new Date() },
        {
            title: 'Meeting',
            start: new Date('2024-11-21T10:00:00'),
            end: new Date('2024-11-21T11:00:00'),
          },
          {
            title: 'Lunch',
            start: new Date('2024-11-21T12:00:00'),
            end: new Date('2024-11-21T13:00:00'),
          },
          { id: '1', title: 'Meeting', start: '2024-11-21T10:00:00', end: '2024-11-21T11:00:00' },
        { id: '2', title: 'Lunch', start: '2024-11-21T12:00:00', end: '2024-11-21T13:00:00' },
      ]
    return(
        <>
        <div className='relative w-full h-[600px]'>
            <FullCalendar
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
            />
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