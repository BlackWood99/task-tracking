import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { onShowEditModal, updateTask } from "../redux/actions"
import calendarImg from "../assets/img/calendar.png"
import Comment from "./Comment"

const ModalEdit = ({
	currTask,
	statuses,
	users,
	onShowEditModal,
	updateTask,
}) => {

	const date = new Date(currTask.resolutionDatePlan)
	const options = {
		year: "numeric",
		month: "long",
		day: "numeric",
	}
	const resolutionDatePlan = date.toLocaleString("ru", options)

	const [statusRgb, setStatusRgb] = useState(currTask.statusRgb)
	const [status, setStatus] = useState(currTask.statusName)
	const onChangeStatus = (event) => {
		setStatus(event.target.value)
	}

	useEffect(() => {
		if (statuses && status) {
			const currRgb = statuses.find((s) => s.name === status)
			setStatusRgb(currRgb.rgb)
		}
	}, [status])

	const [isStatusEditMode, setIsStatusEditMode] = useState(false)
	const toggleStatusEditMode = (isOpen) => {
		setIsStatusEditMode(isOpen)
	}

	//////

	const [initiator, setInitiator] = useState(currTask.executorName)
	const onChangeInitiator = (event) => {
		setInitiator(event.target.value)
	}

	const [isInitiatorEditMode, setIsInitiatorEditMode] = useState(false)
	const toggleInitiatorEditMode = (isOpen) => {
		setIsInitiatorEditMode(isOpen)
	}

	////

	const [commentVal, setCommentVal] = useState("")

	const onChangeComment = (event) => {
		setCommentVal(event.target.value)
	}

	////

	const saveChanges = () => {
		const thisStatus = statuses.find((s) => s.name === status)
		const thisInitiator = users.find((u) => u.name === initiator)

		const updatedTask = {
			...currTask,
			executorId: thisInitiator.id,
			statusId: thisStatus.id,
			comment: commentVal,
		}

		updateTask(updatedTask)
		setCommentVal("")
	}

	// Update on change application

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
							{isStatusEditMode && (
								<select
									value={status}
									onChange={(event) => onChangeStatus(event)}
									onBlur={() => toggleStatusEditMode(false)}
								>
									{statuses.map((s) => (
										<option key={s.id} value={s.name}>
											{s.name}
										</option>
									))}
								</select>
							)}
							{!isStatusEditMode && (
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
							{isInitiatorEditMode && (
								<select
									value={initiator}
									onChange={(event) => onChangeInitiator(event)}
									onBlur={() => toggleInitiatorEditMode(false)}
								>
									{users.map((u) => (
										<option key={u.id} value={u.name}>
											{u.name}
										</option>
									))}
								</select>
							)}
							{!isInitiatorEditMode && (
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
