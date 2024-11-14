
"use client"
import classes from "@/app/dashboard/components/css/dashboard.module.css";
import { useQuery } from "@apollo/client";
import { Paper } from "@mantine/core";
import { GET_EVENT_CARD } from "../query/get_percent";
import NoDataComponent from "./nodataComponent";

function NewEvents() {
    const {data, loading, error} = useQuery(GET_EVENT_CARD);
    return (
        <>
        <p className={classes.taskEventTitle}> Task and Events </p>
            {
                data?.events?.length < 1 && error ?
                <div className="grid gap-x-8 gap-y-8 w-full md:grid-cols-2 grid-cols-1 ">
                    {
                        data?.events.map((e: { title: any; events: { start_date: any; title: any; start_time: any; description: any; }; }) => (
                            <EventButton key={e?.title} date={e?.events?.start_date}  title={e?.events?.title} time={e?.events?.start_time} desc={e?.events?.description}  />
                        ))
                    }
                </div> :
                <NoDataComponent button_msg={"Add event"} link={"#"} comment="No event have been created yet. Click the button bellow to add new events." />
            }
    
        </>
    );
}

export default NewEvents;


function EventButton({title, time, desc, date}:any){

    return(<>
        <div className="flex flex-row items-center gap-3">
            <EventDateBox date={date} />
            <div className="flex flex-col w-full "> 
                <div className={"flex flex-row w-full justify-between"}>
                    <div className={classes.eventTitle}>{title}</div>
                    <div className={classes.eventTime}> {time}</div>
                </div>
                <div className={`${classes.eventDesc}`}> {desc} </div>
            </div>
        </div>
    </>);
}

function EventDateBox({date}:any){

    return(<>
        <div className={classes.dateEvent}>
            <span className={classes.dateSpan}> 18 </span>
            <span className={classes.dateSpan}> FEB </span>
        </div>
    </>);
}