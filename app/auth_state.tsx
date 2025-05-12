"use client"

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function AuthState() {
    const user = useSelector((state: any) => state.auth.userInfo);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() =>{
        if(user === null || user === undefined){
            // router.push("/auth/login")
        }
    }, [pathname, router])
    return ( <>Loading...</> );
}

export default AuthState;