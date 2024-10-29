"use client"

import { Modal, Avatar, Paper, Divider, rem, Space, Group, Button } from "@mantine/core"
import classes from "@/app/dashboard/leave/components/styles.module.css";
import {useEffect} from "react"
import { IconPlus, IconCalendar } from "@tabler/icons-react";
import cx from 'clsx';
import { useMutation } from "@apollo/client";
import { ACCEPT_LEAVE, REJECT_LEAVE } from "../mutation/mutations";

export default function LeaveModal({opened, close, leave}: any){

    const [acceptLeave, {loading:loadAccept}] = useMutation(ACCEPT_LEAVE)
    const [declineLeave, {loading:loadDecline}] = useMutation(REJECT_LEAVE)

    useEffect(() =>{
        console.log("Leaves :", leave)
    }, [leave])

    function getMonthAbbreviation(dateString: any) {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    }

    function getDayNumber(dateString: any) {
        const date = new Date(dateString);
        const day = date.getDate(); // Extracts the day number (1-31)
        return day.toString().padStart(2, '0'); // Pads with '0' if needed
    }

    function getDayOfWeek(dateString: any) {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', { weekday: 'short' }).toUpperCase();
    }

    function getDaysDifference(startDate:any, endDate: any) {
        const start = new Date(startDate);
        const end = new Date(endDate);
      
        // Calculate the difference in milliseconds
        //@ts-ignore
        const diffInMs = end - start;
      
        // Convert milliseconds to days (1 day = 24 * 60 * 60 * 1000 ms)
        const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
      
        return Math.abs(diffInDays); // Return the absolute value to avoid negative days
    }

    const handleDelete = () =>{

    }

    return(
        <>
            <Modal
                withCloseButton={false}
                opened={opened} 
                onClose={close}
                styles={{
                    header:{
                        padding: 10,
                        background: "#EEEEEE"
                    },
                    body:{
                        padding: 0
                    }
                }}
            >
                <Modal.Header>
                    <div className="flex flex-row gap-2">
                        <Avatar src={leave?.employee?.file?.file_url} radius="xl" size="md" />
                        <div className="flex flex-col gap-0">
                            <p className={classes.name}> {leave?.employee?.firstname} </p>
                            <p className={classes.function}> {leave?.employee?.function} </p>
                        </div>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <div className="flex flex-row w-full mt-5 justify-center  items-center gap-5">
                            <div className="flex flex-col items-center" >
                                <p className={classes.month}> {getMonthAbbreviation(leave?.start_date)} </p>
                                <div className= {`flex py-1 px-1 flex-row gap-2 items-center ${classes.boders} `} >
                                    <p className={classes.day}>{getDayNumber(leave?.start_date)}</p>
                                    <IconCalendar style={{ width: rem(16), height: rem(16) }} />
                                </div>
                                <p className={classes.numberDays}> {getDayOfWeek(leave?.start_date)} </p>
                            </div>
                            <div className={"flex flex-col"}>
                                <Divider my={5} color={'black'} size="sm" variant="dashed" />
                                <p className={classes.numberDays}> 
                                    {`${getDaysDifference(leave?.start_date, leave?.end_date) } days` }
                                </p>
                            </div>
                            <div className="flex flex-col items-center" >
                                <p className={classes.month}> {getMonthAbbreviation(leave?.end_date)} </p>
                                <div className= {`flex py-1 px-1 flex-row gap-2 items-center ${classes.boders} `}>
                                    <p className={classes.day}>{getDayNumber(leave?.end_date)}</p>
                                    <IconCalendar style={{ width: rem(16), height: rem(16) }} />
                                </div>
                                <p className={classes.numberDays}> {getDayOfWeek(leave?.end_date)} </p>
                            </div>
                        </div>
                        <div className={classes.commentBox}>
                            <div className={classes.leaveType}> 
                                <p className={classes.type}> {`${leave?.leave_type} leave`} </p>
                            </div>
                            <p className={classes.comment}> {leave?.comment} </p>
                        </div>
                    </div>
                    <Group grow mt={"md"} px={15} py={15}>
                        <Button onClick={handleDelete} loading={loadAccept} color="red"  radius="md">Accept</Button>  
                        <Button onClick={close} loading={loadDecline} color="#16DBCC"  radius="md">Reject</Button>
                    </Group>
                </Modal.Body>
            {/* Modal content */}
            </Modal>
        </>
    )
}