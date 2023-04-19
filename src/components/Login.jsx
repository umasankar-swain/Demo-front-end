import { useEffect } from "react";
import { React, useState } from "react";
import { useNavigate } from "react-router";
import '../App.css'

const Login = () => {
    const [login, setLogin] = useState({
        email: "",
        password: ""
    })

    useEffect(()=>{
        const auth=localStorage.getItem('user')
        if(auth){
            navigate('/')
        }
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value })
    }
    const handleClick = async () => {
        console.log(JSON.stringify({ ...login }))
        let result = await fetch('http://localhost:5000/login', {
            method: 'post',
            body: JSON.stringify({ ...login }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        result = await result.json()
        console.log(result)
        if (result.auth) {
            localStorage.setItem('user', JSON.stringify(result.user))
            localStorage.setItem('token', JSON.stringify(result.user))
            navigate('/')
        } else {
            alert("Please enter correct details")
        }
    }

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-12 login-form-1">
                    <h3>Login</h3>
                    <form>
                        <div className="form-group">
                            <label htmlFor="">Email</label>
                            <input type="email" className="form-control" name="email" value={login.email} onChange={handleChange} placeholder="Your Email *" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Password</label>
                            <input type="password" className="form-control" name="password" value={login.password} onChange={handleChange} placeholder="Your Password *" />
                        </div>
                        <div className="form-group">
                            <input type="button" onClick={handleClick} className="btnSubmit" value="Login" />
                        </div>
                        <div className="form-group">
                            <a href="/">Forget Password</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login