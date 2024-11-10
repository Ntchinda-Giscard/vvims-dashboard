import { Paper } from "@mantine/core";
import cx from 'clsx';
import classes from "@/app/dashboard/components/css/dashboard.module.css";

function LeaDashOverview() {
    return ( <>

    <Paper
        withBorder
        p={15}
    >
        <p className={cx([classes.titleCars])}> Leave Overview </p>

        <div className={classes.overviewCard}>
            <p className={classes.overviewValue}> 20 </p>
            <p className={classes.overviewLabel}> pending leaves </p>
        </div>

    </Paper>
    
    </> );
}

export default LeaDashOverview;