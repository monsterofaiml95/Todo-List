import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../public/Todo.css'
import Todos from "./Todos";

function Todo(){
    const [username, setUsername] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();
    const [todos,setTodos] = useState([]);
    const [loading,setLoading] = useState(true);
    
    useEffect(()=>{
    axios.get("https://todo-list-ku1v.onrender.com/login", { withCredentials: true })
    .then((resolve)=>{
        setLoading(false);
        setUsername(resolve.data.username);
        axios.get(`https://todo-list-ku1v.onrender.com/todos?username=${resolve.data.username}`)
        .then(async (response)=>{
            // console.log(response.data.todos);
            await setTodos(response.data.todos);
        })
    })
    .catch ((err)=>{
        navigate("/login");
    })

    },[]);
    

   function todo(event){
        event.preventDefault();
        
        // console.log(username);
        const newTodo = {
            "todo-title": title,
            "todo-description": description
        }
        const urlEncodedData = new URLSearchParams(newTodo);

        axios.post(`https://todo-list-ku1v.onrender.com/todos?username=${username}`,urlEncodedData)
        .then ((response) => {
            // Update state with the new todo from the response (including its _id)
            const savedTodo = response.data; // Assuming the backend returns the created todo object
            // console.log(savedTodo);
            setTodos([...todos, savedTodo]);
            setTitle("");
            setDescription("");
         })
        
    }

    if(loading) {
        return <h1>Loading...</h1>
    }

    return (
        <>
        <div className="todo-wrapper">
            <div className="child">
                <h1 className="h1"><u>Add a Todo</u></h1>
                <form onSubmit={todo}>
                    <div className="todo-container">
                        <input type="text" 
                        placeholder="Todo Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        name="todo-title"/>
                    </div>
                    <br />
                    <div className="todo-container">
                        <input type="text" 
                        placeholder="Todo Description"
                        value={description}
                        name="todo-description"
                        onChange={(e) => setDescription(e.target.value)}
                          />
                    </div>
                    <br />
                    <div>
                        <button type="submit" className="button">Submit</button>
                    </div>
                </form>
            </div>
            
            {/* Scrollable Todo List */}
            <div className="todo-list-wrapper">
                <h1 className="h1"><u>Todo List</u></h1>
                <Todos todos={todos} username={username} setTodos={setTodos}/>
            </div>
        </div>
        </>
    );
    
}

export default Todo;
