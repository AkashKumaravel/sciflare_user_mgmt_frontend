import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./css/signin_styles.module.css";

const Login = () => {
	const [data, setData] = useState({ username: "", password: "", org_name: "" });
	const [error, setError] = useState("");

    const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:5000/api/sign_in";
			const { data: res } = await axios.post(url, data);
            if (res.success) {
                localStorage.setItem("token", res.token);
                localStorage.setItem('user_id', res.data['_id']);
                localStorage.setItem('account_id', res.data['account_id']);
                localStorage.setItem('user_type', res.data['user_type']);
                navigate('/user');
            } else {
                console.log(res.error[0])
                setError(res.message || res.error[0].message)
            }
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
                console.log('inside catch part',error.response.data.error[0].message)
				setError(error.response.data.error[0].message);
			}
		}
	};

	return (
		<div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Login to Your Account</h1>
                        <input
							type="text"
							placeholder="Organisation Name"
							name="org_name"
							onChange={handleChange}
							value={data.org_name}
							required
							className={styles.input}
						/>
						<input
							type="text"
							placeholder="Username"
							name="username"
							onChange={handleChange}
							value={data.username}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit" className={styles.green_btn}>
							Sign In
						</button>
					</form>
				</div>
				<div className={styles.right}>
					<h1>New Here ?</h1>
					<Link to="/signup">
						<button type="button" className={styles.white_btn}>
							Sign Up
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;