"use client"

import cx from "clsx";
import classes from "@/app/dashboard/components/css/dashboard.module.css";
import {Poppins} from "next/font/google";
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {PasswordInput, Stack, Paper, Group, Button} from '@mantine/core';
import {UPDATE_EMPLOYEE_PASSWORD} from "@/app/dashboard/settings/query/query";
import { useMutation } from "@apollo/client";
import {useSelector} from "react-redux";
import {useState} from "react";
import toast from "react-hot-toast";

const font_heading = Poppins({ subsets: ["latin"], weight:["500"] });

export default function Page(){
    const user = useSelector((state: any) => state.auth.userInfo);
    const [updatePassword, {loading: loadingUpdate}] = useMutation(UPDATE_EMPLOYEE_PASSWORD);
    const [visible, { toggle }] = useDisclosure(false);
    const [error, setError] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            newPassword: null,
            currentPassword: null
        },

        validate: {
            currentPassword: (value: any) => ( !value ||  value?.length < 6 ? 'Invalid password, password need to be characters minimum' : null),
            newPassword: (value: any) => ( !value ||  value?.length < 6 ? 'Invalid password, password need to be characters minimum' : null),
        },
    });

    const handleSubmit = (values: any) =>{
        updatePassword({
            variables:{
                currentPassword: values?.currentPassword,
                newPassword: values?.newPassword,
                phoneNumber: user?.employee?.phoneNumber
            },
            onCompleted: () => {
                toast.success("Password updated")
                form.reset()
                setError(false)
            },
            onError:(err)=>{
                setError(true)
            }
        })
    }
    return(
        <>
            <main className="flex min-h-full flex-col gap-3">
                <p className={cx([classes.heading, font_heading.className])}> Settings </p>
                <Paper
                    radius={'lg'}
                    shadow={'md'}
                    p={'md'}
                    mx={'lg'}
                >

                    <Stack>
                        <form onSubmit={form.onSubmit((values) => console.log(values))}>
                            <PasswordInput
                                label="Current password"
                                radius={"lg"}
                                visible={visible}
                                onVisibilityChange={toggle}
                                key={form.key('currentPassword')}
                                {...form.getInputProps('currentPassword')}
                                styles={{
                                    label: {
                                        color: "#404040"
                                    }
                                }}
                            />
                            <PasswordInput
                                label="New password"
                                radius={"lg"}
                                mt={"md"}
                                visible={visible}
                                onVisibilityChange={toggle}
                                key={form.key('newPassword')}
                                {...form.getInputProps('newPassword')}
                                styles={{
                                    label: {
                                        color: "#404040"
                                    }
                                }}
                            />
                            <Group justify="flex-end" mt="md">
                                <Button radius={"lg"} type="submit">Submit</Button>
                            </Group>
                        </form>

                    </Stack>

                </Paper>

                <Paper
                    radius={'lg'}
                    shadow={'md'}
                    p={'md'}
                    mx={'lg'}
                    mt={'lg'}
                >

                </Paper>
            </main>

        </>
    )
}