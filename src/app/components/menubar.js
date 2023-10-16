"use client";
import styles from '@/styles/menubar.module.css';
import { GiHamburgerMenu } from 'react-icons/gi';
import { RxCross2 } from 'react-icons/rx';
import { BiLogOut } from 'react-icons/bi';
import { motion } from 'framer-motion';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const sidebarVariants = {
    open: {
        x: 0,
        opacity: 1,
    },
    closed: {
        x: -600,
        opacity: 0
    }
}

const btnVariants = {
    open: {
        opacity: 0.4,
    },
    closed: {
        opacity: 1
    }
}

const Menubar = () => {
    
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('Admin');
    const [email, setEmail] = useState('admin@email');
    const router = useRouter();

    useEffect(() => {
        let nm = localStorage.getItem('adminName');
        let eml = localStorage.getItem('adminEmail');
        nm? setName(nm): 'Admin';
        eml? setEmail(eml): 'admin@email'
    }, [])

    const logoutHandler = () => {
        localStorage.removeItem('adminName');
        localStorage.removeItem('adminEmail');
        localStorage.removeItem('adminId');
        router.push('/')
    }

    return (
        <div>
            <motion.button className={styles.hamburgerBtn} onClick={() => setIsOpen(true)}
                variants={btnVariants}
                animate={isOpen ? "open":"closed"}
                transition={{
                    duration: 0.2}}
            >
                <GiHamburgerMenu size={20} color={'#091836'} />
            </motion.button>
            <motion.div className={styles.menuContainer}
                initial={"closed"}
                variants={sidebarVariants}
                animate={isOpen ? "open":"closed"}
                transition={{
                    duration: 0.4,
                    type: 'spring',
                    damping: 15,
                }}
            >
                <div className={styles.menus}>
                    <button className={styles.crossBtn} >
                            <RxCross2  size={30} color={'#091836'} style={{cursor: 'pointer'}}
                            onClick={() => setIsOpen(false)}/>
                    </button>
                    <ul>
                        <li>
                            <Link href="/admin">Courses</Link>
                        </li>
                        <li>
                            <Link href="/admin/add-elective">Add Course</Link>
                        </li>
                    </ul>
                    <div className={styles.profile}>
                        <h6>{name}</h6>
                        <span>{email}</span>
                        <button className={styles.logoutBtn} onClick={logoutHandler}>
                            <BiLogOut/>
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
        </motion.div>
        </div>
        
    )
}

export default Menubar;