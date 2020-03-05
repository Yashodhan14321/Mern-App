import React, { Component } from "react";
import { 
  Button 
} from 'reactstrap';
import ReactDOM from 'react-dom';
import Register from "./Register";
import "./css/Login.css";
import axios from 'axios';
import App from '../App'

export default class Login extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      USERNAME:'',
      PASSWORD:''
    }

    this.checkandadd = this.checkandadd.bind(this);
    this.gottosignup = this.gottosignup.bind(this);
    this.gottohome = this.gottohome.bind(this); 
    this.handlechange = this.handlechange.bind(this); 
  }

  handlechange(e){
    this.setState({[e.target.name]: e.target.value});
  }
  
  async getDataAxios(){
    const response = await axios.post(
        'http://localhost:5000/login',
        this.state,
        { headers: { 'Content-Type': 'application/json' } }
    )
    let stat = response.data;
    if(stat.status==="success"){
        localStorage.setItem("userid",stat.userid)
        this.gottohome();
    }
    else{
        document.getElementById("error").innerHTML = stat.status;
    }
  }

  checkandadd()
  {
    if(this.state.USERNAME===''||this.state.PASSWORD===''){
      document.getElementById("error").innerHTML="You Left Something Empty";
      return false;
    }
    else{
      this.getDataAxios();
    }
  }

  gottosignup(){
    ReactDOM.render(<Register />, document.getElementById('root'));
  }
  
  gottohome(){
    ReactDOM.render(<App />, document.getElementById('root'));
  }

  render(){
    return (
      <center>
      <div className="Login">
        <form>
            <h1>MUSIC APP</h1>
            <div id="error" className="err"></div>
            <input name="USERNAME" className="username" placeholder="USERNAME" onChange={this.handlechange}/>
            <br/>
            <input name="PASSWORD" className="password" type="password" placeholder="PASSWORD" onChange={this.handlechange}/>
            <br/>
            <Button className="btnone" onClick={this.checkandadd}>
              LogIn
            </Button>
            <br/>
            <h3>Not A Member? <span className="tx" onClick={this.gottosignup}>SignUp</span></h3>
        </form>
      </div>
      </center>
    );
  }
}
