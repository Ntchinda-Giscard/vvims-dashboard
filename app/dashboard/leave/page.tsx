"use client"
import { Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import LeavesTables from "./components/leavesTables";
import { useDisclosure } from '@mantine/hooks';
import AddLeaveManagement from "./components/addLeaveModal";
import { GET_LEAVES } from "./queries/queries";
import { useMutation, useSubscription } from "@apollo/client";
import LeaveModal from "./components/leaveModal";
import { useState } from "react";
import FullWidthSkeletonStack from "../components/defaultTable";
import { DELETE_LEAVE } from "./mutation/mutations";
import DeleteLEaveModal from "./components/deleteLeaveModal";
import TopLeaveCard from "./components/topLeaveCards";


function Page() {
    const [openedAdd, { open: openAdd, close: closeAdd }] = useDisclosure(false);
    const [openedSeeLeave, { open: openLeave, close : closeLeave}] = useDisclosure(false);
    const [openedDeleteLeave, { open: openDelete, close : closeDelete }] = useDisclosure(false);
    const {data: dataLeave, error: errLeave, loading: loadLeave} = useSubscription(GET_LEAVES);
    const [deleteLeave, {}] = useMutation(DELETE_LEAVE);

    const [leaves, setLeaves] = useState();

    const handleViewLeave= (v: any) =>{
        setLeaves(v)
        openLeave()
    }
    const handelDelete= (v:any) =>{
        setLeaves(v)
        openDelete()
    }
    return ( <>
       <main className="flex flex-col min-w-full min-h-full">
            <AddLeaveManagement 
                opened={openedAdd}
                close={closeAdd}
            />
            <LeaveModal
                opened={openedSeeLeave}
                close={closeLeave}
                leave={leaves}
            />
            <DeleteLEaveModal 
                opened={openedDeleteLeave}
                close={closeDelete}
                leave={leaves}
            />
            <div className={"flex flex-col  md:flex-row justify-between mb-8"}>
                <p style={{fontWeight: 800, fontSize: "large", color: "#404040"}}> Leaves </p>
                <Button onClick={openAdd} leftSection={ <IconPlus size={14} /> }  color={"#16DBCC"}>
                    Add Leaves
                </Button>
            </div>
            <TopLeaveCard 
                />
            {
                errLeave || loadLeave ?
                <FullWidthSkeletonStack /> :
                <LeavesTables
                    datas={dataLeave?.leaves}
                    onEdit={(v:any) => handleViewLeave(v)}
                    onDelete={(v: any) => handelDelete(v)}
                />
            }
        </main>
    </> );
}

export default Page;