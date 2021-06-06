import React from "react"
import { connect } from "react-redux"
import {
	getCurrTask,
	onShowEditModal,
	onShowCreateModal,
} from "../redux/actions"
import ApplicationItem from "../components/ApplicationItem"
import ModalCreate from "../components/ModalCreate"
import ModalEdit from "../components/ModalEdit"

const Applications = (props) => {

	const onOpenEditModal = (taskId) => {
		props.getCurrTask(taskId)
		props.onShowCreateModal(false)
		props.onShowEditModal(true)
	}

	const onOpenCreateModal = () => {
		props.onShowEditModal(false)
		props.onShowCreateModal(true)
	}
	const onCloseCreateModal = () => {
		props.onShowCreateModal(false)
	}
	
	return (
		<div className='applications'>
			{props.modal.createModalIsOpen ? (
				<ModalCreate onCloseCreateModal={onCloseCreateModal} />
			) : null}
			{props.modal.editModalIsOpen ? (
				<ModalEdit />
			) : null}

			<div className='top-panel'>
				<button onClick={onOpenCreateModal} className='btn btn-create'>
					Создать заявку
				</button>
			</div>
			<div className='main-panel'>
				<div className='main-panel_heading t-flex'>
					<div className='t-head t-id'>
						<h3>ID</h3>
					</div>
					<div className='t-head t-name'>
						<h3>Название</h3>
					</div>
					<div className='t-head t-status'>
						<h3>Статус</h3>
					</div>
					<div className='t-head t-performer'>
						<h3>Исполнитель</h3>
					</div>
				</div>

				{props.tasks.map((task) => (
					<ApplicationItem
						key={task.id}
						task={task}
						priorities={props.priorities}
						onOpenEditModal={onOpenEditModal}
					/>
				))}

			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		tasks: state.tasksPage.tasks,
		priorities: state.tasksPage.priorities,
		modal: state.modalPage,
	}
}

const mapDispatchToProps = { getCurrTask, onShowEditModal, onShowCreateModal }

export default connect(mapStateToProps, mapDispatchToProps)(Applications)
