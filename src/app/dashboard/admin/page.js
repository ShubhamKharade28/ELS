"use client";
import { useEffect, useState } from 'react';

import styles from '@/styles/dashboard.module.css';
import Menubar from "@/app/components/menubar";
import ElectivePreview from '@/app/components/electivePreview';

const AdminDashboard = () => {

    const name = localStorage.getItem('user');
    const email = localStorage.getItem('email');
    const [electives, setElectives] = useState([]);

    useEffect(() => {
        
        const getData = async () => {
            try{
                let res = await fetch(`/api/electives/getByUser/${name}`);
                res = await res.json();

                if(res.error){
                    alert(res.error);
                }else{
                    setElectives(res);
                }
            }catch(error){
                alert('Unknown error while fetching electives data');
            }
        }
    },[])


    return (
        <div className={styles.dashboardContainer}>
            <Menubar />
            <div className={styles.electivesContainer}>
                {
                    electives.map((elective) => {
                        return (
                            <ElectivePreview elective={elective} key={elective.name}/>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default AdminDashboard;