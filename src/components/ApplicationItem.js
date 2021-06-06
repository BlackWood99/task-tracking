import React from "react"

function numberWithSpaces(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
}

const ApplicationItem = ({ task, onOpenEditModal, priorities }) => {

	const priority = priorities.find((p) => p.id === task.priorityId)
	
	const taskId = numberWithSpaces(task.id)

	return (
		<button
			onClick={() => onOpenEditModal(task.id)}
			className='main-panel_item t-flex'
		>
			<div
				style={{ backgroundColor: priority.rgb }}
				className='t-prioritet'
			></div>
			<div className='t-item t-id'>
				<span>{taskId}</span>
			</div>
			<div className='t-item t-name'>
				<p>{task.name}</p>
			</div>
			<div className='t-item t-status'>
				<span
					style={{ backgroundColor: task.statusRgb }}
					className='status'
				>
					{task.statusName}
				</span>
			</div>
			<div className='t-item t-performer'>
				<span>{task.executorName}</span>
			</div>
		</button>
	)
}

export default ApplicationItem
