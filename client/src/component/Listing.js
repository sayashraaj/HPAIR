import React, { useState, useEffect } from "react";
import axios from 'axios';

function Listing() {
  const [phonenumber, setPhonenumber] = useState("")
  const [todo, setTodo] = useState("");
  const [message, setMessage] = useState("");
  const [List, setList] = useState([]);

  const getalltodosfunction = async ()=>{
  		axios
			// .post('http://localhost:8888/alltodos', {
      .post('/alltodos', {
				phone: phonenumber
			})
			.then(function(res) {
				console.log(res.data.alltodos)
				setList(res.data.alltodos)
			})
			.catch(function(error) {
				console.log(error.response);
			});
  }

  useEffect(() => {
    axios
      // .post('http://localhost:8888/home', {
      .post('/home', {
        withCredentials: true
      })
      .then(function(res) {
        console.log(res.data.phone.data);
        setPhonenumber(res.data.phone.data);
      })
      .catch(function(error) {
        console.log(error.response);
      });
	},[]);

  useEffect(() => {
    console.log("hi ,",phonenumber)
    if(phonenumber!=="") getalltodosfunction();
    else console.log("empty number")
  },[phonenumber]);

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // let res = await axios.post('http://localhost:8888/newtodo', {
      let res = await axios.post('/newtodo', {
      	todo,
      	phone: phonenumber
      })
      setMessage("saved successfully")
      window.location.reload(false);
      let resJson = await res.json();
      if (res.status === 200) {
      	console.log("success")
      	getalltodosfunction();
      } else {
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="todo"
          placeholder="Todo"
          onChange={(e) => setTodo(e.target.value)}
        />
        {message}

        <button type="submit">Create</button>
      </form>

      <table>
      <br/>
      <center>My notes</center>
       {List.map((ele, i) =>(
        <tr key={i}>
        <th>{i})   {ele.todo}</th>
        </tr>
      ))}
      </table>

    </div>
  );
}

export default Listing;