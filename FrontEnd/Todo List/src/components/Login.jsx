import { useState } from 'react';
import '../../public/Login.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login(){
    const [msg,setMsg] = useState('');
    const [wrongPasswordMsg,setWrongPasswordMsg] = useState('');
    const [isAuthorised,setIsAuthorised] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
    function login(event){
        event.preventDefault();
        const formData = new FormData(event.target);
        const formDataObject = Object.fromEntries(formData.entries());
        const urlEncodedData = new URLSearchParams(formDataObject);

        axios.post("http://localhost:3000/login",urlEncodedData, { withCredentials: true })
        .then((resolve)=>{
            console.log(resolve.data.authorised);
            const authorised = resolve.data.authorised;
            setIsAuthorised(authorised);
            if(authorised ){
                navigate("/todos");
            }
            else{
                setWrongPasswordMsg("Wrong Password");
            }
        })
        .catch((err)=>{
            console.log(err.response.data.msg);
            setMsg(err.response.data.msg);
        });    
    }

    return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2 style={{marginBottom:0}}>Login</h2>
        <span style={{marginLeft:-90}}>{msg}</span>
        <br />
        <br />
        <form onSubmit={login}>
          <div className="input-group">
            <input className="input" type="text" id="username" name='username' onChange={(e)=>{
                setTimeout(()=>{
                    setUsername(e.target.value);
                },500)
            }} required />
            <label htmlFor="username">Username</label>
          </div>
            <span style={{marginLeft: -90}}>{wrongPasswordMsg}</span>
            {wrongPasswordMsg.length > 0 ? <br/>: null}
            {wrongPasswordMsg.length > 0 ? <br/>: null}
          <div className="input-group">
            <input className="input" type="password" id="password" name='password' onChange={(e)=>{
                setTimeout(()=>{
                    setPassword(e.target.value)
                },500);
            }} required />
            <label htmlFor="password">Password</label>
          </div>

          <button type="submit" className='button'>Login</button>
        </form>
      </div>
    </div>
    )
}

export default Login;