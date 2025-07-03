import React, { useState } from 'react';
import axios from 'axios';

function Create() {
  const [task, setTask] = useState('');

  const handleAdd = () => {
    if (!task.trim()) {
      alert("Task cannot be empty.");
      return;
    }

    axios.post('http://localhost:3001/add', { task })
      .then(result => {
        console.log("Task added:", result.data);
        setTask(''); 
      })
      .catch(err => {
        console.error("Error adding task:", err.message);
      });
  };

  return (
    <div className="create-form">
      <input
        type="text"
        placeholder="Enter a task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="button" onClick={handleAdd}>Add</button>
    </div>
  );
}

export default Create;


