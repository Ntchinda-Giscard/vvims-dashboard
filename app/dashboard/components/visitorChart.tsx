"use client"
import { useQuery } from '@apollo/client';
import { BarChart } from '@mantine/charts';
import {useEffect} from 'react';
import { VISITI_GB_DAY } from '../query/get_percent';


export default function VisitorChart() {

    const {data, error, loading} = useQuery(VISITI_GB_DAY);

    useEffect(() => {
        console.log("Visitor data", data)
    }, [data])

    const datas = [
        { month: 'January', Smartphones: 1200, Laptops: 900, Tablets: 200 },
        { month: 'February', Smartphones: 1900, Laptops: 1200, Tablets: 400 },
        { month: 'March', Smartphones: 400, Laptops: 1000, Tablets: 200 },
        { month: 'April', Smartphones: 1000, Laptops: 200, Tablets: 800 },
        { month: 'May', Smartphones: 800, Laptops: 1400, Tablets: 1200 },
        { month: 'June', Smartphones: 750, Laptops: 600, Tablets: 1000 },
      ];

    if (error) return <div> {`${error}`} </div>
  return (
    <BarChart
      h={300}
      withLegend
      styles={{
        legend:{
            color: "#404040"
        }
    }}
      data={ data ? data?.getVisitsByDay : []}
      dataKey="visitDay"
      series={[{ name: 'visitorCount', color: 'blue' }]}
      xAxisLabel="Day"
      yAxisLabel="Amout"
      barProps={{radius: 10, width: 20}}
    />
  );
}