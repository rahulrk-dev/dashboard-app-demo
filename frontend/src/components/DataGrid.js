function DataGrid({ rows }) {
	return (
		<DataGrid
			columns={[
				{ field: 'name', headerName: 'Name' },
				{ field: 'email', headerName: 'Email' },
				{ field: 'dob', headerName: 'DOB' },
				{ field: 'company', headerName: 'Company' },
				{ field: 'gender', headerName: 'gender' },
				{ field: 'createdAt', headerName: 'Created' },
			]}
			rows={rows}
		/>
	)
}

export default DataGrid
