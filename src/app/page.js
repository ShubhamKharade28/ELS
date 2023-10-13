"use client";
import Link from "next/link";
import styles from '@/styles/auth.module.css';
import BigLoader from "./components/bigloader";
import Menubar from "./components/menubar";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Home = () => {

    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const adminId = localStorage.getItem('adminId');
        if(adminId){
            router.push('/admin');
        }
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, [])

    if(loading){
        return (
            <div className={styles.dashboardContainer}>
                <Menubar />
                <BigLoader />
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h1>Login to continue</h1>
            <div className={styles.links}>
                <Link href="/login">Admin Login &rArr;</Link>
                <Link href="/register">Admin Register &rArr;</Link>
                <Link href="/student">Fill Elective Form &rArr;</Link>
            </div>
        </div>
    )
}

export default Home;