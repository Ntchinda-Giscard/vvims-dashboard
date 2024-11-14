import { Badge, Group, Paper, ThemeIcon, RingProgress, Text } from '@mantine/core'
import Image from 'next/image'
import { ReactElement, useEffect } from 'react'
import classes from "@/app/dashboard/components/css/dashboard.module.css";
import { Poppins } from "next/font/google";
import cx from 'clsx'
import { IconInfoHexagon, IconCar, IconUserShare, IconUsersGroup } from "@tabler/icons-react";
import { useQuery, useSubscription } from '@apollo/client';
import { GET_PERCENT, GET_TASK_COMPLETION, GET_TOT_LEAVE_EMPLOYEE } from '../query/get_percent';
import { useSelector } from 'react-redux';
import { GET_TOTAL_EMPLOYEE } from '../attendance/queries/get_total_empl';

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
    const user = useSelector((state: any) => state.auth.userInfo);
    const {data: dataPerc, error: errData, loading: loadData} = useQuery(GET_PERCENT);
    const {data: dataTotLeave, error: errLeaaveTot, loading: loadLeaveTot} = useQuery(GET_TOT_LEAVE_EMPLOYEE);
    const {data: dataTaskPerc, error: errTaskPerc, loading: loadTaskPerc} = useQuery(GET_TASK_COMPLETION, {
        variables:{
            id: user?.employee?.id
        }
    });

    const {loading: loadTotalEmpl, data: dataEmpl, error: errTotalEmpl} = useSubscription(GET_TOTAL_EMPLOYEE,{
        variables:{
            company_id: user?.employee?.company_id
        }
    });

    const {data: dataOnLeave, error: errONLeave, loading: loadOnLeave} = useQuery(GET_TOT_LEAVE_EMPLOYEE);
    useEffect(() =>{
      console.log("Total employee:", dataEmpl)
    }, [dataEmpl ]);

    const data = [
      { icon: IconUsersGroup, title: "Total Employees", desc: "Tracking leave request", value: dataEmpl?.employees_aggregate?.aggregate?.count, color: "rgba(63, 36, 199, 0.18)" },
      { icon: IconUserShare, title: "On Leave", desc: "Tracking employees on leave in week", value: dataOnLeave ? dataOnLeave?.getTotalEmployeeOnLeave?.total : 0, color: "rgba(4, 32, 189, 0.19)"},
    //   { icon: IconUsersGroup, title: "On leave", desc: "Tracking employees on leave", value: 0, color: "rgba(4, 189, 183, 0.45)" },
      { icon: IconInfoHexagon, title: "Attendance Percentage", desc: "Tracking attendance", value: `${dataPerc?.getAttendancePercentage?.attendancePercentage? dataPerc?.getAttendancePercentage?.attendancePercentage : 0}%`, color: "rgba(22, 189, 4, 0.29)" },
  ];

  if (errTotalEmpl) return <div style={{color: "#404040"}}> {`${errTotalEmpl}`} </div>
    return ( <>
        <div className="flex flex-col lg:flex-row gap-2">
        {
            data.map((item, index) => (
                <div key={item?.desc} className={classes.card}>
                    <div style={{marginBottom: 10}} className="flex flex-row justify-between mb-3 items-center">
                        <ThemeIcon radius="xl" size={70} color= {item?.color}>
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
                        {value: dataTaskPerc?.getPercentageTask?.percentage, color: 'blue'}
                    ]}
                    label={
                        <Text className={`${classes.taskStat}`} ta='center'> {dataTaskPerc?.getPercentageTask?.percentage}% </Text>
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