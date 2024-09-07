import { Link } from 'react-router-dom'
import '../../public/Home.css'


function Home(){
    return (
    <div className='wrapper'>
      <h1 className='heading'><u>Home Page of Todo List</u></h1>
      <div className='buttons'>
        <div className='b'>
      <button className="button"><Link to='/signup'style={{color:'white'}}>Signup</Link></button>
      </div>
      <div className='b'>
      <button className="button"><Link to='/login'style={{color:'white'}}>Login</Link></button>
      </div>
      </div>
    </div>
    )
  }
  
  export default Home