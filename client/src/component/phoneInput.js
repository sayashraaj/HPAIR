import React from 'react';
import styles from './styles/style.module.css';
import axios from 'axios';
function PhoneInput(props) {
	const { value, handleChange, hashHandleChange } = props;

	const Continue = (e) => {
		axios
			// .post('http://localhost:8888/sendOTP', {
			.post('/sendOTP', {
				phone: `${value.phone}`
			})
			.then(function(res) {
				console.log(res.data.otp);
				const hash = res.data.hash;
				hashHandleChange(hash);
			});

		e.preventDefault();
		props.nextStep();
	};
	return (
		<div className={styles}>
			<div className={styles.background}>
				<div className={styles.container}>
					<div className={styles.heading}>Sayash HPAIR</div>
					<center>
					<div>Contact Details-
					<br/>
					Sayash Raaj, IIT Madras
					<br/>
					ce19b113@smail.iitm.ac.in
					</div>
					<a href="https://www.linkedin.com/in/sayashraaj/">LinkedIn</a>
					</center>
					
					<div className={styles.input_text}>Phone number with country code:</div>
					<div className={styles.input_container}>
						<input
							type="tel"
							value={value.phone}
							onChange={handleChange('phone')}
							placeholder="+911234567890"
							className={styles.input}
						/>
					</div>
					<button onClick={Continue} className={styles.submit}>
						Send OTP
					</button>
				</div>
			</div>
		</div>
	);
}

export default PhoneInput;
