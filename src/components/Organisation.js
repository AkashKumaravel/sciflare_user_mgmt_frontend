import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./css/signin_styles.module.css";
import pick from "lodash/pick"

const Organisation = () => {
	const [data, setData] = useState({ description: "", address: "", country: "", industry: "", timezone: "" });
	const [error, setError] = useState("");
  const [isEdit,setIsEdit] = useState(false)

  const getOrgData = async () => {
    try {
			const url = `http://localhost:5000/api/organisation/${localStorage.getItem('account_id')}`;
			const { data: res } = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (res.success) {
        setData(res.data || {});
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
			const url = "http://localhost:5000/api/organisation";
      const inputData = {
        _id: localStorage.getItem('account_id'),
        ...pick(data, ['description', 'address', 'country', 'industry', 'timezone']),
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
    getOrgData()
  },[setData]);

	return (
		<div className={styles.login_container}>
			<div className={styles.login_form_container}>
        <div className={styles.right}>
          <Link to="/all_users">
						<button type="button" className={styles.white_btn}>
							All Users
						</button>
					</Link>
				</div>

				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Organisation Info</h1>
            <input
							type="text"
							placeholder="Organisation Name"
							name="org_name"
							value={data.org_name}
              disabled = {true}
							className={styles.input}
						/>
            <input
							type="text"
							placeholder="Description"
							name="description"
							onChange={handleChange}
							value={data.description}
              disabled = {!isEdit}
							className={styles.input}
						/>
						<input
							type="text"
							placeholder="Address"
							name="address"
							onChange={handleChange}
							value={data.address}
              disabled = {!isEdit}
							className={styles.input}
						/>
            <input
							type="text"
							placeholder="Country"
							name="country"
							onChange={handleChange}
							value={data.country}
              disabled = {!isEdit}
							className={styles.input}
						/>
            <input
							type="text"
							placeholder="Industry"
							name="industry"
							onChange={handleChange}
							value={data.industry}
              disabled = {!isEdit}
							className={styles.input}
						/>
            <input
							type="text"
							placeholder="timezone"
							name="timezone"
							onChange={handleChange}
							value={data.timezone}
              disabled = {!isEdit}
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

export default Organisation;