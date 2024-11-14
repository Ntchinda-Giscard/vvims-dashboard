"use client"
import { UnstyledButton, Group, Avatar, Text, rem, Menu } from '@mantine/core';
import {IconLogout,
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

export function UserButton({name, url, email}: any) {

    const dispatch = useDispatch();
    const router = useRouter()

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem("token")
        // Navigate to login page
        router.push('/auth/login');
  
    }
  return (
    <UnstyledButton 
    // className={classes.user}
    >
      <Group gap={1}>
        <Avatar
          src={url}
          radius="xl"
          name={name}
          color={'initials'}
        />
        <Menu
            withArrow
        >
            <Menu.Target>
                <IconChevronRight style={{ width: rem(14), height: rem(14) }} stroke={1.5} />
                <div style={{ flex: 1 }}>
                    <Text tt={'capitalize'} c={'white'} size="sm" fw={500}>
                        {name}
                    </Text>

                    <Text c="dimmed" size="xs">
                        {email}
                    </Text>
                </div>
            </Menu.Target>
            <Menu.Dropdown>
            {/* <Menu.Item
            leftSection={<IconSettings style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
          >
            Account settings
          </Menu.Item> */}
          <Menu.Item
            leftSection={<IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
            onClick={handleLogout}
          >
            Logout
          </Menu.Item>
            </Menu.Dropdown>
        </Menu>
      </Group>
    </UnstyledButton>
  );
}
