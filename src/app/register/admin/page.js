"use client";
import styles from '@/styles/auth.module.css';
import { motion } from 'framer-motion';

import Head from 'next/head';

const inputFocus = {
    scale: 1.03
}

const AdminRegister = () => {
    return (
        <div className={styles.container}>
            <motion.h2
                initial={{scale:1.1}}
                animate={{
                    scale:1,
                    transition: { duration: 0.6,delay:0.4}
                }}
            >
                Signup as admin
            </motion.h2>
            <form>
                <motion.input whileFocus={inputFocus}
                 type='text' placeholder='Enter your email' />
                <motion.input whileFocus={inputFocus}
                 type='text' placeholder='Enter your name' />
                <motion.input whileFocus={inputFocus}
                 type='password' placeholder='Create a password' />
                <motion.button
                    whileHover={{ 
                        boxShadow: '1px 1px 5px #4A5365',
                        scale: 1.1
                    }}
                    whileTap={{
                        scale: 0.96
                    }}
                >Signin</motion.button>
            </form>
        </div>
    )
}

export default AdminRegister;