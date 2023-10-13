"use client";
import styles from '@/styles/menubar.module.css';
import { GiHamburgerMenu } from 'react-icons/gi';
import { RxCross2 } from 'react-icons/rx';
import { BiLogOut } from 'react-icons/bi';
import { motion } from 'framer-motion';

import { useState } from 'react';
import Link from 'next/link';

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
                        <h6>admin name</h6>
                        <span>admin@example.com</span>
                            <button className={styles.logoutBtn}>
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