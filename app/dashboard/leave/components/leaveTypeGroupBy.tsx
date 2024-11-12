"use client"
import { Paper, RingProgress, Progress, Group, Text } from "@mantine/core";
import classes from "@/app/dashboard/leave/components/styles.module.css";
import { useQuery } from "@apollo/client";
import { GET_LEAVE_TYPE } from "../queries/queries";
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode, Key, useEffect } from "react";

function LeaveTypesGroupAgg() {

    const {data: dataLeaveType, loading: leaveTypeLoad} = useQuery(GET_LEAVE_TYPE);

    useEffect(() =>{
        console.log("Leave types: ", dataLeaveType)
    }, [dataLeaveType])
    return ( <>

        <Paper
            p={"md"}
            withBorder
            className="w-full md:w-1/2"
        >
            <p className={classes.cardTitle}> Comsumed leave types </p>
            <div className="grid grid-cols-2 gap-x-4 items-center" >
                <div className="grid grid-cols-2 gap-x-4">
                    {leaveTypeLoad? (
                        <p>Loading...</p>
                    ) : (
                        dataLeaveType?.leave_type?.map((leaveType: {
                            type: ReactNode; leave_type_name: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; total_consumed_leave_days: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; 
    }, index: Key | null | undefined) => (
                            <div key={index} className={`flex gap-1`} >
                                <p className={classes.leaveTypes}>{leaveType?.type}</p>
                                <p className={classes.leaveLabel}>{'leave'}</p>
                            </div>
                        ))
                    )}
                </div>
                <div className="flex justify-end">
                    
                    <RingProgress
                        size={115}
                        thickness={10}
                        roundCaps
                        sections={[
                            {value: 40, color: 'blue.7'}
                        ]}
                    />
                </div>
            </div>
            <LeaveProgressConsumed />

        </Paper>
    
    </> );
}

export default LeaveTypesGroupAgg;



function LeaveProgressConsumed({text, consumed, total}: any){
    return(
        <>
          <Group justify="space-between">
            <Text fz="xs" c="#404040" fw={700}>
              {"Ml"}
            </Text>
            <Text fz="xs" c="" fw={700}>
              {6}/12
            </Text>
          </Group>
          <Progress.Root>
            <Progress.Section
              className={classes.progressSection}
              value={20}
              color=""
            />

            <Progress.Section
            //   className={classes.progressSection}
              value={100-20}
              color="gray.1"
            />
            </Progress.Root>
        </>
    )
}