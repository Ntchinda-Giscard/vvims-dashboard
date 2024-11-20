"use client"
import { useDisclosure } from '@mantine/hooks';
import { Button, FloatingIndicator, Paper, Tabs, TextInput } from "@mantine/core";
import EventsTable from "./components/eventsTables";
import { IconSearch } from "@tabler/icons-react";
import classes from './Demo.module.css';
import { useEffect, useState } from "react";
import AddEvent from './components/addEvents';
import { useSubscription } from '@apollo/client';
import { GET_EVENTS } from './queries/get_events';

function EventsPage() {

    const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
    const [value, setValue] = useState<string | null>('1');
    const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({});
    const {data: dataEvents, error: errError, loading: loadEvents} = useSubscription(GET_EVENTS);
    const setControlRef = (val: string) => (node: HTMLButtonElement) => {
    controlsRefs[val] = node;
    setControlsRefs(controlsRefs);
  };

  const [openedAdd, { open: openAdd , close: closeAdd }] = useDisclosure(false);
  const games = [
    { name: "Game 1", author: "Author 1", slug: "game1" },
    { name: "Game 2", author: "Author 2", slug: "game2" },
    { name: "Game 3", author: "Author 3", slug: "game3" },
  ];

  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      if (Notification.permission === "granted") {
        randomNotification();
      } else if (Notification.permission === "default") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            randomNotification();
          } else {
            console.log("Notifications are blocked.");
          }
        });
      }
    } else {
      console.error("Notification API is not supported in this environment.");
    }
  }, [dataEvents]);

  function randomNotification() {
    const randomItem = Math.floor(Math.random() * games.length);
    const notifTitle = games[randomItem].name;
    const notifBody = `Created by ${games[randomItem].author}.`;
    if (!("Notification" in window)) {
        console.error("This browser does not support desktop notifications.");
      } else {
        console.log("Notification API is supported.");
    }
    const notifImg = `/data/img/${games[randomItem].slug}.jpg`; // Adjust path based on your setup
    const options = {
      body: notifBody,
    //   icon: notifImg,
    };

    new Notification(notifTitle, options);
    setTimeout(randomNotification, 10000); // Call the function again after 30 seconds
  }

  
  
    return ( 
    <>
        <main className="flex flex-col min-w-full min-h-full">
            <AddEvent
                close={closeAdd}
                opened={openedAdd}
            />
            <div className={"flex flex-col  md:flex-row justify-between mb-8"}>
                <p style={{fontWeight: 800, fontSize: "large", color: "#404040"}}> Events Managements </p>
                <Button  color={"#16DBCC"} 
                    onClick={openAdd}
                >
                    Add Event
                </Button>
            </div>
            <Paper
                p="md"
                shadow="md"
                radius="lg"
            >
                <div className="flex mt-4 mb-4 flex-col lg:flex-row items-center lg:justify-between justif-center ">
                    <div className='flex flex-row gap-5 mb-4'>
                        <p style={{fontWeight: 800, fontSize: "medium", color: "#404040"}}> Events </p>
                        <TextInput radius={'md'} leftSection={<IconSearch stroke={1} width={20} height={20} />} placeholder="Search for events" />
                    </div>
                    <Tabs variant="none" mt={15} value={value} onChange={setValue}>
                        <Tabs.List ref={setRootRef} className={classes.list}>
                            <Tabs.Tab value="1" ref={setControlRef('1')} className={classes.tab}>
                                All events
                            </Tabs.Tab>
                            <Tabs.Tab value="2" ref={setControlRef('2')} className={classes.tab}>
                                Completed
                            </Tabs.Tab>
                            <Tabs.Tab value="3" ref={setControlRef('3')} className={classes.tab}>
                                Pending
                            </Tabs.Tab>

                            <FloatingIndicator
                                target={value ? controlsRefs[value] : null}
                                parent={rootRef}
                                className={classes.indicator}
                            />
                        </Tabs.List>
                    </Tabs>
                </div>
                <EventsTable 
                    datas={dataEvents?.events}
                />
            </Paper>
        </main>
    
    </> 
    );
}

export default EventsPage;