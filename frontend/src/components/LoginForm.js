import useForm from '../hooks/useForm'
import { Button, FormGroup, TextField, Typography } from '@material-ui/core'
import './styles/login-form.css'
import useAuth from '../context/AuthContext'
import { useHistory } from 'react-router-dom'

function LoginForm() {
	const { user, login, loading } = useAuth()
	const { inputs, handleChange, clearForm } = useForm({
		email: '',
		password: '',
	})

	const handleSubmit = async (e) => {
		e.preventDefault()

		const res = await login(inputs.email, inputs.password)

		if (!res?.data) {
			clearForm()
			alert("Email and password didn't match, please try again!")
			return
		}
	}

	return (
		<form method="POST" onSubmit={handleSubmit} className="login-form">
			<Typography variant="h3" component="h4">
				Login
			</Typography>
			<FormGroup component="fieldset">
				<TextField
					name="email"
					value={inputs.email}
					onChange={handleChange}
					label="Email"
					type="email"
					required
				/>
				<TextField
					name="password"
					value={inputs.password}
					onChange={handleChange}
					type="password"
					label="Password"
					required
				/>
				<Button type="submit" color="primary">
					Submit
				</Button>
			</FormGroup>
		</form>
	)
}

export default LoginForm
