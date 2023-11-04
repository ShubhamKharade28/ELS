"use client";

import dashboardStyles from '@/styles/dashboard.module.css';
import styles from '@/styles/electiveinfo.module.css';
import Menubar from '@/app/components/menubar';
import BigLoader from '@/app/components/bigloader';

import { RxCopy } from 'react-icons/rx';
import { GrDocumentExcel } from 'react-icons/gr';
import { useEffect, useState } from 'react';
import * as xlsx from 'xlsx';

const ElectiveInfo = ({params}) => {

    const id = params.id;
    const [title, setTitle] = useState('');
    const [count, setCount] = useState(0);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [copyLinkText, setCopyLinkText] = useState("Copy Link");
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const getData = async () => {
            let res = await fetch(`/api/electives/getById/${id}`);
            res = await res.json();
            try {
                if(res.error){
                    console.log(res.error);
                }else{
                    setTitle(res.title);
                    setCount(res.count);
                    setCourses(res.subjects);
                    setStudents(res.students);
                }
            }catch(error){
                alert("Unknown error occurred!");
                console.log(error);
            }
            setLoading(false);
        }
        getData();
    }, [])

    const copyLink = (e) => {
        e.preventDefault();
        const domain = 'https://elective-allotment.vercel.app/student/elective/'
        navigator.clipboard.writeText(domain+id);
        setCopyLinkText('Copied');
    }

    const getExcelFile = () => {
        const worksheet = xlsx.utils.json_to_sheet(students);
        const workbook = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(workbook,worksheet, title);
        xlsx.writeFile(workbook, "elective-form-data.xlsx");
    }

    if(loading){
        return (
            <div className={styles.dashboardContainer}>
                <Menubar />
                <BigLoader />
            </div>
        );
    }

    if(!title){
        return (
            <div className={dashboardStyles.dashboardContainer}>
                <Menubar />
                <h1 className="text-white font-bold">Elective not found</h1>
            </div>
        )
    }

    return (
    <div className={dashboardStyles.dashboardContainer}>
        <Menubar />
        <div className={styles.electiveContainer}>
            <div className={styles.electiveHeading}>
                <h1>{title}</h1>
                <h5>Total Enrolled: {count}</h5>
            </div>
            <button className={styles.copylink} onClick={copyLink}>
                <span>{copyLinkText}</span>
                <RxCopy />
            </button>
            <div className={styles.courses}>
            {
                courses.map((course) => {

                    return (
                    <div className={styles.courseContainer} key={course.name}>
                        <div className={styles.courseHeading}>
                            <h4>{course.name}</h4>
                            <label>Enrolled: {course.count}</label>
                        </div>
                    </div>);
                })
            }
            </div>
            <div className={styles.studentsContainer}>
                <header>
                    <h4>Students data</h4>
                    <button className={styles.toExcel} onClick={getExcelFile}>
                        <span> Excel Spreadsheet</span>
                        <GrDocumentExcel />
                    </button>
                </header>
                <table>
                    <tr>
                        <th>Sr.</th>
                        <th>PRN</th>
                        <th>Name</th>
                        <th>Subject</th>
                    </tr>
                {

                    students.map((student,index) => {
                        return (
                            <tr key={index}>
                                <td>{index+1}.</td>
                                <td>{student.prn}</td>
                                <td className={styles.stdname}>{student.name}</td>
                                <td>{student.elective || "-"}</td>
                            </tr>
                        )
                    })
                }
                </table>
            </div>
        </div>
    </div>

    )
}

export default ElectiveInfo;