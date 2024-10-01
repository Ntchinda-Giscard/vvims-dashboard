import { Button } from "@mantine/core";

function Page() {
    return ( <>
       <main className="flex flex-col min-w-full min-h-full">
            <div className={"flex flex-col  md:flex-row justify-between mb-8"}>
                    <p style={{fontWeight: 800, fontSize: "large", color: "#404040"}}> Leaves </p>
                        <Button  bg={"#16DBCC"}>
                            Add Leaves
                        </Button>
                </div>
            </main>
    </> );
}

export default Page;