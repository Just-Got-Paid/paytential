import React, { useState, useEffect } from "react";
import StudentCard from "../components/AdminStudentCard"; // Assuming this component exists
import { fetchHandler } from "../utils/fetchingUtils";
import { getAllUsers } from "../adapters/user-adapter"


const AdminPage = () => {

    const testing = [
        {id: 1, name: "andii"},
        {id: 2, name: "nicole"},
        {id: 3, name: "zhenni"}
    ]
    const [students, setStudents] = useState(testing);
    
    const [error, setError] = useState(null); // Define error state

    // need to get all Users in an OrgID - The controller is already created, do we need to create an adaptor for it? // do we filter the promise by OrgID before we set?


    // console.log(getAllUsers())
    // useEffect(() => {
    //     getAllUsers().then(setStudents)
    // }, []);

    const handleDelete = (id) => {
        setStudents(students.filter((student) => student.id !== id)); // Remove the student from the state
      };
      
    if (error) {
        return <div>Error: {error.message}</div>; // Display error message if there's an error
    }

    return (
        <>
            <p>Admin Page</p>
            <div className="student-container">
                {students.map((student) => (
                    <StudentCard key={student.id} student={student} onDelete={handleDelete}/>
                ))}
            </div>
        </>
    );
}

export default AdminPage;