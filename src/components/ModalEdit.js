import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { onShowEditModal, updateTask } from "../redux/actions"
import calendarImg from "../assets/img/calendar.png"
import Comment from "./Comment"
import Select from "react-select"

const ModalEdit = ({
	currTask,
	statuses,
	users,
	onShowEditModal,
	updateTask,
}) => {

	// Converting date for normal type
	const date = new Date(currTask.resolutionDatePlan)
	const options = {
		year: "numeric",
		month: "long",
		day: "numeric",
	}
	const resolutionDatePlan = date.toLocaleString("ru", options)

	// Options for Select components
	const selectOptions = statuses.map((s) => {
		return { value: s.name, label: s.name }
	})
	const initiatorOptions = users.map((i) => {
		return { value: i.name, label: i.name }
	})

	// Status block (declaration, change fn)
	const [statusRgb, setStatusRgb] = useState(currTask.statusRgb)
	const [status, setStatus] = useState(currTask.statusName)
	const onChangeStatus = (event) => {
		setStatus(event.value)
		const thisStatus = statuses.find((s) => s.name === event.value)
		const updatedTask = {
			...currTask,
			statusId: thisStatus.id,
		}

		updateTask(updatedTask)
	}

	useEffect(() => {
		if (statuses && status) {
			const currRgb = statuses.find((s) => s.name === status)
			setStatusRgb(currRgb.rgb)
		}
	}, [status, statuses])

	const [isStatusEditMode, setIsStatusEditMode] = useState(false)
	const toggleStatusEditMode = (isOpen) => {
		setIsStatusEditMode(isOpen)
	}

	// Initiator block (declaration, change fn)
	const [initiator, setInitiator] = useState(currTask.executorName)
	const onChangeInitiator = (event) => {
		setInitiator(event.value)
		const thisInitiator = users.find((u) => u.name === event.value)
		const updatedTask = {
			...currTask,
			executorId: thisInitiator.id
		}

		updateTask(updatedTask)
	}

	const [isInitiatorEditMode, setIsInitiatorEditMode] = useState(false)
	const toggleInitiatorEditMode = (isOpen) => {
		setIsInitiatorEditMode(isOpen)
	}

	// Comment block
	const [commentVal, setCommentVal] = useState("")
	const onChangeComment = (event) => {
		setCommentVal(event.target.value)
	}

	// Save comment
	const saveChanges = () => {
		const updatedTask = {
			...currTask,
			comment: commentVal
		}

		updateTask(updatedTask)
		setCommentVal("")
	}

	// Update on changing application
	useEffect(() => {
		setStatusRgb(currTask.statusRgb)
		setStatus(currTask.statusName)
		setInitiator(currTask.executorName)
	}, [currTask])

	if (!currTask) onShowEditModal(false)

	return (
		<div className='modal modalEdit'>
			<div className='modalWrapper'>
				<header className='modalWrapper_header'>
					<h2>№ {currTask.id}</h2>
					<div className='name'>
						<p>{currTask.name}</p>
					</div>
					<button
						className='close'
						onClick={() => onShowEditModal(false)}
					></button>
				</header>
				<main className='modalWrapper_main'>
					<div className='left'>
						<div className='description'>
							<h3>Описание</h3>
							<p>{currTask.description}</p>
						</div>
						<div className='commAddition'>
							<input
								value={commentVal}
								onChange={(event) => onChangeComment(event)}
								type='text'
								placeholder='Добавление комментариев'
							/>
						</div>
						<button className='btn-primary' onClick={saveChanges}>
							Сохранить
						</button>
						<div className='comments'>
							{currTask.lifetimeItems?.length ? (
								currTask.lifetimeItems.map((comm) =>
									comm.comment?.trim() ? (
										<Comment key={comm.id} comm={comm} />
									) : null
								)
							) : (
								<h2>Комментариев нет</h2>
							)}
						</div>
					</div>
					<div className='right'>
						<div className='right_field status'>
							<div
								style={{ backgroundColor: statusRgb }}
								className='prioritet'
							></div>
							{isStatusEditMode ? (
								<Select
									className='select-status'
									value={status}
									placeholder={status}
									onChange={onChangeStatus}
									onBlur={() => toggleStatusEditMode(false)}
									autoFocus={true}
									closeMenuOnSelect={true}
									isSearchable={false}
									options={selectOptions}
									styles={{
										placeholder: (base) => ({
											...base,
											fontSize: "12px",
											lineHeight: "12px",
										}),
									}}
								/>
							) : (
								<span onClick={() => toggleStatusEditMode(true)}>
									{status}
								</span>
							)}
						</div>
						<div className='right_field applicant'>
							<h3>Заявитель</h3>
							<span>{currTask.executorName}</span>
						</div>
						<div className='right_field createdBy'>
							<h3>Создана</h3>
							<span>{currTask.initiatorName}</span>
						</div>
						<div className='right_field performer'>
							<h3>Исполнитель</h3>
							{isInitiatorEditMode ? (
								<Select
									className='select-initiator'
									value={initiator}
									placeholder={initiator}
									onChange={onChangeInitiator}
									onBlur={() => toggleInitiatorEditMode(false)}
									autoFocus={true}
									closeMenuOnSelect={true}
									isSearchable={false}
									options={initiatorOptions}
									styles={{
										placeholder: (base) => ({
											...base,
											fontSize: "14px",
											lineHeight: "14px"
										}),
									}}
								/>
							) : (
								<span onClick={() => toggleInitiatorEditMode(true)}>
									{initiator}
								</span>
							)}
						</div>
						<div className='right_field prioritet'>
							<h3>Приоритет</h3>
							<span>{currTask.priorityName}</span>
						</div>
						<div className='right_field term'>
							<h3>Срок</h3>
							<span>
								<img src={calendarImg} alt='img' />
								{resolutionDatePlan}
							</span>
						</div>
						<div className='right_field tags'>
							<h3>Теги</h3>
							<div className='tags_list'>
								{currTask?.tags?.map((tag) => (
									<button className='btn-tag' key={tag.id}>
										{tag.name}
									</button>
								))}
							</div>
						</div>
					</div>
				</main>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		currTask: state.modalPage.currentTask,
		statuses: state.tasksPage.statuses,
		users: state.tasksPage.users,
		isLoading: state.modalPage.isLoading,
	}
}

const mapDispatchToProps = { onShowEditModal, updateTask }

export default connect(mapStateToProps, mapDispatchToProps)(ModalEdit)
