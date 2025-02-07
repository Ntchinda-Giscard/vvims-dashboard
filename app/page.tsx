"use client"
import Image from "next/image";

import classes from "@/app/components/css/dashboard.module.css"
import { Poppins } from "next/font/google";
import { useEffect } from "react";
import {useRouter, usePathname} from 'next/navigation'


const font_heading = Poppins({ subsets: ["latin"], weight:["500"] });

export default function Page(){
  const router  = useRouter();
  const pathname = usePathname();

  useEffect(()=>{
      if(pathname == '/'){
          console.log("no token")
          router.push('/site')
      }
  }, [pathname, router])
  return<> Loading...</>
}
