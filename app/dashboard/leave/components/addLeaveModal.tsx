"use client"
import { useMutation, useQuery } from '@apollo/client';
import { Modal, Button, Select, Textarea, Loader, rem, FileInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { GET_LEAVE_TYPE } from '../queries/queries';
import { useEffect, useState } from 'react';
import { INSERT_LEAVE } from '../mutation/mutations';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { IconCalendar } from '@tabler/icons-react';
import axios from 'axios';
import FileUpload from "@/app/dashboard/leave/components/fileUploader";

export default function AddLeaveManagement({opened, close}: any) {

    const {data: dataType, error: errType, loading: loadType} = useQuery(GET_LEAVE_TYPE);
    const [insertLeave, {loading: loadInsert}] = useMutation(INSERT_LEAVE);
    const [types, setTypes] = useState([]);
    const user = useSelector((state: any) => state.auth.userInfo);
    const [value, setValue] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false)

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
          type: null,
          to: null,
          from: null,
          comment: null,
        },
    
        validate: {
            type: (value) => ( value !== null ? null : 'Invalid type'),
            to: (value) => ( value !== null ? null : 'Invalid date'),
            from: (value) => ( value !== null ? null : 'Invalid date'),
            comment: (value) => ( value !== null ? null : 'Invalid comment'),
        },
      });

    useEffect(() =>{
        const typeOptions = dataType?.leave_type?.map((d: { type: any; }) =>({
            value: d?.type,
            label: `${d?.type}`,
        }))

        setTypes(typeOptions)
    }, [dataType, errType, loadType])

    function handelSubmit(values: any){
        console.log(values)
        if ( !(values?.to > values?.from)){
            toast.error(" 'From' date should be earlier than the 'To' date")
            return
        }
        insertLeave(
            {
            variables:{
                employee_id: user?.employee?.id,
                comment: values?.comment,
                end_date: values?.to,
                start_date: values?.from,
                leave_type: values?.type
            },
            onCompleted: () =>{
                toast.success("Operation successful")
                form.reset()
                close()
            },
            onError: (err) =>{
                toast.error(`${err.message}`)
            }}
        )
    }

  return (
    <>
      <Modal opened={opened} onClose={close} title= {<p style={{color: "#404040"}} > Leave application </p>}>
        {/* Modal content */}
        <form onSubmit={form.onSubmit((values) => handelSubmit(values))}>
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex flex-col gap-3">
                    <DateInput
                        minDate={new Date()}
                        label="From"
                        placeholder="Date"
                        withAsterisk
                        leftSection={<IconCalendar style={{width: rem(16), height: rem(16)}} />}
                        key={form.key('from')}
                        {...form.getInputProps('from')}
                        styles={{
                            label:{
                                color: "#404040"
                            },
                        }}
                    />

                    <DateInput
                        minDate={new Date()}
                        label="To"
                        placeholder="Date"
                        withAsterisk
                        leftSection={<IconCalendar style={{width: rem(16), height: rem(16)}} />}
                        key={form.key('to')}
                        {...form.getInputProps('to')}
                        styles={{
                            label:{
                                color: "#404040"
                            },
                        }}
                    />

                    <Select 
                        label= "Leave type"
                        data={types}
                        clearable
                        searchable
                        allowDeselect
                        key={form.key('type')}
                        {...form.getInputProps('type')}
                        nothingFoundMessage="Nothing found..."
                        withAsterisk
                        styles={{
                            label:{
                                color: "#404040"
                            },
                            option:{
                                color: "#404040"
                            }
                        }}
                    />
                </div>
                <Textarea
                    size="lg"
                    label="Comment"
                    placeholder="comment..."
                    withAsterisk
                    key={form.key('comment')}
                    {...form.getInputProps('comment')}
                    styles={{
                            label:{
                                color: "#404040"
                            },
                        }}
                />
                {/*<FileUpload />*/}
            </div>
            <div className=" mt-5 flex col gap-2 md:flex-row flex-grow" >
                <Button loading={loadInsert} className="grow" type="submit" color={"#16DBCC"}>
                    Add leave
                </Button>
                <Button color="red" className="grow" onClick={close} >
                    Cancel
                </Button>
            </div>
        </form>
      </Modal>

    </>
  );
}