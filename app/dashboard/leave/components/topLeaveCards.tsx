import classes from "@/app/dashboard/leave/components/styles.module.css";
import { ThemeIcon } from "@mantine/core";
import { IconInfoHexagon, IconCalendar, IconCalendarDot, IconUsersGroup } from "@tabler/icons-react";

export default function TopLeaveCard(){

    const data = [
        { icon: IconInfoHexagon, title: "Pending Request", desc: "Tracking leave request", value: 4 },
        { icon: IconCalendar, title: "Total Request", desc: "Total leave of current month", value: 4 },
        { icon: IconUsersGroup, title: "On leave", desc: "Tracking employees on leave", value: 4 },
        // { icon: IconInfoHexagon, title: "Pending Request", desc: "Tracking leave request", value: 4 },
    ]

    return(
        <>
            <div className="flex flex-col md:flex-row gap-2">
                {
                    data.map((item, index) => (
                        <div className={classes.leavecard}>
                            <div className="flex flex-row justify-between items-center">
                                <ThemeIcon radius="xl" size="lg" color="rgba(247, 247, 247, 1)">
                                    <item.icon color="black" stroke={1} style={{ width: '60%', height: '60%' }} />
                                </ThemeIcon>
                                <span className={classes.value}> {item?.value} </span>
                            </div>
                            <div className="flex flex-col">
                                <p className={classes.title}> {item?.title} </p>
                                <p className={classes.desc}> {item?.desc} </p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}