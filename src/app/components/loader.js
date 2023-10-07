"use client";
import styles from '@/styles/loader.module.css';
import { motion } from 'framer-motion';

const Loader = () => {
    
    return (
        <div className={styles.loaderContainer}>
            <motion.div className={styles.loader}
            animate={{ rotate:360}}
            transition={{ duration:1, repeat: Infinity}}
        />
        </div>
    )
}

export default Loader;