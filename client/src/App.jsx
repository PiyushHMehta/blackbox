import { Routes, Route } from 'react-router-dom'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import Layout from './Layout'
import RegisterPage from './pages/RegisterPage'
import axios from 'axios'
import { UserContextProvider } from './UserContext'
import AccountPage from './pages/AccountPage'
import SpecificTechPage from './pages/SpecificTechPage'
import AddTechPage from './pages/AddTechPage'

axios.defaults.baseURL = 'http://localhost:4000'
axios.defaults.withCredentials = true

function App() {
	return (
		<UserContextProvider>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<IndexPage />} />
					<Route path='/login' element={<LoginPage />} />
					<Route path='/register' element={<RegisterPage />} />
					<Route path='/account' element={<AccountPage />} />
					<Route path='/account/:subpage?' element={<AccountPage />} />
					<Route path='/tech/:id' element={<SpecificTechPage />} />
					<Route path='/account/techstack/:id' element={<AddTechPage />} />
				</Route>
			</Routes>
		</UserContextProvider>
	)
}

export default App
