
"use client"
import {useEffect} from 'react';
import {GET_AGG_TASK, GET_TASK} from "@/app/dashboard/events/queries/get_events";
import { useQuery, useSubscription } from '@apollo/client';
import TaskTable from "@/app/dashboard/events/components/taskTable";
import {ActionIcon, Button, Paper} from '@mantine/core';
import {IconArrowLeft} from "@tabler/icons-react";
import {useRouter} from "next/navigation";

export default function Page({params,}: { params: Promise<{ task: string }> }) {
    const router = useRouter();
    const {data, loading, error} = useSubscription(GET_TASK, {
        variables: {
            //@ts-ignore
            event_id:  params.task
        }
    });

    // const {data: dataAgg} = useSubscription(GET_AGG_TASK);

    useEffect(() => {
        // console.log('Params', params.task)
    }, [])
    return (
        <>
            <main className="flex flex-col min-w-full min-h-full">
                <div className={"flex flex-row mb-8"}>
                    <ActionIcon onClick={() =>router.back()} color="#404040" variant="subtle" aria-label="Settings">
                        <IconArrowLeft style={{ width: '70%', height: '70%' }} stroke={1.5} />
                    </ActionIcon>
                    <p style={{fontWeight: 800, fontSize: "large", color: "#404040"}}> Task </p>
                </div>
                <Paper radius={'md'} p={'sm'} shadow={'md'}>
                    <TaskTable
                        datas={data?.tasks}
                    />
                </Paper>
            </main>
        </>
    )
}