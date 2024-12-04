"use client"
import cx from "clsx";
import classes from "@/app/dashboard/components/css/dashboard.module.css";
import {Paper} from "@mantine/core";
import {Poppins} from "next/font/google";
import {useSelector} from "react-redux";
import {useMutation, useSubscription} from "@apollo/client";
import {GET_EVENT_NOTIF} from "@/app/dashboard/events/queries/event_notif";
import {ACCEPT_EVENT, DECLINE_EVENTS} from "@/app/dashboard/events/mutation/insert_events";


const font_heading = Poppins({ subsets: ["latin"], weight:["500"] });

export default function Page(){

    const userInfo = useSelector((state: any) => state.auth.userInfo);
    const {data: dataNotif} = useSubscription(GET_EVENT_NOTIF,{
        variables:{
            employee_id: userInfo?.employee?.id
        }
    });

    const [acceptEvents, {loading: acceptLoad}] = useMutation(ACCEPT_EVENT);
    const [declineEvent, {loading: declineLoad}] = useMutation(DECLINE_EVENTS);

    const acceptEventsPart = (id: any) =>{
        console.log('Accept notify', id)
        acceptEvents({
            variables:{
                id: id?.id
            }
        })
    }

    const declineEventsPart = (id: any) =>{
        console.log('Decline notify', id)
        declineEvent({
            variables:{
                id: id?.id
            }
        })
    }

    return(
        <>
            <main className="flex min-h-full flex-col gap-3">
                <p className={cx([classes.heading, font_heading.className])}> Notifications </p>
                <Paper
                    shadow={'md'}
                    radius={'md'}
                >
                </Paper>
            </main>
        </>
    )
}