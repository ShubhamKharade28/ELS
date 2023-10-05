"use client";
import Link from "next/link";
import styles from '@/styles/auth.module.css';
import { motion } from "framer-motion";

const Login = () => {
    return (
        <motion.div className={styles.container}
            initial={{
                y:-50,
                opacity: 0.7
            }}
            animate={{
                y:0,
                opacity: 1
            }}
            transition={{
                duration:0.7,
            }}
        >
            <h1>Login to continue</h1>
            <div className={styles.links}>
                <Link href="/login/student">Student Login &rArr;</Link>
                <Link href="/login/admin">Admin Login &rArr;</Link>
                <Link href="/register/admin">Admin Register &rArr;</Link>
            </div>
        </motion.div>
    )
}

export default Login;