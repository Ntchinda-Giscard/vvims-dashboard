"use client"
import { useQuery } from '@apollo/client';
import { Modal, Button, Select, Textarea } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { GET_LEAVE_TYPE } from '../queries/queries';
import { useEffect, useState } from 'react';

export default function AddLeaveManagement({opened, close}: any) {

    const {data: dataType, error: errType, loading: loadType} = useQuery(GET_LEAVE_TYPE);
    const [types, setTypes] = useState([]);

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
          email: '',
          type: '',
          to: '',
          from: '',
          comment: '',
        },
    
        validate: {
          email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
      });

    useEffect(() =>{
        const typeOptions = dataType?.leave_type?.map((d: { type: any; }) =>({
            value: d?.type,
            label: `${d?.type}`,
        }))

        setTypes(typeOptions)
    }, [dataType, errType, loadType])

  return (
    <>
      <Modal opened={opened} onClose={close} title= {<p style={{color: "#404040"}} > Leave application </p>}>
        {/* Modal content */}
        <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col gap-3">
                <DateInput
                    label="From"
                    placeholder="Date"
                    withAsterisk
                    key={form.key('from')}
                    {...form.getInputProps('from')}
                    styles={{
                        label:{
                            color: "#404040"
                        },
                    }}
                />

                <DateInput
                    label="To"
                    placeholder="Date"
                    withAsterisk
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
        </div>
      </Modal>

    </>
  );
}