import React, { useState, useEffect } from "react";
import axios from 'axios';

function Listing({phone}) {
  const [todo, setTodo] = useState("");
  const [message, setMessage] = useState("");
  const [List, setList] = useState([]);

  const getalltodosfunction = async ()=>{
  		axios
			.post('http://localhost:8888/alltodos', {
				phone: "+919372870316"
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
		getalltodosfunction();
	},[]);

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post('http://localhost:8888/newtodo', {
      	todo,
      	phone: "+919372870316"
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