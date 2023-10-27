"use client";
import { useEffect, useState } from 'react';

import styles from '@/styles/dashboard.module.css';
import Menubar from "@/app/components/menubar";
import ElectivePreview from '@/app/components/electivePreview';
import BigLoader from '../components/bigloader';

const AdminDashboard = () => {

    const [electives, setElectives] = useState([]);
    const [loading, setLoading] = useState(true);

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
            setLoading(false);
        }
        getData();
    },[])

    if(loading){
        return (
            <div className={styles.dashboardContainer}>
                <Menubar />
                <BigLoader />
            </div>
        );
    }

    if(electives.length === 0){
        return (
            <div className={styles.dashboardContainer}>
                <Menubar />
                <h1 className="text-white font-bold">No electives added</h1>
            </div>
        )
    }


    return (
        <div className={styles.dashboardContainer}>
            <Menubar />
            <div className={styles.electivesContainer}>
                {
                    electives.map((elective,index) => {
                        return (
                            <ElectivePreview elective={elective} key={index}/>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default AdminDashboard;