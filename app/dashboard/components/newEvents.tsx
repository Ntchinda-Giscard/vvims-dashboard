"use client"
import classes from "@/app/dashboard/components/css/dashboard.module.css";
import styles from "@/app/dashboard/components/css/MyCalendar.module.css";
import { useQuery } from "@apollo/client";
import { Paper, Divider, Space, Box, Avatar } from "@mantine/core";
import {DatePicker, DatePickerProps, Calendar} from "@mantine/dates"
import { GET_EVENT_CARD } from "../query/get_percent";
import NoDataComponent from "./nodataComponent";
import { useEffect, useState } from "react";
import { IconClock } from "@tabler/icons-react";

function NewEvents() {
    const {data, loading, error} = useQuery(GET_EVENT_CARD);
    const [value, setValue] = useState<Date | null>(null)
    const getDayProps: DatePickerProps['getDayProps'] = (date) => {
        if (date.getDay() === new Date().getDay() && date.getDate() === new Date().getDate()) {
          return {
            style: {
              backgroundColor: '#fff010',
              color: 'var(--mantine-color-white)',
              borderRadius: 30,
            },
          };
        }


            if (date.getDay() === value?.getDay() && date.getDate() === value?.getDate()) {
                return {
                  style: {
                    backgroundColor: '#007fff',
                    color: 'var(--mantine-color-white)',
                    borderRadius: 30,
                  },
                };
            }

      
        return {};
      };
      
      const getYearControlProps: DatePickerProps['getYearControlProps'] = (date) => {
        if (date.getFullYear() === new Date().getFullYear()) {
          return {
            style: {
              color: 'var(--mantine-color-blue-filled)',
              fontWeight: 700,
            },
          };
        }
      
        if (date.getFullYear() === new Date().getFullYear() + 1) {
          return { disabled: true };
        }
      
        return {};
      };
      
      const getMonthControlProps: DatePickerProps['getMonthControlProps'] = (date) => {
        // if (date.getMonth() === 1) {
          return {
            style: {
              color: 'var(--mantine-color-blue-filled)',
              fontWeight: 700,
            },
          };
        // }
      
        // if (date.getMonth() === 5) {
        //   return { disabled: true };
        // }
      
        // return {};
      };
      
    useEffect(() =>{
        console.log("Event data ===>", data)
    },[data])
    return (
        <>
        <p className={classes.taskEventTitle}> Task and Events </p>
            {
                data?.events?.length == 0 && !error ?
                <>
                    <div className="w-full flex justify-center">
                        <DatePicker
                            // type={"multiple"}
                            // value={value}
                            // size={'xs'}
                            // w={"100%"}
                            onChange={setValue}
                            defaultDate={new Date()}
                            getDayProps={getDayProps}
                            getYearControlProps={getYearControlProps}
                            getMonthControlProps={getMonthControlProps}
                            styles={{
                                calendarHeader: {
                                    color: "#000"
                                },
                                calendarHeaderControl: {
                                    color: "#000"
                                },
                                day:{
                                    fontSize: 'small'
                                }
                            }}
                        />
                        
                        {/* <div className="grid gap-x-8 gap-y-8 w-full md:grid-cols-2 grid-cols-1 ">
                            {
                                data?.events.map((e: { title: any; events: { start_date: any; title: any; start_time: any; description: any; }; }) => (
                                    <EventButton key={e?.title} date={e?.events?.start_date}  title={e?.events?.title} time={e?.events?.start_time} desc={e?.events?.description}  />
                                ))
                            }
                        </div> */}
                    </div>
                    <Space h="md" />
                    <EventCard
                        time={'07:00'}
                        bg={'rgba(207, 61, 209, 0.2)'}
                        b={'rgba(207, 61, 209, 0.9)'}
                    />

                    <EventCard
                        time={'07:00'}
                        bg={'rgba(81, 61, 209, 0.2)'}
                        b={'rgba(81, 61, 209, 0.9)'}
                    />
                </>
                 :
                <NoDataComponent button_msg={"Add event"} link={"#"} comment="No event have been created yet. Click the button bellow to add new events." />
            }
    
        </>
    );
}

export default NewEvents;


function EventCard({bg, b, time}: any){

    return(
        <>
            <div className="flex flex-col">
                <Divider my="xs" label={time} labelPosition="left" />
                <div className="flex flex-row">
                    <Box w={30}></Box>
                    <Box p="md" bg={bg} className={classes.eventCard} w="100%" >
                        <div className="flex flex-col">
                            <span className={classes.eventTitleSpan} style={{ borderLeft: `solid 3px ${b}` }} > 
                                Meeting with design team
                            </span>
                            <div className="flex flex-row gap-2 mt-2  mb-2 items-center">
                                <IconClock color="#404040" stroke={1} width={15} height={15} />
                                <p className={classes.eventTime}> {`${'7:30'}-${'9:00'}`} </p>
                            </div>

                            <Avatar.Group>
                                <Avatar color="initials" size="sm" name="John Doe" src="https://bit.ly/dan-abramov" />
                                <Avatar color="initials" size="sm" name="Jane Doe" src="https://bit.ly/kent-c-dodds" />
                                <Avatar color="initials" size="sm" name="Jim Doe" src="https://bit.ly/jason-white" />
                                <Avatar color="initials" size="sm">+3</Avatar>
                            </Avatar.Group>
                        </div>
                    </Box>
                </div>
            </div>
        </>
    )
}

function EventButton({title, time, desc, date}:any){

    return(<>
        <div className="flex flex-row items-center gap-3">
            <EventDateBox date={date} />
            <div className="flex flex-col w-full "> 
                <div className={"flex flex-row w-full justify-between"}>
                    <div className={classes.eventTitle}>{title}</div>
                    <div className={classes.eventTime}> {time}</div>
                </div>
                <div className={`${classes.eventDesc}`}> {desc} </div>
            </div>
        </div>
    </>);
}

function EventDateBox({date}:any){

    return(<>
        <div className={classes.dateEvent}>
            <span className={classes.dateSpan}> 18 </span>
            <span className={classes.dateSpan}> FEB </span>
        </div>
    </>);
}