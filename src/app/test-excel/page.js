"use client";
import { useState } from "react";
import * as xlsx from 'xlsx';

const SendExcel = () => {
    
    const [excelFile, setExcelFile] = useState(null);
    const [typeError, setTypeError] = useState(null);

    const handleFile = (e) => {
        let fileTypes = ["application-vmd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];
        let file = e.target.files[0];
        if(file){
            if(fileTypes.includes(file.type)){
                setTypeError(null);
                setExcelFile(file);
            }else{
                setTypeError('select only excel file');
            }
        }else{
            setTypeError('Please select file');
        }
    }

    const handleFileSubmit = (e) => {
        e.preventDefault();
        if(excelFile){
            let reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target.result;
                const workbook = xlsx.read(data, { type: 'array'});
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const jsonData = xlsx.utils.sheet_to_json(worksheet);
                console.log(jsonData); 
            }
            reader.readAsArrayBuffer(excelFile);

        }else{
            setTypeError('No file selected');
        }
    }

    return (
        <form 
        className="justify-center items-start gap-6 flex flex-col text-white w-full h-screen">
            <h2>Select excel file</h2>
            <input type="file" required onChange={handleFile}/>
            <button type="submit" className="bg-white text-black py-2 px-4 rounded" onClick={handleFileSubmit}>Submit</button>
            {
                excelData ? (
                    <div>Data</div>
                ) : (
                    <span className="text-red-400 py-2 px-4 rounded">No file selected</span>
                )
            }
            { typeError && (
                <div className="text-red-300">{typeError}</div>
            )}
        </form>
    )
}

export default SendExcel;