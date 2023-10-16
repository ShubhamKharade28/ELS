"use client";
import Link from "next/link";
import styles from '@/styles/auth.module.css';

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Home = () => {

    const router = useRouter();

    useEffect(() => {
        const adminId = localStorage.getItem('adminId');
        if(adminId){
            router.push('/admin');
        }
    }, [])

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