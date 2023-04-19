import signup from '../images/signup1.jpg'
import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const SignUp = () => {
    const navigate = useNavigate()
    useEffect(() => {
        const auth = localStorage.getItem("user")
        if (auth) {
            navigate('/')
        }
    })

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        autoComplete: false,
        Signup: false
    })
    const handleChange = (e) => {
        setData({
            ...data, [e.target.name]: e.target.value
        })
    }
    const handleClick = async () => {
        let result = await fetch('http://localhost:5000/register', {
            method: 'post',
            body: JSON.stringify({ ...data }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json()
        console.warn(result)
        if (result) {
            localStorage.setItem("user", JSON.stringify(result.result))
            localStorage.setItem("token", JSON.stringify(result.auth))
            navigate('/')
        }
    }

    return (
        <div className='login-container'>
            <div className='container d-flex justify-content-center mail1 signup '>
                <div className="row ">
                    <h2>Register With Us</h2>
                    <div className="col-sm-6 image">
                        <img className='rounded mx-auto d-block' src={signup} alt="" />
                    </div>
                    <div className="col-sm-6">
                        <form className="row form1">
                            <div className="col-md">
                                <label for="" className="">Name</label>
                                <input onChange={handleChange} name="name" value={data.name} type="text" className="form-control" placeholder="enter name" />
                            </div>
                            <div className="col-md">
                                <label for="" className="">Email</label>
                                <input onChange={handleChange} name="email" value={data.email} type="email" className="form-control" placeholder="Enter email" />
                            </div>
                            <div className="col-md">
                                <label for="" className="">Password</label>
                                <input onChange={handleChange} name="password" value={data.password} type="password" className="form-control" placeholder="Password" />
                            </div>
                            <div className="col-md d-flex justify-content-center" id='btn1'>
                                <button name="Signup" onClick={handleClick} type="button" class="btn btn-success">SignUp</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SignUp