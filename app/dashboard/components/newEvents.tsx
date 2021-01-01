import classes from "@/app/dashboard/components/css/dashboard.module.css";

function NewEvents() {
    return (
        <>
        <EventButton />
    
        </>
    );
}

export default NewEvents;


function EventButton(){

    return(<>
        <div className="flex flex-row">
            <EventDateBox />
            <div className="flex flex-col"> 
                <p className={classes.eventTitle}>  </p>
                <p className={classes.eventDesc}>  </p>
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