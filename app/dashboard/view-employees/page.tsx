"use client"
import { useDisclosure } from '@mantine/hooks';
import { LoadingOverlay, Button, Group, Box, Paper, TextInput, rem } from '@mantine/core';
import { IconPlus, IconSearch } from '@tabler/icons-react';
import Link from 'next/link'
import ViewEmployeeTable from './components/viewEmployeeTable';
import { useQuery, useSubscription } from '@apollo/client';
import { GET_EMPLOYEE_SUB } from './query/get_employee';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FullWidthSkeletonStack from '../components/defaultTable';
import FootPage from '../components/fotter';
import { GET_EMPLOYEE_AGG } from './query/get_employee_agg';
import {usePathname, useRouter} from 'next/navigation'
import { editEmployeeFunc } from './slices/editEmployeeSlice';
import DeleteEmployeeModal from './components/deleteEmployee';
import { deleteEmployeeFunc } from './slices/deleteEmployeeSlice';
import cx from "clsx"
import { Poppins } from 'next/font/google';

const poppins = Poppins({ subsets: ["latin"], weight:["400"] });

export default function ViewEmployee() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const [activePage, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const user = useSelector((state: any) => state.auth.userInfo);
  const [search, setSearch] = useState('');
  const [deleteDeptOpened, { open: openDelete, close: closeDelete }] = useDisclosure(false);
  const {loading: loadEmployee, error: errEmployee, data: dataEmployee} = useQuery(GET_EMPLOYEE_SUB,{
    variables:{
      company_id: user?.employee?.company_id,
      limit: itemsPerPage,
      offset: (activePage-1) * itemsPerPage,
      search: `%${search}%`,
    }
  })

  const {loading: loadAgg, error: errAgg, data: dataAgg} = useSubscription(GET_EMPLOYEE_AGG,{
      variables: {
        company_id: user?.employee?.company_id,
        search: `%${search}%`,
      }
  })

  const handelSearch= (event: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = event.currentTarget;
    setSearch(value);
  }

  const handleEdit = (value: any) => {
    dispatch(editEmployeeFunc(value))
    router.push(`${pathname}/${value?.id}`)
  }

  const handleDelete = (value: any) => {
    dispatch(deleteEmployeeFunc(value))
    openDelete()
  }

  // Note that position: relative is required
  return (
    <>
      <main className="flex flex-col min-h-full min-w-full">
        <DeleteEmployeeModal
          opened={deleteDeptOpened}
          close={closeDelete}
        />
        <div className="flex flex-row justify-between">
        <p style={{fontWeight: 800, fontSize: "large", color: "#404040"}}> View Employees </p>
            <Button
                leftSection={<IconPlus size={14} />}
                bg={"#16DBCC"} 
                >
                  <Link href="/dashboard/add-employee"> Add Employee </Link>
            </Button>
        </div>
        <Paper p={15} shadow="md" mt="md" radius="md">
          <TextInput 
            leftSectionPointerEvents="none"
            w={300}
            leftSection={<IconSearch style={{width: rem(16), height: rem(16)}} />}
            placeholder="Search"
            size="md"
            radius="md"
            my="md"
            value={search}
            onChange={handelSearch}
          />
          {
            errEmployee || loadEmployee ?
            <FullWidthSkeletonStack /> :
            <ViewEmployeeTable
              datas={dataEmployee?.employees}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          }
          <Group justify="space-between" mt="md">
            {
              errAgg || loadAgg ? null :
              <p className={poppins.className} style={{color: "#007FFF", fontSize: "small"}}>
              Displaying { dataEmployee?.employees?.length ? dataEmployee?.employees?.length*activePage : 0} of {dataAgg?.employees_aggregate?.aggregate?.count} employees.
            </p>}
          {
            errAgg || loadAgg ? null :
            <FootPage 
              activePage={activePage}
              onPage={(v: any) => setPage(v)}
              total={Math.ceil(dataAgg?.employees_aggregate?.aggregate?.count/itemsPerPage)}
            />
          }
          </Group>
          
        </Paper>
      </main>
    </>
  );
}