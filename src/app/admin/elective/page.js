"use client";
import HomeBtn from "@/app/components/homebtn";
import styles from '@/styles/electiveform.module.css';

const ElectiveNotFound = () => {
    return (
        <div className={styles.dashboardContainer}>
            <HomeBtn path='/admin' />
            <h2 className={styles.notfound}>Elective-course not found !</h2>
            <h4 className={styles.notfound}>Try checking elective-id</h4>
        </div>
    )
}

export default ElectiveNotFound;