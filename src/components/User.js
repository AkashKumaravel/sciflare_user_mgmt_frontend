import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./css/signin_styles.module.css";
import pick from "lodash/pick"

const User = () => {
	const [data, setData] = useState({ });
	const [error, setError] = useState("");
  const [isEdit,setIsEdit] = useState(false)
  const getUserData = async () => {
    try {
			const url = "http://localhost:5000/api/users";
			const { data: res } = await axios.get(url, {
        params: {
          _id: localStorage.getItem('user_id')
        },
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (res.success) {
        setData(res.data[0] || {})
      } else {
        setError(res.message)
      }
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.error[0].message);
			}
		}
  };

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:5000/api/users";
      const inputData = {
        _id: localStorage.getItem('user_id'),
        ...pick(data, ['first_name', 'last_name', 'role', 'password'])
      }
			const { data: res } = await axios.put(url, inputData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (res.success) {
        setData(data)
      } else {
        setError(res.message)
      }
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.error[0].message);
			}
		}
	};

  useEffect(() => {
    getUserData()
  },[setData]);

	return (
		<div className={styles.login_container}>
			<div className={styles.login_form_container}>
        {data.user_type === 1 &&
        (
        <div className={styles.right}>
          <Link to="/organisation">
            <button type="button" className={styles.white_btn} style={{marginBottom:"10px"}}>
              Organisation Info
            </button>
          </Link>
          <Link to="/all_users">
						<button type="button" className={styles.white_btn}>
							All Users
						</button>
					</Link>
				</div>
        )}

				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>User Profile</h1>
            <input
							type="text"
							placeholder="First Name"
							name="first_name"
							onChange={handleChange}
							value={data.first_name}
							required
              disabled={!isEdit}
							className={styles.input}
						/>
            <input
							type="text"
							placeholder="Last Name"
							name="last_name"
							onChange={handleChange}
							value={data.last_name}
              disabled={!isEdit}
							className={styles.input}
						/>
						<input
							type="text"
							placeholder="Username"
							name="username"
							onChange={handleChange}
							value={data.username}
							required
              disabled={!isEdit}
							className={styles.input}
						/>
            <input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
              disabled={!isEdit}
							className={styles.input}
						/>
            {isEdit && <input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							className={styles.input}
						/>}
            {!isEdit && <input
							type="text"
							placeholder="User Type"
							name="user_type"
							onChange={handleChange}
							value={data.user_type === 1 ? 'Admin': 'Basic'}
              disabled={true}
							className={styles.input}
						/>}
            <input
							type="text"
							placeholder="Role"
							name="role"
							onChange={handleChange}
							value={data.role}
              disabled={!isEdit}
							className={styles.input}
						/>
						{error && <div className={styles.error_msg}>{error}</div>}
            {!isEdit && (
              <button type="button" className={styles.green_btn} onClick={ (e) =>{
                e.preventDefault()
                setIsEdit(prev => !prev)
                }}>
                Edit
              </button>
            )}
            {isEdit && (
              <button type="submit" className={styles.green_btn}>
							Submit
						</button>
            )}
					</form>
				</div>
			</div>
		</div>
	);
};

export default User;