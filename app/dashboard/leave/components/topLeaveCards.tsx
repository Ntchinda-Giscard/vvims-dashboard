import classes from "@/app/dashboard/leave/components/styles.module.css";
import { ThemeIcon } from "@mantine/core";
import { IconInfoHexagon } from "@tabler/icons-react";

export default function TopLeaveCard(){

    return(
        <>
            <div>
                <div className={classes.leavecard}>
                    <div className="flex flex-row justify-between">
                        <ThemeIcon radius="xl" size="xl" color="rgba(247, 247, 247, 1)">
                            <IconInfoHexagon style={{ width: '70%', height: '70%' }} />
                        </ThemeIcon>
                        <span> 4 </span>
                    </div>
                </div>
            </div>
        </>
    )
}