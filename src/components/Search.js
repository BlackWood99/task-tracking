import React from "react"
import searchImg from "../assets/img/search.png"

const Search = () => {
	return (
		<div className='search'>
			<div className='search_input'>
				<input
					type='text'
					placeholder='Введите Фамилию, Статус, Приоритет, Тег и т.д. чтобы найти заявки'
				/>
				<button type='submit'>
					<img
						alt='searching'
						src={searchImg}
					/>
				</button>
			</div>
			
			<div className='search_filter'>
				<div className='filter_item'>
					<button className='btn-search'>Открытые</button>
					<button className='close'></button>
				</div>
				<div className='filter_item'>
					<button className='btn-search'>Моеи компании</button>
					<button className='close'></button>
				</div>
				<div className='filter_item'>
					<button className='btn-search'>Все</button>
					<button className='close'></button>
				</div>
			</div>
		</div>
	)
}

export default Search
