"use client"
import { Modal, Button, TextInput, Group, MultiSelect } from '@mantine/core';
import { TimeInput } from '@mantine/dates';
import { useForm } from '@mantine/form';


export default function AddEvent({opened, close}: any) {
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
          title: '',
        },
    
        validate: {
          title: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
      });

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
        <MultiSelect
            radius="md"
            label="Your favorite libraries"
            placeholder="Pick value"
            data={['React', 'Angular', 'Vue', 'Svelte']}
            searchable
            nothingFoundMessage="Nothing found..."

        />
        <TimeInput
            radius="md"
            label="Input label"
            description="Input description"
        />

        <Group grow justify="flex-end" mt="md">
            <Button type="submit">Submit</Button>
        </Group>
    </form>
      </Modal>
    </>
  );
}