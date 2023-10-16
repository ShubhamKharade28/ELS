"use client";
import styles from '@/styles/electiveform.module.css';
import HomeBtn from '@/app/components/homebtn';

const ElectiveForm = () => {
    
    return (
        <div className={styles.dashboardContainer}>
            <HomeBtn path='/student' />
            <h2 className={styles.notfound}>Elective-course not found !</h2>
            <h4 className={styles.notfound}>Try checking elective-id</h4>
        </div>
    )
}

export default ElectiveForm;