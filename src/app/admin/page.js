"use client";
import { useEffect, useState } from 'react';

import styles from '@/styles/dashboard.module.css';
import Menubar from "@/app/components/menubar";
import ElectivePreview from '@/app/components/electivePreview';

const AdminDashboard = () => {

    const [electives, setElectives] = useState([]);

    useEffect(() => {
        
        const getData = async () => {
            try{
                const adminId = localStorage.getItem('adminId');
                let res = await fetch(`/api/electives/getByUser/${adminId}`);
                res = await res.json();

                if(res.error){
                    console.warn(error);
                }else{
                    setElectives(res);
                }
            }catch(error){
                console.warn(error);
            }
        }
        getData();
    },[])

    if(electives.length === 0){
        return (
            <div className={styles.dashboardContainer}>
                <Menubar />
                <h1>No electives added</h1>
            </div>
        )
    }


    return (
        <div className={styles.dashboardContainer}>
            <Menubar />
            <div className={styles.electivesContainer}>
                {
                    electives.map((elective) => {
                        return (
                            <ElectivePreview elective={elective} key={elective.title}/>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default AdminDashboard;