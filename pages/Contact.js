import React, { useState } from 'react'
import styles from '../styles/Home.module.css'

const Contact = () => {

  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [phone, setphone] = useState('')
  const [description, setdescription] = useState('')

  const handleSubmit = async (event) => {

    const data = { name, email, phone, description }
    event.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/api/postcontact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      alert("thanks for contacting")
      setname('')
      setemail('')
      setphone('')
      setdescription('')
      console.log(json)

    } catch (err) {
      console.log(err)
    }
  }



  const handleChange = (event) => {
    if (event.target.name === 'name') {
      setname(event.target.value)
    }
    else if (event.target.name === 'email') {
      setemail(event.target.value)
    }
    else if (event.target.name === 'phone') {
      setphone(event.target.value)
    }
    else if (event.target.name === 'description') {
      setdescription(event.target.value)
    }

  }



  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Contact US</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.mb3}>
          <label htmlFor="name" className="form-label">Enter your Name</label>
          <input type="text" value={name} className="form-control" id="name" name="name" onChange={handleChange} aria-describedby="emailHelp" />
        </div>

        <div className={styles.mb3}>
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" value={email} className="form-control" id="email" name="email" onChange={handleChange} aria-describedby="emailHelp" />
        </div>

        <div className={styles.mb3}>
          <label htmlFor="phone" className="form-label">Phone</label>
          <input type="phone" value={phone} className="form-control" id="phone" name="phone" onChange={handleChange} aria-describedby="emailHelp" />
        </div>


        <div className={styles.mb3}>
          <label htmlFor="floatingTextarea">Description</label>
          <textarea className="form-control" placeholder="write your concern here" name='description' value={description} onChange={handleChange} id="description"></textarea>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Contact;