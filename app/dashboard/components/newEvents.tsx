import classes from "@/app/dashboard/components/css/dashboard.module.css";
import { Paper } from "@mantine/core";

function NewEvents() {
    return (
        <>
        <p className={classes.taskEventTitle}> Task and Events </p>
            <div className="grid gap-x-8 gap-y-8 w-full md:grid-cols-2 grid-cols-1 ">
                <EventButton />
                <EventButton />
                <EventButton />
                <EventButton />
                <EventButton />
                <EventButton />
            </div>
    
        </>
    );
}

export default NewEvents;


function EventButton(){

    return(<>
        <div className="flex flex-row items-center gap-3">
            <EventDateBox />
            <div className="flex flex-col w-full "> 
                <div className={"flex flex-row w-full justify-between"}>
                    <div className={classes.eventTitle}> Board meeting </div>
                    <div className={classes.eventTime}> 12:00 </div>
                </div>
                <div className={`${classes.eventDesc}`}> Attend all project manageers board meeting to ake them fell cool </div>
            </div>
        </div>
    </>);
}

function EventDateBox(){

    return(<>
        <div className={classes.dateEvent}>
            <span className={classes.dateSpan}> 18 </span>
            <span className={classes.dateSpan}> FEB </span>
        </div>
    </>);
}