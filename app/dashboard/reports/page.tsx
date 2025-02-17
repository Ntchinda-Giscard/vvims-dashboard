"use client"
import {Paper, Button, Checkbox, Group, TextInput, Select, rem} from "@mantine/core";
import { useForm } from '@mantine/form';
import { IconCalendar, IconPdf, IconFileTypePdf } from '@tabler/icons-react';
import {DateInput} from "@mantine/dates";
import { useEffect, useState } from "react";
import { ReportsTable } from "./components/reports-table";
import { useMutation, useQuery } from "@apollo/client";
import { GET_REPORT, REPORT_AGG } from "./query/query";
import { getFirstAndLastDayOfMonth } from "./utils";
import { INSERT_REPORT } from "./mutations/mutations";
import axiosClient from "../settings/components/axiosClient";
import toast from "react-hot-toast";
import FootPage from "../components/fotter";



export default function Page(){
    const [checked, setChecked] = useState(false);
    const [activePage, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const {data: dataReport, loading: loadReport, error: errReport} = useQuery(GET_REPORT, {
        variables:{
            limit: itemsPerPage,
            offset: (activePage-1) * itemsPerPage,
        }
    });
    const [pdf_url, setPdfUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);


    const {loading: loadAgg, error: errAgg, data: dataAgg} = useQuery(REPORT_AGG);

    useEffect(() =>{
        console.log( "Exactly", dataReport)
    },[dataReport])
    
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            type: [],
            termsOfService: false,
            from: null,
            to: null
        },

        validate: {
            type: (value) => ( value?.length > 0 ? null : 'Invalid choice'),
            // from: (value) => ( value !== null ? null : 'Invalid date'),
            // to: (value) => ( value !== null ? null : 'Invalid date'),
        },
    });

    async function handleSubmit(values: any){
        setLoading(true);
        console.log(values)
        console.log(values.type?.toLowerCase());

        try{
            const response = await axiosClient.get("/api/v1/get-report", {
                params: {report_type: values.type?.toLowerCase()}
            })
            setPdfUrl(response.data.pdf_url)
            console.log(response.data.pdf_url);
            toast.success("Operation successful")
        }catch (err){
            toast.error(`${err}`)
        }finally{
            setLoading(false);
        }
    }
    return(
        <>
            <main className={"flex flex-col min-w-full min-h-full"}>
                <p style={{fontWeight: 800, fontSize: "x-large", color: "#404040"}}> Reports </p>
            </main>

            <Paper
                radius={'md'}
                shadow={'md'}
                mt={'md'}
                p={'md'}
            >
                <p style={{fontWeight: 800, fontSize: "large", color: "#404040"}}> Generate Reports </p>
                <form onSubmit={form.onSubmit((values: any) => handleSubmit(values))}>
                    <Select
                        mt={'lg'}
                        withAsterisk
                        radius={'md'}
                        data={['Visits', 'Attendance']}
                        defaultValue={'Visits'}
                        label="Reports type"
                        placeholder="select"
                        key={form.key('type')}
                        {...form.getInputProps('type')}
                        styles={{
                            label:{color: "#404040"},
                            option:{color: "#404040"}
                        }}
                    />


                    <Checkbox
                        mt="md"
                        label="Generate by date range"
                        onChange={(event) => setChecked(event.currentTarget.checked)}
                        styles={{
                                label:{color: "#404040"},
                            
                        }}
                    />
                    <div className={'flex flex-col md:flex-row gap-3'}>
                        <DateInput
                            disabled={!checked}
                            maw={300}
                            radius={'md'}
                            rightSection={<IconCalendar style={{width: rem(16), height: rem(16) }} />}
                            label="From"
                            placeholder="Date input"
                            key={form.key('from')}
                            {...form.getInputProps('from')}
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
                        <DateInput
                            disabled={!checked}
                            maw={300}
                            radius={'md'}
                            rightSection={<IconCalendar style={{width: rem(16), height: rem(16) }} />}
                            label="To"
                            key={form.key('to')}
                            {...form.getInputProps('to')}
                            placeholder="Date input"
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
                    </div>



                    <Group justify="flex-end" mt="md">
                        <Button variant={'outline'} onClick={() => form.reset()}>Clear</Button>
                        <Button type="submit" loading={loading} leftSection={<IconFileTypePdf style={{width: rem(16), height: rem(16)}} />} >Generate report</Button>
                    </Group>
                </form>
            </Paper>
            <Paper
                radius={'md'}
                shadow={'md'}
                mt={'md'}
                p={'md'}
            >
                {
                    loadReport && <p>Loading...</p>
                }
                {
                    errReport && <p>{`${errReport}`}</p>
                }
                {
                    dataReport && <ReportsTable datas={dataReport?.reports} />
                }
                <FootPage 
                   activePage={activePage}
                   onPage={(v: any) => setPage(v)}
                    total={Math.ceil(dataAgg?.reports_aggregate?.aggregate?.count/itemsPerPage)}
                />
                
            </Paper>
        </>
    )
}