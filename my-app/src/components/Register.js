import React, {Component} from "react";
import { 
    Button 
} from 'reactstrap';
import ReactDOM from 'react-dom';
import Login from "./login";
import "./css/Login.css";
import * as Evalidator from 'email-validator';
import axios from "axios";

export default class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {NAME: '',USERNAME:'', EMAIL:'', PHONE:'', PASSWORD:''};

        this.handlechange = this.handlechange.bind(this);
        this.gottologin = this.gottologin.bind(this);
        this.validateandsend = this.validateandsend.bind(this);
    }

    handlechange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    gottologin(){
        ReactDOM.render(<Login />, document.getElementById('root'));
    }
    
    async getDataAxios(){
        const response = await axios.post(
            'http://localhost:5000/api/adduser',
            this.state,
            { headers: { 'Content-Type': 'application/json' } }
        )
        let stat = response.data;
        if(stat.status==="saved"){
            this.gottologin();
        }
        else{
            document.getElementById("error").innerHTML = stat.status;
        }
    }
    
    validateandsend(){
        if(this.state.NAME===''||this.state.EMAIL===''||this.state.PASSWORD===''||this.state.PHONE===''||this.state.USERNAME===''){
            document.getElementById("error").innerHTML = "You Left Something Blank";
            return false;
        }
        if(this.state.PHONE.length!==10)
        {
            document.getElementById("error").innerHTML = "Invalid Phone Number";
            return false;
        }
        if(Evalidator.validate(this.state.EMAIL)===false)
        {
            document.getElementById("error").innerHTML = "Invalid Email";
            return false;
        }
        else
        {
            document.getElementById("error").innerHTML = "";
            this.getDataAxios();
        }
    }
    
    render(){
        return (
            <center>
            <div className="Login">
            <form>
                <h1>MUSIC APP</h1>
                <div id="error" className="err">{this.state.err}</div>
                <input name="NAME" placeholder="FULL NAME" onChange={this.handlechange} />
                <br/>
                <input name="USERNAME" placeholder="USERNAME" onChange={this.handlechange} />
                <br/>
                <input name="PHONE" placeholder="PHONE" onChange={this.handlechange} />
                <br/>
                <input name="EMAIL" type="email" placeholder="EMAIL" onChange={this.handlechange} />
                <br/>
                <input name="PASSWORD" type="password" placeholder="PASSWORD" onChange={this.handlechange} />
                <br/>
                <Button className="btnone" onClick={this.validateandsend}>
                    Register
                </Button>
                <br/>
                <h3>Already Registered? <span className="tx" onClick={this.gottologin}>LogIn</span></h3>
            </form>
            </div>
            </center>
        );
    }
}
