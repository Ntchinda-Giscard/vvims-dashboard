import car_f from '@/public/assets/cars_f.svg'
import classes from "@/app/dashboard/components/css/dashboard.module.css"
import cx from "clsx";
import { Poppins } from "next/font/google";
import { Paper, Group, Stack, Badge } from '@mantine/core';
import Image from "next/image";

const font_heading = Poppins({ subsets: ["latin"], weight:["400"] });

function LoogedCars() {
    return ( <>
    <Paper
        withBorder
        p={15}
        w={"100%"}
    >
        <p className={cx([classes.titleCars])}> Recently Logged In Vehicles </p>
        <div className={"flex flex-col gap-2"}>
        <CardItem />
        </div>
        
    </Paper>

    </> );
}

export default LoogedCars;


function CardItem(){
    return(
        <div className="flex flex-row w-full  gap-3 items-center">
        <Image src={car_f} alt={"image"} />
        <div className={"flex flex-row w-full items-center justify-between"}>
            <div className="flex flex-col">
                <p  className={cx([classes.cmake, font_heading.className])}> toyota yaris</p>
                <p className={cx([classes.license, font_heading.className])}>sw 000 99</p>
            </div>
            <div className="flex flex-col">
                <p className={cx([classes.time, font_heading.className])}> 03 minute ago </p>
                <Badge variant="light" color="blue" radius="md">Badge</Badge>
            </div>
        </div>
    </div>
    )  
}