import {
	Button,
	FormControlLabel,
	FormGroup,
	FormLabel,
	Radio,
	RadioGroup,
	TextField,
} from '@material-ui/core'
import moment from 'moment'
import useForm from '../hooks/useForm'

function Form({ onSubmit, initState, title = 'Add User' }) {
	const { inputs, handleChange } = useForm(
		initState?.data || {
			name: '',
			email: '',
			dob: '',
			companyName: '',
			gender: '',
		}
	)

	const formId = initState?.data?._id || 0

	return (
		<form
			onSubmit={(e) => onSubmit(e, inputs, formId)}
			method="POST"
			className="form"
		>
			<h1>{title}</h1>
			<FormGroup component="fieldset">
				<TextField
					name="name"
					value={inputs.name}
					onChange={handleChange}
					label="Name"
					required
				/>
				<TextField
					name="email"
					value={inputs.email}
					onChange={handleChange}
					type="email"
					label="Email"
					required
				/>
				<TextField
					name="dob"
					value={moment(inputs.dob).format('YYYY-MM-DD')}
					onChange={handleChange}
					label="Date of Birth"
					type="date"
				/>
				<TextField
					name="companyName"
					value={inputs.companyName}
					onChange={handleChange}
					label="Company Name"
				/>
				<FormLabel component="legend">Gender</FormLabel>
				<RadioGroup
					aria-label="gender"
					name="gender"
					onChange={handleChange}
					label="Gender"
					value={inputs.gender}
				>
					<FormControlLabel value="male" control={<Radio />} label="Male" />
					<FormControlLabel value="female" control={<Radio />} label="Female" />
				</RadioGroup>
				<Button type="submit" color="primary">
					Submit
				</Button>
			</FormGroup>
		</form>
	)
}

export default Form
