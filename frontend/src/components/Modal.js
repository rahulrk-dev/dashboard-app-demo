import { Modal as MIModal } from '@material-ui/core'

function Modal({ open, onClose, children }) {
	return (
		<MIModal
			open={open}
			onClose={onClose}
			aria-labelledby="simple-modal-title"
			aria-describedby="simple-modal-description"
		>
			{children}
		</MIModal>
	)
}

export default Modal
