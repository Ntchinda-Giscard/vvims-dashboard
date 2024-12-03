import cx from "clsx";
import classes from "@/app/dashboard/components/css/dashboard.module.css";
import {Poppins} from "next/font/google";
import VehicleTable from "@/app/dashboard/vehicles/components/vehicleTable";


const font_heading = Poppins({ subsets: ["latin"], weight:["500"] });

export default function(){

    return(
        <>
            <main className="flex min-h-full flex-col gap-3">
                <p className={cx([classes.heading, font_heading.className])}> Vehicles </p>
            </main>

            <Paper
                shadow={'md'}
                radius={'md'}
            >
                <VehicleTable />
            </Paper>
        </>
    )
}