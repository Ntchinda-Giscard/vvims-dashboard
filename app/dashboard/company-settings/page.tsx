"use client"
import { Group, Tabs, rem } from '@mantine/core';
import { IconPhoto, IconMessageCircle, IconSettings, IconCalendarMonth, IconMapPin, IconInfoCircle } from '@tabler/icons-react';
import CompanySchedule from './components/companySchedule';

function Page() {
  const iconStyle = { width: rem(12), height: rem(12) };

  return (
    <>
      <main className="flex flex-col min-w-full min-h-full"> 
      <p style={{ fontWeight:  800, fontSize: "large", color: "#404040"}}> Company Settings </p>
      <Tabs mt="xl" defaultValue="settings" styles={{ tabLabel:{color: "#404040"} }} >
        <Tabs.List grow justify="center" >
          <Tabs.Tab value="gallery" leftSection={<IconInfoCircle color="black" style={iconStyle} />}>
            Shift shedules
          </Tabs.Tab>
          <Tabs.Tab value="messages" leftSection={<IconMapPin color="black" style={iconStyle} />}>
            Location
          </Tabs.Tab>
          <Tabs.Tab value="settings" leftSection={<IconCalendarMonth  color="black" style={iconStyle} />}>
            Work schedules
          </Tabs.Tab>
        </Tabs.List>
      

      <Tabs.Panel value="gallery">
        Gallery tab content
      </Tabs.Panel>

      <Tabs.Panel value="messages">
        Messages tab content
      </Tabs.Panel>

      <Tabs.Panel value="settings">
        <CompanySchedule />
      </Tabs.Panel>
    </Tabs>
      </main>
    </>
    
  );
}

export default Page