import React from "react"

const Comment = ({comm}) => {

    const date = new Date(comm.createdAt);
	const options = {
		month: 'long',
		day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
	};
	const createdAt = date.toLocaleString("ru", options)

	return (
		<div className='comments_item'>
			<div className='ava'>
				<div className='ava-wrapper'>
					<img
						src='https://bazabirs.ru/wp-content/uploads/2020/09/5ce29add5117316ad52cf094.png'
						alt='commentator-ava'
					/>
				</div>
			</div>
			<div className='info'>
				<div className='info_fullname'>
					<h4>{comm.userName || "anon"}</h4>
				</div>
				<div className='info_date'>
					<span>{createdAt} прокомментировал</span>
				</div>
				<div className='info_text'>
					<p>
						{comm.comment}
					</p>
				</div>
			</div>
		</div>
	)
}

export default Comment
