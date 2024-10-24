import React from "react";

const StudentCard = ({ student, onDelete }) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/admin/${student.id}`, {
        method: 'DELETE',
        body: ""
      });

      if (response.ok) {
        onDelete(student.id); // Update the frontend after successful deletion
      } else {
        console.error("Failed to delete the student");
      }
    } catch (error) {
      console.error("Error occurred while deleting the student", error);
    }
  };

  return (
    <div className="student-card">
      <h3>{student.name}</h3>
      <p>Email: {student.email}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default StudentCard;
