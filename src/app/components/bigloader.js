"use client";
import { motion } from "framer-motion";

import styles from '@/styles/bigloader.module.css';

const BigLoader = () => {
    return (
        <div className={styles.bigloaderContainer}>
            <motion.div className={styles.bigloader}
                animate={{rotate:360}}
                transition={{ duration: 1, repeat: Infinity}}
            />
        </div>
    )
}

export default BigLoader;