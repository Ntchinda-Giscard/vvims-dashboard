import { Badge, Group, Paper, ThemeIcon, RingProgress, Text } from '@mantine/core'
import Image from 'next/image'
import { ReactElement, useEffect } from 'react'
import classes from "@/app/dashboard/components/css/dashboard.module.css";
import { Poppins } from "next/font/google";
import cx from 'clsx'
import { IconInfoHexagon, IconCalendar, IconUserShare, IconUsersGroup } from "@tabler/icons-react";
import { useQuery } from '@apollo/client';
import { GET_PERCENT, GET_TOT_LEAVE_EMPLOYEE } from '../query/get_percent';

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





function CardDashboard() {
    const {data: dataPerc, error: errData, loading: loadData} = useQuery(GET_PERCENT);
    const {data: dataTotLeave, error: errLeaaveTot, loading: loadLeaveTot} = useQuery(GET_TOT_LEAVE_EMPLOYEE);
    useEffect(() =>{
      console.log("Leaves eperc:", dataTotLeave)
    }, [dataPerc ]);

    const data = [
      { icon: IconUsersGroup, title: "Total Employees", desc: "Tracking leave request", value: 0, color: "rgba(63, 36, 199, 0.18)" },
      { icon: IconUserShare, title: "On Leave", desc: "Tracking employees on leave in week", value: 0,color: "rgba(4, 32, 189, 0.19)"},
    //   { icon: IconUsersGroup, title: "On leave", desc: "Tracking employees on leave", value: 0, color: "rgba(4, 189, 183, 0.45)" },
      { icon: IconInfoHexagon, title: "Attendance Percentage", desc: "Tracking attendance", value: `${dataPerc?.getAttendancePercentage?.attendancePercentage}%`, color: "rgba(22, 189, 4, 0.29)" },
  ];
    return ( <>
        <div className="flex flex-col md:flex-row gap-2">
        {
            data.map((item, index) => (
                <div key={item?.desc} className={classes.card}>
                    <div style={{marginBottom: 10}} className="flex flex-row justify-between mb-3 items-center">
                        <ThemeIcon radius="xl" size={50} color= {item?.color}>
                            <item.icon color="black" stroke={1} style={{ width: '60%', height: '60%' }} />
                        </ThemeIcon>
                        <span className={classes.value}> {item?.value} </span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className={classes.title}> {item?.title} </p>
                        <p className={classes.desc}> {item?.desc} </p>
                    </div>
                </div>
            ))
        }
        <div className={classes.card}>
            <div className="flex flex-row w-full h-full items-center justify-between">

                <RingProgress 
                    size={120}
                    thickness={15}
                    roundCaps
                    sections={[
                        {value: 50, color: 'blue'}
                    ]}
                    label={
                        <Text className={`${classes.taskStat}`} ta='center'> {50}% </Text>
                    }
                />

                    <div className="flex flex-col gap-1">
                        <p className={classes.title}> Task completion </p>
                        <p className={classes.desc}> Traking task completion </p>
                    </div>
            </div>
        </div>
    </div>

    </> );
}

export default CardDashboard;