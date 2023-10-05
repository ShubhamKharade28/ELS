"use client";
import styles from '@/styles/auth.module.css';
import { motion } from 'framer-motion';
import HomeBtn from '@/app/components/homebtn';

const StudentLogin = () => {

    return (
        <div className={styles.container}>
            <HomeBtn />
            <motion.h2
                initial={{scale:1.04}}
                animate={{
                    scale:1,
                    transition: { duration: 0.4}
                }}
            >
                Login as student
            </motion.h2>
            <form>
                <input type='text' placeholder='PRN'
                />
                <input type='password' placeholder='Password'
                />
                <button>Login</button>
            </form>
        </div>
    )
}

export default StudentLogin;