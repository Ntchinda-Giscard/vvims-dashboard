"use client"
import { useRouter } from "next/navigation";
import { useQuery, useSubscription } from "@apollo/client";
import { GET_ATTENDANCES_ALL, GET_ATTENDANCES_ALL_AGG } from "../queries/get_total_empl";
import { ActionIcon, Group, NumberInput, Paper, TextInput, rem } from "@mantine/core";
import { useState, useEffect } from "react";
import { DateInput, MonthPickerInput } from "@mantine/dates";
import { useSelector } from "react-redux";
import ViewAttendanceTable from "../components/viewAllAttentanceTable";
import { IconArrowLeft, IconSearch } from "@tabler/icons-react";
import FullWidthSkeletonStack from "../../components/defaultTable";
import FootPage from "../../components/fotter";
import { Poppins } from "next/font/google";
import AttendanceTable from "../components/attendanceTable";
import { GET_ATT_REPORT } from "../queries/get_att_report";
import AttendanceReportTable from "./components/reportTable";


const poppins = Poppins({ subsets: ["latin"], weight:["400"] });
function Page( {params }: { params: { slug: string } }) {
    const today = new Date();

// Get the first day of the current month
const firstDayOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
const formattedFirstDay = firstDayOfCurrentMonth.toISOString().split('T')[0];



// Get the last day of the current month
const lastDayOfCurrentMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
const formattedLastDay = lastDayOfCurrentMonth.toISOString().split('T')[0];


    const router = useRouter()
    const user = useSelector((state: any) => state.auth.userInfo);
    //@ts-ignore
    const now = new Date()
    //@ts-ignore
    const [fromValue, setFromValue] = useState(new Date(now.getFullYear(), now.getMonth(), 3));
    //@ts-ignore
    const [toValue, setToValue] = useState(new Date(now.getFullYear(), now.getMonth()+1), 0);
    const [activePage, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [search, setSearch] = useState('');
    const {data, loading, error} = useSubscription(GET_ATTENDANCES_ALL,{
        variables:{
            company_id: user?.employee?.company_id,
            froms: fromValue,
            to: toValue,
            limit: itemsPerPage,
            offset: (activePage-1) * itemsPerPage,
            _ilike: `%${search}%`,
        }
    })
    const {data: dataAtt, loading: loadAtt, error: errAtt} = useQuery(GET_ATT_REPORT,{
        variables:{
            endDate: toValue,
            startDate: fromValue
        }
    }
    )

    const {data: dataAgg, loading: loadAgg, error: errAgg} = useSubscription(GET_ATTENDANCES_ALL_AGG,{
        variables:{
            company_id: user?.employee?.company_id,
            froms: fromValue,
            to: toValue,
            _ilike: `%${search}%`,
        }
    })
    

    useEffect(() =>{
        console.log(fromValue)
        console.log("Datas", dataAtt)
        if (loading){
            console.log("Loading...")
        }
        if (error){
            console.log("Error...", error)
        }
    }, [dataAtt])

    function getDayOfWeek(dateStr: string) {
        const date = new Date(dateStr);
        const options = { weekday: 'long' };
        //@ts-ignore
        return date.toLocaleDateString('en-US', options);
    }

    function formatDateToDDMMYYYY(dateStr: string) {
        const date = new Date(dateStr);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();
        
        return `${day}/${month}/${year}`;
      }
      
      // Example usage
      console.log(formatDateToDDMMYYYY("2024-09-30T00:00:00+00:00")); // Output: "30/09/2024"
      
      // Example usage
      console.log(getDayOfWeek("2024-09-30T00:00:00+00:00")); // Output: "Monday"

    return ( <>
        <main className={"flex flex-col min-w-full min-h-full"}>
            <Group gap={5}>
                <ActionIcon onClick={() =>router.back()} color="#404040" variant="subtle" aria-label="Settings">
                    <IconArrowLeft style={{ width: '70%', height: '70%' }} stroke={1.5} />
                </ActionIcon>
                <p style={{ fontWeight:  800, fontSize: "large", color: "#404040"}}> View All Attendance </p>
            </Group>
            <Paper p="md" mt="lg" radius="md" >
                <div className="flex flex-col md:flex-row items-center w-full justify-between">
                <TextInput
                    value={search}
                    leftSectionPointerEvents="none"
                    leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} />}
                    onChange={(event) => setSearch(event.currentTarget.value)}
                    styles={{
                        label:{
                            color: "#404040"
                        }
                    }}
                />
                    <Group>
                        <DateInput
                            value={fromValue}
                            //@ts-ignore
                            onChange={setFromValue}
                            label="From"
                            placeholder="Date input"
                            mb={15}
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
                            value={toValue}
                            //@ts-ignore
                            onChange={setToValue}
                            label="To"
                            placeholder="Date input"
                            mb={15}
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
                    </Group>
                </div>
               {
                false ?
                <FullWidthSkeletonStack /> :
                    <>
                        {
                          dataAtt?.getReportAttandance?.map((m: any) =>(
                            <>
                                <AttendanceReportTable 
                                    key={m?.employee?.id}
                                    datas={m?.attendance}
                                    date={ `${getDayOfWeek(m?.date)}  - ${formatDateToDDMMYYYY(m?.date)}` }
                                />
                            </>
                          ))
                        }
                        
                        {/* <AttendanceReportTable 
                            datas={dataAtt}
                        /> */}
                    </>
                // <ViewAttendanceTable 
                //     datas = {data?.get_attenance_monthly_all_employee}
                // />
                }
                <div className="flex md:flex-row flex-col justify-center md:justify-between items-center w-full">
                    {
                        errAgg || loadAgg ? null :
                        <p className={poppins.className} style={{color: "#007FFF", fontSize: "small"}}>
                        Displaying { data?.get_attenance_monthly_all_employee?.length ? data?.get_attenance_monthly_all_employee?.length*activePage : 0} of {dataAgg?.get_attenance_monthly_all_employee?.length} attendaces.
                        </p>
                    }
                    {
                    errAgg || loadAgg ? null :
                    <div className="flex justify-center md:justify-between items-center ">
                        <NumberInput value={itemsPerPage} w={80} min={10} max={100} 
                            //@ts-ignore
                            onChange={setItemsPerPage} />
                        <FootPage 
                        activePage={activePage}
                        onPage={(v: any) => setPage(v)}
                        total={Math.ceil(dataAgg?.get_attenance_monthly_all_employee.length/itemsPerPage)}
                        />
                    </div>
                    }
                </div>

            </Paper>
        </main>


    </> );
}

export default Page;