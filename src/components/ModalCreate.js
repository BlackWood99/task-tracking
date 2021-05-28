import React, { useState } from "react"
import { connect } from "react-redux"
import { onShowCreateModal, onShowEditModal, getCurrTask, addTask } from "../redux/actions"

const ModalCreate = (props) => {

	const [fieldName, setFieldName] = useState('')
	const [fieldDescription, setFieldDescription] = useState('')

	const onChangeName = (event) => {
		setFieldName(event.target.value)
	}
	const onChangeDescription = (event) => {
		setFieldDescription(event.target.value)
	}

	const saveChanges = () => {
		const newTask = {
			name: fieldName,
			description: fieldDescription,
			comment: "some comment",
			price: 0,
			taskTypeId: 0,
			statusId: 0,
			priorityId: 0,
			serviceId: 0,
			resolutionDatePlan: "2021-05-28T19:06:21.383Z",
			tags: [],
			initiatorId: 0,
			executorId: 0,
			executorGroupId: 0
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
				<div className='form-create'>
					<div className='f-field'>
						<h3>Название</h3>
						<textarea
							name='a-name'
							id='a-name'
							cols='30'
							rows='5'
							value={fieldName}
							onChange={event => onChangeName(event)}
						/>
					</div>
					<div className='f-field'>
						<h3>Описание</h3>
						<textarea
							name='a-desc'
							id='a-desc'
							cols='30'
							rows='7'
							value={fieldDescription}
							onChange={event => onChangeDescription(event)}
						/>
					</div>
					<button className='btn-primary' onClick={saveChanges}>Сохранить</button>
				</div>
			</div>
		</div>
	)
}


const mapDispatchToProps = { onShowEditModal, onShowCreateModal, getCurrTask, addTask }

export default connect(null, mapDispatchToProps)(ModalCreate)
