"use client"
import { IconArrowLeft, IconId, IconIdBadge, IconMapPin, IconPhone, IconPin, IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { ActionIcon, Group, Paper, Badge, Text, Image, Card, Stack,rem, Divider, Button } from "@mantine/core";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { ContactIconsList } from "../components/contactSection";

function Pages() {
    const router = useRouter();
    const visitor = useSelector((state: any) => state.visitor.visitor);
    const dateConverter=(date: any) =>{
        if(date  === null) return '--:--'
        const new_date = new Date(date).toLocaleTimeString('en-GB', {hour12: false})
        return new_date
      }
    useEffect(() =>{
        console.log("Visitor", visitor)
    },[visitor])
    return ( <>
    <main className="flex flex-col min-w-full min-h-full">
        <Group mb="xl">
            <ActionIcon onClick={() =>router.back()} color="#404040" variant="subtle" aria-label="Settings">
                <IconArrowLeft style={{ width: '70%', height: '70%' }} stroke={1.5} />
            </ActionIcon>
            <p style={{fontWeight: 800, fontSize: "large", color: "#404040"}}> Visitor details </p>
        </Group>
        <div className="flex md:flex-row gap-5 flex-col">
            <Card withBorder>
                <Card.Section>
                    <Image
                        // radius="md"
                        src={visitor?.visitorByVisitor?.file?.file_url                        }
                        h={200}
                        fallbackSrc="https://placehold.co/600x400?text=Placeholder"
                    />
                </Card.Section>
                <div className="flex flex-row justify-between items-center">
                    <p style={{color:'black', fontSize: 'xsmall', textTransform: "uppercase"}}> status </p>

                <Badge mt="xs" variant="light" color={visitor?.visit_status?.status === 'PENDING' ? 'blue' : (visitor?.visit_status?.status === 'ACCEPTED' ? 'teal' : 'red')}>
          {visitor?.visit_status?.status}</Badge>
                </div>
            <div className="flex flex-row justify-center " >
                <p style={{fontWeight: 700, fontSize: 'medium', color: "black", textTransform: "capitalize", textAlign: "center"}}>
                    {visitor?.visitorByVisitor?.firstname + " " +visitor?.visitorByVisitor?.lastname}
                </p>
                {/* <Stack gap={3}>
                    <Text size="sm" c='dimmed'> {`Clock in: ${dateConverter(visitor?.check_in_at)}`} </Text>
                    <Text size="sm" c='dimmed'> {`Clock out: ${dateConverter(visitor?.check_out_at)}`} </Text>
                </Stack> */}
            </div>
            <div className="flex flex-col mt-9" >
                <div className="flex flex-row justify-between " >
                    <Group>
                        <IconPhone style={{width: rem(16), height: rem(16)}} stroke={1} />
                        <Text c='black'>  Phone </Text>
                    </Group>
                    <Text c='dimmed'> {visitor?.visitorByVisitor?.phone_number} </Text>
                </div>
                <Divider mt={2} mb={15} />
                <div className="flex flex-row justify-between " >
                    <Group>
                        <IconId style={{width: rem(16), height: rem(16)}} stroke={1}/> 
                        <Text c='black'> Id Number </Text>
                    </Group>
                    <Text c='dimmed'> {visitor?.visitorByVisitor?.id_number} </Text>
                </div>
                <Divider mt={2} mb={5} />
                <div className="flex flex-row justify-between " >
                    <Group>
                        <IconIdBadge style={{width: rem(16), height: rem(16)}} stroke={1} /> 
                        <Text c='black'> Reg No. </Text>
                    </Group>
                    <Text c='dimmed'> {visitor?.reg_no} </Text>
                </div>
                <Divider mt={2} mb={5} />
            </div>
            <p style={{ textAlign: 'center', color: "#404040", fontWeight: 700 }}> Host </p>
            <Group>
                <p style={{color: "#404040", fontWeight: 500, textTransform: 'capitalize'}}> {visitor?.employee?.firstname} </p>
                <p style={{color: "#404040", fontWeight: 500, textTransform: 'capitalize'}}> {visitor?.employee?.lastname} </p>
            </Group>
            <div className="flex justify-center min-w-full mt-5 mb-5 gap-3">
                <IconMapPin style={{width: rem(16), height: rem(16)}} stroke={1} /> 
                <Text c='black'> {visitor?.visitorByVisitor?.company?.address} </Text>
            </div>
            <div className="flex justify-center min-w-full gap-2">
                <p style={{color: "#404040", fontSize: 'smaller'}}> vvims</p>
                <p style={{color: "#404040", fontSize: 'smaller'}}> -</p>
                <p style={{color: "#404040", fontSize: 'smaller'}}>{visitor?.visitorByVisitor?.company?.abbrev} </p>
            </div>

            <Button disabled color={"#16DBCC"} fullWidth mt="md" radius="md">
                Print Card
            </Button>
            </Card>
            <div className="flex flex-col">
                <Paper withBorder p="md" >
                    <p style={{color: "#404040", fontWeight: 700, textTransform: 'capitalize'}}> National Identity Card / Passport </p>
                    <div className="flex flex-col md:flex-row gap-5 mt-5">
                        <div className="flex flex-col">
                            <p style={{color: "#404040", fontSize: 'medium', textTransform: "capitalize", fontWeight: 500}}> Front</p>
                            <Image
                                radius="md"
                                src={visitor?.visitorByVisitor?.fileByFrontId?.file_url                        }
                                h={200}
                                fallbackSrc="https://placehold.co/600x400?text=Placeholder"
                            />

                        </div>
                        <div className="flex flex-col">
                            <p style={{color: "#404040", fontSize: 'medium', textTransform: "capitalize", fontWeight: 500}}> Back</p>
                            <Image
                                radius="md"
                                src={visitor?.visitorByVisitor?.fileByBackId?.file_url                       }
                                h={200}
                                fallbackSrc="https://placehold.co/600x400?text=Placeholder"
                            />

                        </div>
                    </div> 
                </Paper>
                {/* <Paper withBorder mt={'md'}>
                <Text fz="lg" fw={700} c="#fff">
                    Contact information
                </Text>

                <ContactIconsList />
                </Paper> */}
            </div>
        </div>
    </main>
    
    </> );
}

export default Pages;