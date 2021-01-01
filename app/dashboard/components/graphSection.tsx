"use client"
import { Paper, Group, SegmentedControl, Select } from "@mantine/core";
import { useEffect, useState } from "react";
import { LineChart } from '@mantine/charts';
import classes from "@/app/dashboard/components/css/dashboard.module.css"
import cx from "clsx"
import { useSubscription } from "@apollo/client";
import { GET_VISITS_STAT } from "../queries/get_all_visits";
import AttendanceOverviewBarChart from "./attendanceBarChart";





function GraphSection() {
    const [value, setValue] = useState('vi');
    const {data: dataVisitStat} = useSubscription(GET_VISITS_STAT);
    useEffect(() =>{

    },[dataVisitStat])
    return ( <>

    <Paper withBorder pr={20} pb={15} w={"100%"}>
        <Group p={10} justify="space-between">
            <p className={cx([classes.titleCars])}> Entry Statistics </p>
            <Group>
                <SegmentedControl
                    value={value}
                    onChange={setValue}
                    data={[
                        { label: 'Visitors', value: 'vi' },
                        { label: 'Vehicles', value: 've' },
                        {label: "Attendance", value: 'att'}
                    ]}
                />
                <Select
                    placeholder="Pick value"
                    data={['This month', 'Today', 'This week']}
                />
            </Group>
        </Group>
        {
            value === 'att' ?
            <AttendanceOverviewBarChart />
        :
        <LineChart
            h={300}
            data={[]}
            dataKey="day"
            series={[
                { name: 'visits_per_day', color: '#16DBCC' },
            ]}
            curveType="natural"
            withDots={false}
        />
        }
    </Paper>
    
    </> );
}

export default GraphSection;