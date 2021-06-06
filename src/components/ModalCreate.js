import React from "react"
import { Field, Form } from "react-final-form"
import { connect } from "react-redux"
import {
	onShowCreateModal,
	onShowEditModal,
	getCurrTask,
	addTask,
} from "../redux/actions"

const ModalCreate = (props) => {

	const saveChanges = ({name, description = ''}) => {
		const newTask = {
			name: name,
			description: description,
			comment: "",
			price: 0,
			taskTypeId: 0,
			statusId: 0,
			priorityId: 0,
			serviceId: 0,
			resolutionDatePlan: "2021-05-28T19:06:21.383Z",
			tags: [],
			initiatorId: 0,
			executorId: 0,
			executorGroupId: 0,
		}

		props.addTask(newTask)
		props.onShowCreateModal(false)
		props.onShowEditModal(true)
	}

	return (
		<div className='modal modalCreate'>
			<div className='modalWrapper'>
				<header className='modalWrapper_header'>
					<h2>Новая заявка</h2>
					<button
						className='close'
						onClick={() => props.onShowCreateModal(false)}
					></button>
				</header>
				<Form
					onSubmit={(values) => saveChanges(values)}
					validate={(values) => {
						const errors = {}
						if (!values.name) {
							errors.name = "Required"
						}
						if (!values.description) {
							errors.description = "Required"
						}
						return errors
					}}
					render={({
						handleSubmit
					}) => (
						<form onSubmit={handleSubmit}>
							<div className='form-create'>
								<Field name='name'>
									{({ input, meta }) => (
										<div className='f-field'>
											<label>Название</label>
											<textarea
												{...input}
												cols='30'
												rows='5'
												style={
													meta.error && meta.touched ? { border: "1px solid red" } : null
												}
											/>
										</div>
									)}
								</Field>
								<Field name='description'>
									{({ input, meta }) => (
										<div className='f-field'>
											<label>Описание</label>
											<textarea
												{...input}
												cols='30'
												rows='7'
												style={
													meta.error && meta.touched ? { border: "1px solid red" } : null
												}
											/>
										</div>
									)}
								</Field>
								<button type='submit' className='btn-primary'>
									Сохранить
								</button>
							</div>
						</form>
					)}
				/>
			</div>
		</div>
	)
}

const mapDispatchToProps = {
	onShowEditModal,
	onShowCreateModal,
	getCurrTask,
	addTask,
}

export default connect(null, mapDispatchToProps)(ModalCreate)
