import React from "react"
import logo from "../assets/img/header/logo.png"
// import { ReactComponent as Item1 } from "../assets/img/header/book.svg"
import item1 from "../assets/img/header/newBook.png"
import item2 from "../assets/img/header/newFile.png"
import item3 from "../assets/img/header/newPeople.png"
import item4 from "../assets/img/header/newCity.png"
import item5 from "../assets/img/header/newAnalytics.png"
import item6 from "../assets/img/header/newSettings.png"
import { NavLink } from "react-router-dom"

const Header = () => {
	return (
		<header className='header'>
			<div className='logo'>
				<NavLink to='/'>
					<img src={logo} alt='logo' />
				</NavLink>
			</div>
			<nav className='nav'>
				<NavLink
					to='/knowledgeBase'
					className='nav_item'
					activeClassName='active-link'
				>
					<div className='nav_item__icon'>
						<img src={item1} alt='header-icon' />
						{/* <Item1 width="195" height="180" background="#fff" fill='#fff' /> */}
					</div>
					<div className='nav_item__caption'>
						<span>База знаний</span>
					</div>
				</NavLink>
				<NavLink
					to='/applications'
					className='nav_item'
					activeClassName='active-link'
				>
					<div className='nav_item__icon'>
						<img src={item2} alt='header-icon' />
					</div>
					<div className='nav_item__caption'>
						<span>Заявки</span>
					</div>
				</NavLink>
				<NavLink
					to='/staff'
					className='nav_item'
					activeClassName='active-link'
				>
					<div className='nav_item__icon'>
						<img src={item3} alt='header-icon' />
					</div>
					<div className='nav_item__caption'>
						<span>Сотрудники</span>
					</div>
				</NavLink>
				<NavLink
					to='/clients'
					className='nav_item'
					activeClassName='active-link'
				>
					<div className='nav_item__icon'>
						<img src={item4} alt='header-icon' />
					</div>
					<div className='nav_item__caption'>
						<span>Клиенты</span>
					</div>
				</NavLink>
				<NavLink
					to='/assets'
					className='nav_item'
					activeClassName='active-link'
				>
					<div className='nav_item__icon'>
						<img src={item5} alt='header-icon' />
					</div>
					<div className='nav_item__caption'>
						<span>Активы</span>
					</div>
				</NavLink>
				<NavLink
					to='/settings'
					className='nav_item'
					activeClassName='active-link'
				>
					<div className='nav_item__icon'>
						<img src={item6} alt='header-icon' />
					</div>
					<div className='nav_item__caption'>
						<span>Настройки</span>
					</div>
				</NavLink>
			</nav>
		</header>
	)
}

export default Header
