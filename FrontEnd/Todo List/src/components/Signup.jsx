import axios from "axios";
import "../../public/Signup.css"
import { useState } from "react";

function Signup() {
    const [msg,setMsg] = useState("");
    function signup(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const formDataObject = Object.fromEntries(formData.entries());
        const urlEncodedData = new URLSearchParams(formDataObject);

      axios.post("https://todo-list-ku1v.onrender.com/signup", urlEncodedData, { withCredentials: true })
      .then((resolve)=>{
        console.log(resolve.data.msg);
      })
      .catch((err)=>{
        console.log(err.response.data.msg);
        setMsg(err.response.data.msg);
      })
    }

    return (

<div className="signup-wrapper">
    <div class="signup-container">
        <h2>SignUp</h2>
        <form onSubmit={signup}>
            <div class="input-group">
                <input className="input" type="text"  name="name" id="name" required />
                <label for="name">Name</label>
                <span>{msg}</span>
            </div>

            <div class="input-group">
                <input className="input" type="text"  name="username" id="username" required />
                <label for="username">Username</label>
            </div>

            <div class="input-group">
                <input className="input" type="number" name="age" id="age" min={0} required />
                <label for="age">Age</label>
            </div>

            <div className="input-group" style={{marginTop:"-20px"}}>
                <label htmlFor="gender" >Gender:</label><br /><br />
                <select 
                    name="gender" 
                    id="gender" 
                    required
                >
                    <option value="">Select your gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            <div class="input-group">
                <input className="input" type="text"  name="address" id="address" required />
                <label for="address">Address</label>
            </div>

            <div class="input-group">
                <input className="input" type="password" name="password" id="password" required />
                <label for="password">Password</label>
            </div>

            <button type="submit" className="button">Submit</button>
        </form>
    </div>
</div>


    );
}

export default Signup;
