import {BarChart} from "@mantine/charts";



export default function AttendanceOverviewBarChart(){
    const data = [
        {month: 'January', SmarthPhones: 1200, laptops: 900, Tablets: 600},
        {month: 'Febuary', SmarthPhones: 1500, laptops: 400, Tablets: 500},
        {month: 'March', SmarthPhones: 1200, laptops: 900, Tablets: 300},
        {month: 'April', SmarthPhones: 100, laptops: 100, Tablets: 400},
        {month: 'May', SmarthPhones: 1200, laptops: 660, Tablets: 500},
        {month: 'June', SmarthPhones: 4200, laptops: 950, Tablets: 600},
    ]
    return(
        <BarChart
            h={300}
            data={data} 
            series={[
                {name: 'SmarthPhones', label: 'smarthphones sales', color: 'violet.6'},
                {name: 'laptops', label: 'laptops sales', color: 'blue.6'},
                {name: 'Tablets', label: 'tablets sales', color: 'teal.6'},
            ]} 
            dataKey={"month"}
            withLegend
            xAxisLabel="Date"
            yAxisLabel="Amout"
            barProps={{radius: 10, width: 20}}
            minBarSize={30}
            maxBarWidth={50}
            type="stacked"
        />
    )
}