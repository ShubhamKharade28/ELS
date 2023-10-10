"use client";
import { CiSquareRemove } from 'react-icons/ci';
import { useState } from 'react';

import dashboardStyles from '@/styles/dashboard.module.css';
import styles from '@/styles/addelective.module.css';
import Menubar from '@/app/components/menubar';
import Loader from '@/app/components/loader';

const AddElective = () => {

    const [electiveTitle, setElectiveTitle] = useState('');
    const [subjects, setSubjects] = useState([]);
    const [students, setStudents] = useState([]);
    const [inputSubject, setInputSubject] = useState('');
    const [inputStudentName, setInputStudentName] = useState('');
    const [inputStudentPrn, setInputStudentPrn] = useState('');
    const [btnVal, setBtnVal] = useState('Submit');
    const [loading, setLoading] = useState(false);

    const AddSubject = (e) => {
        e.preventDefault();
        if(subjects.includes(inputSubject)) return;
        setSubjects((prev) => [...prev, inputSubject]);
    }

    const AddStudent = (e) => {
        e.preventDefault();
        if(students.includes({
            name: inputStudentName,
            prn: inputStudentPrn
        })) return;
        setStudents((prev) => {
            return [
                ...prev,
                {
                    name: inputStudentName,
                    prn: inputStudentPrn
                }
            ]
        });
    }

    const removeSubject = (subjectToRemove) => {
        setSubjects((prev) => {
            return prev.filter(item => item != subjectToRemove);
        })
    }

    const removeStudent = (prn) => {
        setStudents((prev) => {
            return prev.filter(item => item.prn != prn);
        })
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if(electiveTitle=='' || students.length===0 || subjects.length < 2){
            alert("Incomplete data, check elective-title, subject-list or students-list, and try again...");
            return;
        }

        const data = {
            title: electiveTitle,
            admin_name: 'admin7',
            subjects: subjects,
            students: students,
        };

        setLoading(true);

        try{
            let res = await fetch('/api/electives/add', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            res = await res.json();

            if(res.error){
                alert(res.error);
            }else{
                console.log(res);
                setBtnVal('Added successfully');
            }
            setLoading(false);
        }
        catch(error){
            console.log(error);
            setLoading(false);
            alert('Unknown error occurred');
        }
    }
    
    return (
        <div className={dashboardStyles.dashboardContainer}>
            <Menubar />
            <div className={styles.addElectiveContainer}>
                <input value={electiveTitle} onChange={(e) => setElectiveTitle(e.target.value)}
                type='text' placeholder='Enter elective title'/>

                <div className={styles.subjectsContainer}>
                    <label>Courses</label>
                    <form className={styles.subjectInputContainer}>
                        <input value={inputSubject} onChange={(e) => setInputSubject(e.target.value)}
                        type='text' placeholder='Course name'/>
                        <button onClick={AddSubject}>Add</button>
                    </form>
                    <ul className={styles.subjectsAdded}>
                    {
                        subjects.map((subject,index) => {
                            return (
                            <li key={subject}>
                                <span>{index+1}.</span>
                                <span className="w-72 md:w-80">{subject}</span>
                                <CiSquareRemove size={30} onClick={() => removeSubject(subject)}/>
                            </li>
                            );
                        })
                    }
                    </ul>
                </div>

                <div className={styles.studentsContainer}>
                    <label>Students</label>
                    <form className={styles.studentInputContainer}>
                        <input value={inputStudentName} onChange={(e) => setInputStudentName(e.target.value)}
                        type='text' placeholder='Name'/>
                        <input value={inputStudentPrn} onChange={(e) => setInputStudentPrn(e.target.value)}
                        type='text' placeholder='PRN' />
                        <button onClick={AddStudent}>Add</button>
                    </form>
                    <ul className={styles.studentsAdded}>
                    {
                        students.map((student,index) => {   
                            return (
                                <li key={student.prn}>
                                    <span>{index+1}.</span>
                                    <span className="w-48 md:w-60">{student.name}</span>
                                    <span className="w-36 md:w-52">{student.prn}</span>
                                    <CiSquareRemove size={30} onClick={() => removeStudent(student.prn)} />
                                </li>
                            );
                        })
                    }
                    </ul>
                </div>

                <button onClick={onSubmitHandler}>
                {
                    loading ? <Loader /> : <span>{btnVal}</span>
                }
                </button>
            </div>
        </div>
    )
}

export default AddElective;