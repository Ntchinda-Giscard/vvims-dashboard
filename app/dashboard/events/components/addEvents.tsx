"use client"
import { useQuery } from '@apollo/client';
import { Modal, Button, TextInput, Group, MultiSelect, Textarea } from '@mantine/core';
import { DatePickerInput, TimeInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';
import { GET_EMPLOYEE_EVENTS } from '../queries/get_empl';


export default function AddEvent({opened, close}: any) {

  const [employees, setEmployees ] = useState([])

  const {data: dataAllEmpl, loading: loadEmpl} = useQuery(GET_EMPLOYEE_EVENTS)
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      title: '',
      description: '',
      participants: [],
      start_time: null,
      end_time: null,
      date: null
    },

    validate: {
      title: (value) => ( value?.length > 3 ? null : 'Invalid title'),
    },
  });

  useEffect(() =>{
    const allOptions = dataAllEmpl?.employees?.map((d: {id: any; firstname: any, lastname:any }) =>({
      value: d?.id,
      label: `${d?.firstname}` + " "+ `${d?.lastname}`
    }))

    setEmployees(allOptions)

  }, [dataAllEmpl])

  return (
    <>
      <Modal opened={opened} onClose={close} title=   {<p style={{fontSize: 'small', color: "#404040", fontWeight: 600}} > Add Event </p>} >
        {/* Modal content */}
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput
            radius="md"
            withAsterisk
            label="Title"
            placeholder="enter title"
            key={form.key('title')}
            {...form.getInputProps('title')}
        />
        <Textarea
          radius='md'
          mt={'md'}
          label="Description"
          placeholder="enter description"
          key={form.key('description')}
          {...form.getInputProps('description')}
        />
        <MultiSelect
          radius="md"
          mt={'md'}
          label="Participants"
          placeholder="Pick employees"
          data={employees}
          searchable
          nothingFoundMessage="Nothing found..."
          key={form.key('participants')}
          {...form.getInputProps('participants')}
          styles={{
            label:{
                color: "#404040"
            },
            option:{
                color: "#404040"
            }
        }}

        />
        <DatePickerInput
          label="Date"
          radius="md"
          mt={'md'}
          placeholder="Pick date"
          minDate={new Date()}
          key={form.key('date')}
          {...form.getInputProps('date')}

        />
        <TimeInput
          radius="md"
          mt={'md'}
          label="Start time"
          key={form.key('start_time')}
          {...form.getInputProps('start_time')}
        />

        <TimeInput
          radius="md"
          mt={'md'}
          label="End time"
          key={form.key('end_time')}
          {...form.getInputProps('end_time')}
        />

        <Group grow justify="flex-end" mt="md">
            <Button type="submit">Submit</Button>
        </Group>
    </form>
      </Modal>
    </>
  );
}