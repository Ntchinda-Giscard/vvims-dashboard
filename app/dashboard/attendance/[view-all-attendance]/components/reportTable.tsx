"use client"
import { ActionIcon, Table, Menu, rem, ScrollArea, Badge, Button, Avatar } from '@mantine/core';
import { IconTrash, IconEdit, IconPrinter, IconEye, IconUserX, IconCheck, IconX } from '@tabler/icons-react';
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode, useState, useRef } from 'react';
import cx from 'clsx';
import classes from "@/app/dashboard/view-employees/table.module.css";

export default function AttendanceReportTable({ datas, onEdit, onDelete, date, key }: any) {
  const [scrolled, setScrolled] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);  // Create a ref to target the table

  const time_extract = (datetime: any) => {
    if (datetime === null) {
      return "--:--:--";
    }
    const date = new Date(datetime);
    const options = { timezone: 'Africa/Douala', hour12: false };
    const catTime = date.toLocaleTimeString('en-US', options);
    return catTime;
  };
  function removeSeconds(timeStr: any) {
    if (timeStr == null){
      return "--:--"
    }
    const [hours, minutes] = timeStr.split(':');
    return `${hours}:${minutes}`;
  }
  
  const handlePrint = () => {
    const printContents = tableRef.current?.innerHTML;  // Get the table content
    const originalContents = document.body.innerHTML;   // Save the original page content
    
    if (printContents) {
      document.body.innerHTML = printContents;          // Replace body with table content
      window.print();                                   // Trigger print dialog
      document.body.innerHTML = originalContents;       // Restore original content
      window.location.reload();                         // Reload page to reset state
    }
  };

  const rows = datas?.map((data: {
    clockOut: any;
    clockIn: any;
    timeInBuilding: ReactNode;
    clock_out_time: ReactNode;
    clock_in_time: ReactNode;
    attendance_state: any;
    clock_in_date: ReactNode;
    employee: any;
    function: ReactNode;
    firstname: any;
    lastname: any;
    id: Key | null | undefined;
    region: any;
    department: { text_content: { content: ReactNode } };
    service: { text_content: { content: ReactNode } };
    phone_number: ReactNode;
    position: {
      function: ReactNode;
      text_content: { content: ReactNode };
    };
  }) => (
    <Table.Tr key={key}>
      <Table.Td style={{ color: "#404044" }}>
        <EmployeeIcon
           firstname={data?.employee?.firstname}
           lastname={data?.employee?.lastname}
           file_url={""}
        />
        {/* {`${data?.employee?.firstname}` + " " + `${data?.employee?.lastname}`} */}
      </Table.Td>
      <Table.Td style={{ color: "#404044" }}>{time_extract(data?.clockIn)}</Table.Td>
      <Table.Td style={{ color: "#404044" }}>{time_extract(data?.clockOut)}</Table.Td>
      <Table.Td style={{ color: "#404044" }}>{removeSeconds(data?.timeInBuilding)}</Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Button onClick={handlePrint} leftSection={<IconPrinter style={{ width: rem(16), height: rem(16) }} stroke={1} />}>
        PDF
      </Button>
      
      <ScrollArea h={300} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
        {/* Ref target for printing */}
        <div ref={tableRef}>
          <p style={{ marginTop: 5, marginBottom: 5, color: "#404040" }} > {date} </p>
          <Table withRowBorders miw={700}>
            <Table.Thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
              <Table.Tr>
                <Table.Th style={{ color: "#404044" }}> Employee </Table.Th>
                <Table.Th style={{ color: "#404044" }}>Clock in time</Table.Th>
                <Table.Th style={{ color: "#404044" }}>Clock out time</Table.Th>
                <Table.Th style={{ color: "#404044" }}>Time in building</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </div>
      </ScrollArea>
    </>
  );
}



interface visitor_icon{
  file_url: string,
  firstname: string,
  lastname: string
}

function EmployeeIcon({file_url, firstname, lastname}: visitor_icon){

  return(
    <>
      <div className="flex flex-row gap-3 items-center">
        <Avatar variant="filled" radius="xl" src={file_url} alt="no image here" />
        <div className='flex flex-col'>
          <p style={{fontSize: 'small', textTransform: 'uppercase'}}> {firstname} </p>
          <p style={{fontSize: 'small', textTransform: 'capitalize'}}> {lastname} </p>
        </div>
      </div>
    </>
  )
}