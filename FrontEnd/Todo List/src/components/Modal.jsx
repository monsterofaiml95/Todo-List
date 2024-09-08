import { useState, useEffect } from 'react';
import '../../public/Modal.css';
import axios from 'axios';

function Modal({ onClose, id ,setTodos,todos}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true); // Add a loading state

  // Use useEffect to fetch data when component mounts or id changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://todo-list-eogs.onrender.com/todos/todo?id=${id}`);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setLoading(false); // Set loading to false once data is loaded
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Fetch data whenever the id changes

  function edit(){
    const urlEncodedData = new URLSearchParams({
        title:title,
        description:description
    })
    axios.put(`https://todo-list-eogs.onrender.com/todos/todo?id=${id}`,urlEncodedData)
    .then(()=>{
        setTodos(todos.map(todo => {
              if (todo._id === id) {
                todo.title = title
                todo.description = description
                return todo;
              }
              return todo;
            })
          );
    })
    onClose();
  }

  if (loading) {
    return <div className="modal-overlay"><p>Loading...</p></div>; // Show a loading state while waiting for data
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2><u>Edit Todo</u></h2>
        <span style={{fontSize: 15}}>Todo Title:</span>
        <span id="title">
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </span>
        <br />
        <span style={{fontSize: 12}}>Todo Description:</span>
        <span id="description">
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </span>
        <br />
        <button onClick={edit} className='button'>Edit</button>
      </div>
    </div>
  );
}

export default Modal;
