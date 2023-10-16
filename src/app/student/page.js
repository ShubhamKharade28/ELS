"use client";
import Link from 'next/link';
import { useState } from 'react';

import styles from '@/styles/student.module.css';
import HomeBtn from '../components/homebtn';

const StudentDashboard = () => {
    const [electiveId, setElectiveId] = useState('');
    
    return (
        <form className={styles.dashboardContainer}>
            <HomeBtn />
            <h1>Enter elective id </h1>
            <input type="text" value={electiveId} onChange={(e) => setElectiveId(e.target.value)} />
            <Link href={`/student/elective/${electiveId}`}>Search</Link>
        </form>
    )
}

export default StudentDashboard;