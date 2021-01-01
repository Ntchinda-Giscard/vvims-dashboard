import {Paper, Badge, Avatar} from "@mantine/core"
import classes from "@/app/dashboard/components/css/dashboard.module.css"
import cx from "clsx";

function RecentAppointment() {



    return ( <>
        <Paper
            withBorder
            p={15}
        >
            <p className={cx([classes.titleCars])}> Upcoming Appointment </p>
            <div className="flex flex-row gap-3 mb-3">
                <Badge styles={{
                    label:{
                        textTransform: 'capitalize'
                    },
                    root:{
                        cursor: 'pointer'
                    }
                }} color="blue" radius="md">Today</Badge>
                <Badge styles={{
                    label:{
                        textTransform: 'capitalize'
                    },
                    root:{
                        cursor: 'pointer'
                    }
                }} variant="outline" color="blue" radius="md">Tomorow</Badge>
            </div>
            <div className="grid grid-cols-1 flex justify-between lg:grid-cols-2">
                <AppoineeCard />
                <AppoineeCard />
                <AppoineeCard />
                <AppoineeCard />
                <AppoineeCard />
            </div>

        </Paper>
    </> );
}

export default RecentAppointment;




function AppoineeCard(){

    return(<>
        <div className={classes.appointeContainer}>
            <div className="w-full flex flex-row justify-between items-center">
                <div className="flex flex-row items-center gap-2">
                    <Avatar variant="filled" radius="xl" src={""} alt="no image here" />
                    <div className="flex flex-col">
                        <p className={classes.appointeeName}> Robert Fox</p>
                        <p className={classes.appointeeReason}> For RDV </p>
                    </div>
                </div>
                <Badge variant="outline" size="xs" color="teal.5"> 11:00-12:00 </Badge>
            </div>
        </div>
    </>);
}