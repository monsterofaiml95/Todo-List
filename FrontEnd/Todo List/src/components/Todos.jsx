import '../../public/Todos.css'
import { CiEdit } from "react-icons/ci";
import { MdDoneOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import Modal from './Modal'
import { useState } from 'react';

function Todos({todos, username, setTodos}){
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalId, setModalId] = useState("");

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    function deleted(e) {
        const id = e.currentTarget.getAttribute('data-id');
    
        axios.delete(`http://localhost:3000/todos?username=${username}&id=${id}`)
        .then(() => {
            setTodos(todos.filter((todo) => todo._id !== id));
            console.log("Todo Deleted");
        })
        .catch((err) => console.log("Error deleting todo:", err));
    }

    function completed(e) {
        const id = e.currentTarget.getAttribute('data-id');
    
        axios.put(`http://localhost:3000/todos?id=${id}`)
        .then(() => {
            setTodos(
                todos.map((todo) =>
                    todo._id === id ? { ...todo, completed: !todo.completed } : todo
                )
            );
        })
        .catch((err) => console.log("Error updating todo:", err));
    }

    function handleModal(e){
      const id = e.currentTarget.getAttribute('data-id');
      console.log(id);
      setModalId(id);
      openModal();
    }

    return (
        <>
          {todos.map((todo) => (
              <div className="todo" key={todo._id}>
                <div className="details">
                  <span style={{fontSize: 15}}>Todo Title:</span>
                  <span id="title">{todo.completed ? <s>{todo.title}</s> : todo.title}</span>
                  <br />
                  <span style={{fontSize: 12}}>Todo Description:</span>
                  <span id="description">{todo.completed ? <s>{todo.description}</s> : todo.description}</span>
                </div>
                <div className="icons">
                  <CiEdit className="edit-button" data-id={todo._id} onClick={handleModal}/>
      
                  <MdDoneOutline data-id={todo._id} className={todo.completed ? "true" : "false"} onClick={completed} />
      
                  <MdDelete className="delete-button" data-id={todo._id} onClick={deleted} />
                </div>
              </div>
          ))}
          {isModalOpen? <Modal onClose={closeModal} id={modalId} setTodos={setTodos} todos={todos}/>:<></>}
        </>
    );
}

export default Todos;
