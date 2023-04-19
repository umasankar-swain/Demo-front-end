import React from 'react'

export default function Profile() {
    const auth=localStorage.getItem('user')
  return (
    <div className="login-container">
      <h1>Hello {JSON.parse(auth).name}</h1>
    </div>
  )
}
