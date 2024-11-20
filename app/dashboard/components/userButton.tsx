"use client"
import { UnstyledButton, Group, Avatar, Text, rem, Menu } from '@mantine/core';
import {IconLogout,
  IconBell,
    IconHeart,
    IconStar,
    IconMessage,
    IconSettings,
    IconPlayerPause,
    IconTrash,
    IconSwitchHorizontal,
    IconChevronRight,
    IconDots, } from '@tabler/icons-react';
// import classes from './UserButton.module.css';
import {useRouter } from "next/navigation"
import { useDispatch } from 'react-redux';
import { logout } from '@/app/auth/login/slice/authSlice';
import { useMediaQuery } from '@mantine/hooks';


export function UserButton({name, url, email}: any) {

    const dispatch = useDispatch();
    const router = useRouter();

    const matches = useMediaQuery('(min-width: 426px)');

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem("token")
        // Navigate to login page
        router.push('/auth/login');
  
    }
  return (
    <UnstyledButton 
    // className={classes.user}
      mr={20}
    >
      <Group gap={0}>
        
        <Menu
          withArrow
        >
          <Avatar
            src={url}
            radius="xl"
            name={name}
            color={'initials'}
            size={'sm'}
          />
          <div style={{ flex: 1, display: matches ? 'block' : 'none' }}>
            <Text tt={'capitalize'} c={'white'} size="sm" fw={500}>
                {name}
            </Text>

            <Text c="dimmed" size="xs">
                {email}
            </Text>
          </div>
            <Menu.Target>
              <IconChevronRight color={'white'} style={{ width: rem(14), height: rem(14) }} stroke={1.5} />
            </Menu.Target>
            <Menu.Dropdown>
            <Menu.Item rightSection={<IconChevronRight size={16} stroke={1.5} />}>
            <Group>
              <Avatar
                radius="xl"
                src={url}
              />

              <div>
                <Text tt={'capitalize'} c={'black'} size="sm" fw={500}>
                  {name}
                </Text>

                <Text c="dimmed" size="xs">
                  {email}
                </Text>
              </div>
            </Group>
          </Menu.Item>

          <Menu.Divider />
          <Menu.Item
            leftSection={<IconBell style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
            // onClick={handleLogout}
          >
            Notifications
          </Menu.Item>
          <Menu.Item
            leftSection={<IconSettings style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
            // onClick={handleLogout}
          >
            Settings
          </Menu.Item>
          <Menu.Item
            leftSection={<IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
            onClick={handleLogout}
            color={'red'}
          >
            Logout
          </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </UnstyledButton>
  );
}
