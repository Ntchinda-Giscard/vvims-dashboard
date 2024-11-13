import {Paper, Badge, Avatar, Group} from "@mantine/core"
import classes from "@/app/dashboard/components/css/dashboard.module.css"
import cx from "clsx";
import { IconChevronRight } from "@tabler/icons-react";
import Link from "next/link"

function RecentAppointment() {



    return ( <>
        <Paper
            withBorder
            p={15}
        >
            <div className="flex flex-row justify-between items-center">
                <p className={cx([classes.titleCars])}> Upcoming Appointment </p>
                <div className="flex flex-row items-center">
                    <Link href={"#"} style={{fontSize: 12, color: "blue", fontWeight: 300}}> view all </Link>
                    <IconChevronRight stroke={1} style={{width: 10, height: 10, color: "blue"}} />
                </div>

            </div>
            <div className="flex flex-row gap-3 mb-3">
                <Badge styles={{
                    label:{
                        textTransform: 'capitalize'
                    },
                    root:{
                        cursor: 'pointer'
                    }
                }} color="blue" radius="md">Today</Badge>
                {/* <Badge styles={{
                    label:{
                        textTransform: 'capitalize'
                    },
                    root:{
                        cursor: 'pointer'
                    }
                }} variant="outline" color="blue" radius="md">Tomorow</Badge> */}
            </div>
            <div className="grid grid-cols-1 gap-x-2 gap-y-3 flex justify-between lg:grid-cols-2">
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
                    <Avatar variant="filled" color="#73B7F0" radius="xl" src={""} alt="no image here" />
                    <div className="flex flex-col">
                        <p className={classes.appointeeName}> Robert Fox</p>
                        <p className={classes.appointeeReason}> For RDV </p>
                    </div>
                </div>
                <Badge variant="white" size="xs" color="teal.5"> 11:00-12:00 </Badge>
            </div>
        </div>
    </>);
}