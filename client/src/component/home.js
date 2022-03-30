import React, { useState, useEffect } from 'react';
import Listing from './Listing';
import axios from 'axios';
import styles from './styles/home.module.css';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
axios.defaults.withCredentials = true;
function Home() {
	const phonenumber = cookies.get('phonenumber');

	const [ state, setState ] = useState({
		value: 'Private Protected Route - Home'
	});

	const [ phone, setPhone ] = useState('');

	/*  The UseEffect below is used to verify the working of Protected Route. 
	 Do not use it aimlessly as it will cause performance issue and server timout due to infinite execution in loop

	useEffect(() => {
		console.log(state.value)
		axios
			.post('http://localhost:8888/home', {
				withCredentials: true
			})
			.then(function(res) {
				// console.log(res.data);
				setState({ ...state, value: res.data });
			})
			.catch(function(error) {
				console.log(error.response);
			});
	},[state]);
	*/

	useEffect(() => {
		console.log(state.value)
		axios
			// .post('http://localhost:8888/home', {
			.post('https://sayash-hpair.herokuapp.com:8888/home', {
				withCredentials: true
			})
			.then(function(res) {
				console.log(res.data.phone.data);
				setPhone(res.data.phone.data);
			})
			.catch(function(error) {
				console.log(error.response);
			});
	},[]);

	const logout = () => {
		axios
			// .get('http://localhost:8888/logout')
			.get('https://sayash-hpair.herokuapp.com:8888/logout')
			.then((res) => {
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err.response);
			});
		window.location.reload();
	};
	return (
		<div className={styles}>
			<div className={styles.top}>
				<p>Welcome {phone}</p>
			</div>
			<div className={styles.bottom}>
				<button onClick={logout} className={styles.logout}>
					Log out
				</button>

				<center>
				<Listing phone={phone} />
				</center>

				<div className={styles.card} />
				<div className={styles.words}> {state.value}</div>
			</div>
		</div>
	);
}

export default Home;
