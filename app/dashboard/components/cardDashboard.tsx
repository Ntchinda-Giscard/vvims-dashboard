import { useState } from 'react';
import dayjs from 'dayjs';
import { UnstyledButton, Text, Paper, Group, rem, ThemeIcon } from '@mantine/core';
import {
  IconSwimming,
  IconBike,
  IconRun,
  IconChevronDown,
  IconChevronUp,
} from '@tabler/icons-react';
import classes from '@/app/dashboard/components/StatsCommon.module.css';

const data = [
  { icon: IconRun, label: 'Running', color: 'teal' },
  { icon: IconSwimming, label: 'Swimming', color: 'grape' },
  { icon: IconBike, label: 'Bike', color: 'violet' },
  { icon: IconBike, label: 'Like', color: '' },
];

export default function StatsControls() {
  const [date, setDate] = useState(new Date(2021, 9, 24));

  const stats = data.map((stat) => (
    <Paper maw={200}  w={150} withBorder p="xs" radius="md"  key={stat.label}>
      <ThemeIcon radius="xl" color={stat.color}>
        <stat.icon
          style={{ width: '70%', height: '70%' }}
          // className={classes.icon}
          stroke={1.5}
        />
      </ThemeIcon>
      <div>
        <p className={classes.label}>{stat.label}</p>
        <p className={classes.count}>
          <span className={classes.value}>{Math.floor(Math.random() * 6 + 4)}km</span> / 10km
        </p>
      </div>
    </Paper>
  ));

  return (
      <div className='flex flex-col md:flex-row justify-around' >{stats}</div>
  );
}