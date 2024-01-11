"use client";
import { CiSquareRemove } from 'react-icons/ci';
import { useState } from 'react';
import * as xlsx from 'xlsx';

import dashboardStyles from '@/styles/dashboard.module.css';
import styles from '@/styles/addelective.module.css';
import Menubar from '@/app/components/menubar';
import Loader from '@/app/components/loader';
import { useRouter } from 'next/navigation';

const AddElective = () => {

    const router = useRouter();

    const [electiveTitle, setElectiveTitle] = useState('');
    const [subjects, setSubjects] = useState([]);
    const [students, setStudents] = useState([]);
    const [inputSubject, setInputSubject] = useState('');
    const [btnVal, setBtnVal] = useState('Submit');
    const [loading, setLoading] = useState(false);

    //  excel file
    const [typeError, setTypeError] = useState(null);
    const [excelFile, setExcelFile] = useState(null);

    const AddSubject = (e) => {
        e.preventDefault();
        if(subjects.includes(inputSubject)) return;
        setSubjects((prev) => [...prev, inputSubject]);
		setInputSubject('');
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
        if(!electiveTitle){
            setTypeError("Please enter elective title");
            return;
        }
        if(!excelFile){
            setTypeError("Please choose excel file for students list");
            return;
        }
        if(subjects.length < 2){
            setTypeError("Please select atleast 2 courses");
            return;
        }

        const adminId = localStorage.getItem('adminId');
        setXlFileData();

        const data = {
            title: electiveTitle,
            adminId: adminId,
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
                setTypeError(res.error);
            }
            else if(!res.acknowledged){
                setTypeError('Failed to submit, try again!')
            }
            else{
                console.log(res);
                setBtnVal('Added successfully');
                router.push(`/admin/elective/${res.insertedId}`);
            }
            setLoading(false);
        }
        catch(error){
            console.log(error);
            setLoading(false);
            setTypeError('Unknown error occurred, please try again!');
        }
    }

    const setXlFileData = () => {
        if(excelFile){
            let reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target.result;
                const workbook = xlsx.read(data, { type: 'array'});
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const jsonData = xlsx.utils.sheet_to_json(worksheet);
                console.log(jsonData);
                setStudents(jsonData);
            }
            reader.readAsArrayBuffer(excelFile);
        }
    }

    const handleXlFile = (e) => {
        const validFileTypes = [
            "application-vmd.ms-excel", 
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ];
        let file = e.target.files[0];
        if(file){
            if(validFileTypes.includes(file.type)){
                setTypeError(null);
                setExcelFile(file);
                let reader = new FileReader();
                reader.onload = (e) => {
                    const data = e.target.result;
                    const workbook = xlsx.read(data, { type: 'array'});
                    const sheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[sheetName];
                    const jsonData = xlsx.utils.sheet_to_json(worksheet);
                    console.log(jsonData);
                    setStudents(jsonData);
                }
                reader.readAsArrayBuffer(file);
            }else{
                setTypeError("Select only Excel file");
            }
        }else{
            setTypeError("Please choose spreadsheet");
        }
    }
    
    return (
      <div className={dashboardStyles.dashboardContainer}>
        <Menubar />
        <div className={styles.addElectiveContainer}>
          {typeError && 
            (<div className="text-red-500 px-4">{typeError}</div>)
            }
          <label>Elective title</label>
          <input
            value={electiveTitle}
            onChange={(e) => setElectiveTitle(e.target.value)}
            type="text"
            placeholder="Enter elective title"
          />

          <div className={styles.subjectsContainer}>
            <label>Courses</label>
            <form className={styles.subjectInputContainer}>
              <input
                value={inputSubject}
                onChange={(e) => setInputSubject(e.target.value)}
                type="text"
                placeholder="Course name"
              />
              <button onClick={AddSubject}>Add</button>
            </form>
            <ul className={styles.subjectsAdded}>
              {subjects.map((subject, index) => {
                return (
                  <li key={subject}>
                    <span>{index + 1}.</span>
                    <span className="w-72 md:w-80">{subject}</span>
                    <CiSquareRemove
                      size={30}
                      onClick={() => removeSubject(subject)}
                    />
                  </li>
                );
              })}
            </ul>
          </div>

          <div className={styles.studentsContainer}>
            <label>Students</label>
            <div className={styles.uploadExcel}>
              <span>Choose from excelsheet</span>
              <input type="file" onChange={handleXlFile} />
            </div>
            <ul className={styles.studentsAdded}>
              {students.map((student, index) => {
                return (
                  <li key={student.prn}>
                    <span>{index + 1}.</span>
                    <span className="w-48 md:w-60">{student.name}</span>
                    <span className="w-36 md:w-52">{student.prn}</span>
                    <CiSquareRemove
                      size={30}
                      onClick={() => removeStudent(student.prn)}
                    />
                  </li>
                );
              })}
            </ul>
          </div>

          <button onClick={onSubmitHandler}>
            {loading ? <Loader /> : <span>{btnVal}</span>}
          </button>
        </div>
      </div>
    );
}

export default AddElective;