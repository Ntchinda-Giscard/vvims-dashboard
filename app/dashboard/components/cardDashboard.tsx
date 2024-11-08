import { Badge, Group, Paper, ThemeIcon } from '@mantine/core'
import Image from 'next/image'
import { ReactElement } from 'react'
import classes from "@/app/dashboard/components/css/dashboard.module.css";
import { Poppins } from "next/font/google";
import cx from 'clsx'
import { IconInfoHexagon, IconCalendar, IconCalendarDot, IconUsersGroup } from "@tabler/icons-react";

const font_heading = Poppins({ subsets: ["latin"], weight:["500"] });
const font_amnt = Poppins({ subsets: ["latin"], weight:["700"] });
const font_perc = Poppins({ subsets: ["latin"], weight:["400"] });

interface dashboard_card{
    title: string
    amount: number
    perc: number
    bg_img: string
    img: string
}

const data = [
    { icon: IconUsersGroup, title: "Total Employees", desc: "Tracking leave request", value: 0, color: "rgba(63, 36, 199, 0.18)" },
    { icon: IconCalendar, title: "On Leave", desc: "Tracking employees on leave in week", value: 0,color: "rgba(4, 32, 189, 0.19)"},
    { icon: IconUsersGroup, title: "On leave", desc: "Tracking employees on leave", value: 0, color: "rgba(4, 189, 183, 0.45)" },
    { icon: IconInfoHexagon, title: "Attendance Percentage", desc: "Tracking leave request", value: 4, color: "rgba(22, 189, 4, 0.29)" },
];

function CardDashboard() {
    return ( <>
        <div className="flex flex-col md:flex-row gap-2">
        {
            data.map((item, index) => (
                <div key={item?.desc} className={classes.card}>
                    <div className="flex flex-row justify-between items-center">
                        <ThemeIcon radius="xl" size="lg" color= {item?.color}>
                            <item.icon color="black" stroke={1} style={{ width: '60%', height: '60%' }} />
                        </ThemeIcon>
                        <span className={classes.value}> {item?.value} </span>
                    </div>
                    <div className="flex flex-col">
                        <p className={classes.title}> {item?.title} </p>
                        <p className={classes.desc}> {item?.desc} </p>
                    </div>
                </div>
            ))
        }
    </div>

    </> );
}

export default CardDashboard;