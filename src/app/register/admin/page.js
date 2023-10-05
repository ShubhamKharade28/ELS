"use client";
import styles from '@/styles/auth.module.css';
import { motion } from 'framer-motion';
import HomeBtn from '@/app/components/homebtn';

const AdminRegister = () => {
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
                Register as admin
            </motion.h2>
            <form>
                <input
                 type='text' placeholder='Enter your email' />
                <input
                 type='text' placeholder='Enter your name' />
                <input
                 type='password' placeholder='Create a password' />
                <button>Register</button>
            </form>
        </div>
    )
}

export default AdminRegister;