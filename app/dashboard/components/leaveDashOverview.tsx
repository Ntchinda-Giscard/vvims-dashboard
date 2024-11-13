"use client"

import { Paper } from "@mantine/core";
import cx from 'clsx';
import classes from "@/app/dashboard/components/css/dashboard.module.css";
import { useQuery } from "@apollo/client";
import { AGG_LEAVES_PENDING, AGG_LEAVES_ACCEPTED, AGG_LEAVES_REJECTED } from "../query/get_percent";
import { useEffect } from "react";


function LeaDashOverview() {

    const {data: dataPending} = useQuery(AGG_LEAVES_PENDING);
    const {data: dataAccepted} = useQuery(AGG_LEAVES_ACCEPTED);
    const {data: dataReject} = useQuery(AGG_LEAVES_REJECTED);

    useEffect(() => {
        console.log("Pending data", dataPending )
    },[dataPending,dataAccepted , dataReject])
    return ( <>

    <Paper
        withBorder
        p={15}
    >
        <p className={cx([classes.titleCars])}> Leave Overview </p>

        <div className={classes.overviewCard}>
            <p className={classes.overviewValue}> {dataPending?.leaves_aggregate?.aggregate?.count} </p>
            <p className={classes.overviewLabel}> pending leaves </p>
        </div>

        <div className={classes.overviewCard}>
            <p className={classes.overviewValue}> {dataAccepted?.leaves_aggregate?.aggregate?.count} </p>
            <p className={classes.overviewLabel}> accepted leaves </p>
        </div>

        <div className={classes.overviewCard}>
            <p className={classes.overviewValue}> {dataReject?.leaves_aggregate?.aggregate?.count} </p>
            <p className={classes.overviewLabel}> rejected leaves </p>
        </div>

    </Paper>
    
    </> );
}

export default LeaDashOverview;

function Cards(){
}