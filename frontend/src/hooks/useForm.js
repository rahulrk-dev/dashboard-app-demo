import { useEffect, useState } from 'react'

const useForm = (initial = {}) => {
	const [inputs, setInputs] = useState(initial)
	const initialValues = Object.values(initial).join('')

	useEffect(() => {
		setInputs(initial)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [initialValues])

	const handleChange = (e) => {
		let { value, name, type } = e.target
		if (type === 'number') {
			value = parseInt(value)
		}
		setInputs({
			...inputs,
			[name]: value,
		})
	}

	const clearForm = () => {
		const blankState = Object.fromEntries(
			Object.entries(inputs).map(([key]) => [key, ''])
		)

		setInputs(blankState)
	}

	return {
		inputs,
		handleChange,
		clearForm,
	}
}

export default useForm
