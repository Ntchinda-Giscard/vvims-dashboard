import { Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";


function Page() {
    return ( <>
       <main className="flex flex-col min-w-full min-h-full">
            <div className={"flex flex-col  md:flex-row justify-between mb-8"}>
                    <p style={{fontWeight: 800, fontSize: "large", color: "#404040"}}> Leaves </p>
                        <Button leftSection={ <IconPlus size={14} /> }  color={"#16DBCC"}>
                            Add Leaves
                        </Button>
                </div>
            </main>
    </> );
}

export default Page;