import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {

  const [credentials, setCredentials] = useState({ email: "", password: "" })
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      })
    })

    const json = await response.json()
    console.log(json)

    if (!json.success) {
      alert("Email or password is incorrect.")
    } else {
      localStorage.setItem('authToken', json.token)
      console.log(localStorage.getItem('authToken'))
      navigate('/')
    }
  }

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
  }

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="inputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="inputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="inputPassword" className="form-label">Password</label>
          <input type="password" className="form-control" id="inputPassword" name='password' value={credentials.password} onChange={onChange} />
        </div>
        <button type="submit" className="m-3 btn btn-success">Submit</button>
        <Link to='/createuser' className='m-3 btn btn-danger'>Signup</Link>
      </form>
    </div>
  )
}
