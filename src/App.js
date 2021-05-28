import { BrowserRouter, Route, Switch } from "react-router-dom"
import Header from "./components/Header"
import "./scss/App.scss"
import KnowledgeBase from "./pages/KnowledgeBase"
import Applications from "./pages/Applications"
import Staff from "./pages/Staff"
import Clients from "./pages/Clients"
import Assets from "./pages/Assets"
import Settings from "./pages/Settings"
import Search from "./components/Search"
import { getPriorities, getStatuses, getTasks, getUsers } from "./redux/actions"
import { useDispatch } from "react-redux"
import { useEffect } from "react"

function App() {
	
	const dispatch = useDispatch()
	
	useEffect(() => {
		dispatch(getTasks())

		dispatch(getPriorities())
		dispatch(getStatuses())
		dispatch(getUsers())
	}, [dispatch])
	
	return (
		<BrowserRouter>
			<div className='App'>
				<Header />
				<main className='main'>
					<Search />
					<div className='content'>
						<Switch>
							<Route
								path='/knowledgeBase'
								component={KnowledgeBase}
								exact
							/>
							<Route path='/applications' component={Applications} exact />
							<Route path='/staff' component={Staff} exact />
							<Route path='/clients' component={Clients} exact />
							<Route path='/assets' component={Assets} exact />
							<Route path='/settings' component={Settings} exact />
						</Switch>
					</div>
				</main>
			</div>
		</BrowserRouter>
	)
}

export default App
