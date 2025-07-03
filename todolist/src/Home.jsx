import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Create from './Create';

function Home() {
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [updatedTask, setUpdatedTask] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/get')
      .then(res => setTodos(res.data))
      .catch(err => console.error(err));
  }, []);


  const startEdit = (todo) => {
    setEditingId(todo._id);
    setUpdatedTask(todo.task);
  };

 
  const handleUpdate = () => {
    if (!updatedTask.trim()) return;

    axios.put(`http://localhost:3001/update/${editingId}`, { task: updatedTask })
      .then(() => {
        setEditingId(null);
        setUpdatedTask('');
        window.location.reload(); 
      })
      .catch(err => console.error(err));
  };


  const toggleComplete = (id) => {
    axios.put(`http://localhost:3001/complete/${id}`)
      .then(() => window.location.reload())
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>ToDo List</h2>
      <Create />

      {todos.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        todos.map(todo => (
          <div key={todo._id} style={{ margin: '10px 0' }}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo._id)}
            />

            {editingId === todo._id ? (
              <>
                <input
                  type="text"
                  value={updatedTask}
                  onChange={(e) => setUpdatedTask(e.target.value)}
                  style={{ marginLeft: '10px' }}
                />
                <button onClick={handleUpdate} style={{ marginLeft: '5px' }}>Save</button>
              </>
            ) : (
              <>
                <span
                  style={{
                    marginLeft: '10px',
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    color: todo.completed ? 'gray' : 'black'
                  }}
                >
                  {todo.task}
                </span>
                <button onClick={() => startEdit(todo)} style={{ marginLeft: '10px' }}>
                  Edit
                </button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
