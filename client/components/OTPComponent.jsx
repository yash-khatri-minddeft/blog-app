import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function OTPComponent({ email, setProcessing, setLoggedIn }) {
	const [otp, setOTP] = useState();
	const navigate = useNavigate();
	var maskedid = "";
	var myemailId = email;
	var index = myemailId.lastIndexOf("@");
	var prefix = myemailId.substring(0, index);
	var postfix = myemailId.substring(index);

	var mask = prefix.split('').map(function (o, i) {
		if (i < 2 || i >= (index - 2)) {
			return o;
		} else {
			return '*';
		}
	}).join('');

	maskedid = mask + postfix;

	const goBack = () => {
		setProcessing(false);
	}
	const OTPHandle = (e) => {
		e.preventDefault();
		fetch('/api/otp', {
			method: 'POST',
			body: JSON.stringify({
				otp: otp
			}),
			headers: {
				'Content-type': 'application/json'
			}
		}).then(res => res.json())
			.then((data) => {
				if (data.err) {
					alert(data.err)
				} else {
					navigate('/')
					setLoggedIn(data.isLoggedin)
				}
			})
	}
	return (
		<>
			<div className="form-page" >
				<div className="contianer">
					<div className="row justify-content-center">
						<div className="col-md-6">
							<form onSubmit={OTPHandle} className="form">
								<div className="title">Welcome</div>
								<div className="subtitle">Please Enter OTP sent on {maskedid}</div>
								<div className="input-container">
									<input id="OTP" className="input" type="OTP" onChange={e => { setOTP(e.target.value) }} placeholder=" " required />
									<div className="cut cut-short"></div>
									<label htmlFor="OTP" className="form-placeholder">OTP</label>
								</div>
								<button type="text" className="btn btn-primary d-block mt-5 w-100">Submit</button>
								<button className="btn btn-success d-block mt-3 w-100" onClick={goBack}>Go Back</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}