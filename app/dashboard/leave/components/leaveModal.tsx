"use client"

import { Modal, Avatar, Paper, Divider, rem, Space } from "@mantine/core"
import classes from "@/app/dashboard/leave/components/styles.module.css";
import {useEffect} from "react"
import { IconPlus, IconCalendar } from "@tabler/icons-react";
import cx from 'clsx';

export default function LeaveModal({opened, close, leave}: any){

    useEffect(() =>{
        console.log("Leaves :", leave)
    }, [leave])
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
                        <div className="flex flex-row w-full justify-center  items-center gap-5">
                            <Space mt={15} />
                            <div className="flex flex-col items-center" >
                                <p className={classes.month}> OCT </p>
                                <div className= {`flex py-1 px-1 flex-row gap-2 items-center ${classes.boders} `} >
                                    <p className={classes.day}>19</p>
                                    <IconCalendar style={{ width: rem(16), height: rem(16) }} />
                                </div>
                                <p className={classes.numberDays}> Wed </p>
                            </div>
                            <div className={"flex flex-col"}>
                                <Divider my={5} size="md" variant="dashed" />
                                <p className={classes.numberDays}> 3 days </p>
                            </div>
                            <div className="flex flex-col items-center" >
                                <p className={classes.month}> OCT </p>
                                <div className= {`flex py-1 px-1 flex-row gap-2 items-center ${classes.boders} `}>
                                    <p className={classes.day}>19</p>
                                    <IconCalendar style={{ width: rem(16), height: rem(16) }} />
                                </div>
                                <p className={classes.numberDays}> Wed </p>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            {/* Modal content */}
            </Modal>
        </>
    )
}