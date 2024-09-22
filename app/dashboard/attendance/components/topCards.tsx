"use client"
import { Group, Paper, SimpleGrid, Text } from '@mantine/core';
import {
    IconUserX,
    IconUsersGroup,
    IconUserCheck,
    IconUserExclamation,
    IconUserOff,
    IconUserPin,
    IconArrowUpRight,
    IconArrowDownRight,
} from '@tabler/icons-react';
import classes from './StatsGrid.module.css';
import {
    GET_ABSENT_EMPLOYEE,
    GET_LATE_EMPLOYEES,
    GET_ONTIME_EMPLOYEES,
    GET_PRESENT_EMPLOYEES,
    GET_TOTAL_EMPLOYEE
} from "@/app/dashboard/attendance/queries/get_total_empl";
import { useSubscription } from '@apollo/client';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const icons = {
    user: IconUsersGroup,
    discount: IconUserX,
    receipt: IconUserCheck,
    coin: IconUserExclamation,
    absent: IconUserOff,
    present: IconUserPin,
};



export default function StatsGrid() {
    const user = useSelector((state: any) => state.auth.userInfo);
    const {loading: loadTotalEmpl, data: dataEmpl, error: errTotalEmpl} = useSubscription(GET_TOTAL_EMPLOYEE,{
        variables:{
            company_id: user?.employee?.company_id
        }
    })
    useEffect(() =>{
        console.log(dataEmpl)
        if(errTotalEmpl){
            console.log("Error", errTotalEmpl)
        }
    }, [dataEmpl])
    const {loading: loadPresent, data: dataPresent, error: errPresent } = useSubscription(GET_PRESENT_EMPLOYEES,{
        variables:{
            company_id: user?.employee?.company_id
        }
    })
    const {loading: loadOnTime, data: dataOnTime, error: errOnTime} = useSubscription(GET_ONTIME_EMPLOYEES,{
        variables:{
            company_id: user?.employee?.company_id
        }
    })
    const {loading: loadLate, data: dataLate, error: errLate} = useSubscription(GET_LATE_EMPLOYEES,{
        variables:{
            company_id: user?.employee?.company_id
        }
    })
    const {loading: loadAbsent, data: dataAbsent, error: errAbsent} = useSubscription(GET_ABSENT_EMPLOYEE,{
        variables:{
            company_id: user?.employee?.company_id
        }
    })

    const data = [
        { title: 'Total work force', icon: 'user', value: dataEmpl?.employees_aggregate?.aggregate?.count, diff: 18 },
        { title: 'Present workforce', icon: 'present', value: dataPresent?.employees_aggregate?.aggregate?.count, diff: 34 },
        { title: 'On time workforce', icon: 'receipt', value: dataOnTime?.employees_aggregate?.aggregate?.count, diff: -13 },
        { title: 'Late workforce', icon: 'coin', value: dataLate?.employees_aggregate?.aggregate?.count, diff: 18 },
        { title: 'Absent workforce', icon: 'discount', value: (dataEmpl?.employees_aggregate?.aggregate?.count - dataPresent?.employees_aggregate?.aggregate?.count), diff: -30 },
    ]


    const stats = data.map((stat) => {
        //@ts-ignore
        const Icon = icons[stat.icon];
        const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

        return (
            <Paper withBorder p="md" radius="md" key={stat.title}>
                <Group justify="space-between">
                    <Text size="xs" c="#404040" className={classes.title}>
                        {stat.title}
                    </Text>
                    <Icon className={classes.icon} size="1.4rem" stroke={1.5} />
                </Group>

                <Group align="flex-end" gap="xs" mt={25}>
                    <Text className={classes.value}>{stat.value}</Text>
                    <Text c={stat.diff > 0 ? 'teal' : 'red'} fz="sm" fw={500} className={classes.diff}>
                        <span>{stat.diff}%</span>
                        <DiffIcon size="1rem" stroke={1.5} />
                    </Text>
                </Group>

                <Text fz="xs" c="dimmed" mt={7}>
                    Compared to previous month
                </Text>
            </Paper>
        );
    });
    return (
        <div className={classes.root}>
            <div className={"flex flex-row justify-between"} >{stats}</div>
        </div>
    );
}