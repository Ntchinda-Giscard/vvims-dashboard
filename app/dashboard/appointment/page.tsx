"use client"
import StatsGridIcons  from "./components/stats_card";
import { Button, Group, Paper, Select,NumberInput , MultiSelect} from "@mantine/core";
import AppointmentTable from "./components/appointmentTable";
import { useState } from "react";
import { DateInput } from "@mantine/dates";
import { useMutation, useSubscription } from "@apollo/client";
import { useSelector } from "react-redux";
import { GET_APPOINTMENT, GET_APP_AGG } from "./query/query";
import { useDisclosure } from '@mantine/hooks';
import AddAppoinmentModal from "./components/addApointmentModal";
import { CANCEL_APP, UPDATE_APP_COM } from "./mutation/add_appointments";
import FullWidthSkeletonStack from "../components/defaultTable";
import { Poppins } from "next/font/google";
import FootPage from "../components/fotter";
import toast from "react-hot-toast";


const poppins = Poppins({ subsets: ["latin"], weight:["400"] });

function Page() {
    const [date, setDate] = useState<Date | null>(new Date());
    const [value, setValue] = useState(['PENDING']);
    const user = useSelector((state: any) => state.auth.userInfo);

    const [openedAddApp, { open: openAdd, close: closeAdd }] = useDisclosure(false);
    const [activePage, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const {data: dataApp, loading: loadApp, error: errApp} = useSubscription(GET_APPOINTMENT,{
        variables:{
            company_id: user?.employee?.company_id,
            limit: itemsPerPage,
            offset: (activePage-1) * itemsPerPage,
            status: value,
            date: date
        }
    });

    const {data: dataAgg, loading: loadAgg, error: errAgg} = useSubscription(GET_APP_AGG, {
        variables:{
            company_id: user?.employee?.company_id,
            status: value,
            date: date
        }
    });


    const [canceledAppointment, {}] = useMutation(CANCEL_APP)
    const [completeAppointment, {}] = useMutation(UPDATE_APP_COM)

    const handleCancelAppointment= (v:any) =>{
        const toast_id = toast.loading("Processing...")
        console.log(v)
        canceledAppointment({
            variables:{
                id: v.id
            },
            onCompleted: ()=>{
                toast.dismiss(toast_id)
                toast.success("Operation successful")
            },
            onError: (err)=>{
                toast.error(`${err.message}`)
            }
        })
    }
    const handleCompleteAppointment= (v:any) =>{
        const toast_id = toast.loading("Processing...")
        console.log(v)
        completeAppointment({
            variables:{
                id: v.id
            },
            onCompleted: ()=>{
                toast.dismiss(toast_id)
                toast.success("Operation successful")
            },
            onError: (err)=>{
                toast.error(`${err.message}`)
            }
        })
    }

    // if (errApp) return `${errApp}`
    // if (errAgg) return <div> {`${errAgg}`} </div>
    return ( <>
       <main className="flex flex-col min-w-full min-h-full">
        <AddAppoinmentModal
            opened={openedAddApp}
            close={closeAdd}
        />
            <div className={"flex flex-col  md:flex-row justify-between mb-8"}>
                <p style={{fontWeight: 800, fontSize: "large", color: "#404040"}}> Appointment </p>
                <Button  color={"#16DBCC"} onClick={openAdd} >
                    Add Appointment
                </Button>
            </div>
                <StatsGridIcons />
                <Paper mt="lg" radius="md" shadow="md" p="md" >
                    <div className="flex gap-3 md:flex-row flex-col md:justify-start">
                        <DateInput
                            value={date}
                            onChange={setDate}
                            label="Date"
                            styles={{
                                label:{
                                    color: "#404040"
                                },
                                calendarHeader:{
                                    color: "#000"
                                },
                                calendarHeaderControl:{
                                    color: "#000"
                                }
                            }}
                        />
                        <MultiSelect 
                            miw={100}
                            label="Status"
                            data={["CANCELED", "COMPLETED", "PENDING"]} 
                            defaultValue={['PENDING']}
                            value={value} 
                            onChange={setValue}
                            styles={{
                                label:{color: "#404040"},
                                option:{color: "#404040"}
                            }}
                        />
                    </div>
                    {
                        loadApp || errApp ?
                        <FullWidthSkeletonStack /> :
                        <AppointmentTable 
                            datas={dataApp?.appointments}
                            onComplete={(v :any) => handleCompleteAppointment(v)}
                            onCanceled={(v:any) => handleCancelAppointment(v)}
                        />
                    }
                     <div className="flex md:flex-row flex-col justify-center md:justify-between items-center w-full">
                    {
                        errAgg || loadAgg ? null :
                        <p className={poppins.className} style={{color: "#007FFF", fontSize: "small"}}>
                        Displaying { dataApp?.appointments?.length ? dataApp?.appointments?.length*activePage : 0} of {dataAgg?.appointments_aggregate.aggregate.count} appointments.
                        </p>
                    }
                    {
                        errAgg || loadAgg ? null :
                        <Group>
                            <NumberInput value={itemsPerPage} w={80} min={10} max={100} 
                                //@ts-ignore
                                onChange={setItemsPerPage} />
                            <FootPage 
                            activePage={activePage}
                            onPage={(v: any) => setPage(v)}
                            total={Math.ceil(dataAgg?.appointments_aggregate.aggregate.count/itemsPerPage)}
                            />
                        </Group>
                    }
                </div>
                </Paper>
            </main>
    </> );
}

export default Page;