"use client";
import styles from '@/styles/menubar.module.css';
import { GiHamburgerMenu } from 'react-icons/gi';
import { RxCross2 } from 'react-icons/rx';
import { BiLogOut } from 'react-icons/bi';
import { motion } from 'framer-motion';
import { useState } from 'react';

const sidebarVariants = {
    open: {
        x: 0,
    },
    closed: {
        x: -1000,
    }
}

const Menubar = () => {
    
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <button className={styles.hamburgerBtn} onClick={() => setIsOpen(true)}>
                <GiHamburgerMenu size={20} color={'#091836'} />
            </button>
            <motion.div className={styles.menuContainer}
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
                            <RxCross2  size={30} color={'#091836'} onClick={() => setIsOpen(false)}/>
                    </button>
                    <ul>
                        <li>Electives</li>
                        <li>Add elective</li>
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