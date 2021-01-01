import {BarChart} from "@mantine/charts";



export default function AttendanceOverviewBarChart(){
    const data = [
        {month: 'January', SmarthPhones: 1000, laptops: 400, Tablets: 600},
        {month: 'Febuary', SmarthPhones: 1500, laptops: 400, Tablets: 500},
        {month: 'March', SmarthPhones: 1200, laptops: 900, Tablets: 300},
        {month: 'April', SmarthPhones: 900, laptops: 600, Tablets: 400},
        {month: 'May', SmarthPhones: 800, laptops: 660, Tablets: 500},
        {month: 'January', SmarthPhones: 1000, laptops: 400, Tablets: 600},
        {month: 'Febuary', SmarthPhones: 1500, laptops: 400, Tablets: 500},
        {month: 'March', SmarthPhones: 1200, laptops: 900, Tablets: 300},
        {month: 'April', SmarthPhones: 900, laptops: 600, Tablets: 400},
        {month: 'May', SmarthPhones: 800, laptops: 660, Tablets: 500},

    ]
    return(
        <BarChart
            h={300}
            data={data} 
            series={[
                {name: 'SmarthPhones', label: 'smarthphones sales', color: '#C9B7EC'},
                {name: 'laptops', label: 'laptops sales', color: 'blue.6'},
                {name: 'Tablets', label: 'tablets sales', color: '#DCFAF8'},
            ]} 
            dataKey={"month"}
            withLegend
            xAxisLabel="Date"
            yAxisLabel="Amout"
            barProps={{radius: 10, width: 20}}
            type="stacked"
        />
    )
}