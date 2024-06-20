import {BrowserRouter as Router, Routes, Route, createBrowserRouter,RouterProvider} from 'react-router-dom';

import toast, { Toaster } from 'react-hot-toast';

import Home from './screens/Home'
import InterviewerLogin from './screens/InterviewerLogin';
import InchargeLogin from './screens/InchargeLogin';
import AdminLogin from './screens/AdminLogin';
import AdminDashboard from './screens/AdminDashboard';
import InterviewerDashboard from './screens/InterviewerDashboard';
import InchargeDashboard from './screens/InchargeDashboard';

import AdminUsers from './components/AdminUsers';
import UserDetails from './components/UserDetails';

import AdminStudents from './components/AdminStudents';
import StudentDetails from './components/StudentDetails';
import FileUpload from './components/FileUpload';

const router = createBrowserRouter([
	{
		path:"/",
		element:<Home/>
	},
	{
		path:"/ilogin",
		element:<InterviewerLogin/>
	},
	{
		path:"/vlogin",
		element:<InchargeLogin/>
	},
	{
		path:"/alogin",
		element:<AdminLogin/>
	},
	{
		path:"/adashboard",
		element:<AdminDashboard/>
	},
	{
		path:"/users",
		element:<AdminUsers/>
	},
	{
		path:"/students",
		element:<AdminStudents/>
	},
	{
		path:"/user/:id",
		element:<UserDetails/>
	},
	{
		path:"/student/:id",
		element:<StudentDetails/>
	},
	{
		path:"/idashboard",
		element:<InterviewerDashboard/>
	},
	{
		path:"/vdashboard",
		element:<InchargeDashboard/>
	},

])

export function App() {
	return (
		<>
			{/* <Router>
				<Routes>
					<Route path='/' element={<Home/>}/>
					<Route path='/ilogin' element={<InterviewerLogin/>}/>
					<Route path='/vlogin' element={<InchargeLogin/>}/>
					<Route path='/alogin' element={<AdminLogin/>}/>
					<Route path='/adashboard' element={<AdminDashboard/>}/>
					
					<Route path='/users' element={<AdminUsers/>}/>
					<Route path='/user/:id' element={<UserDetails/>}/>

					<Route path='/students' element={<AdminStudents/>}/>
					<Route path='/student/:id' element={<StudentDetails/>}/>

					<Route path='/idashboard' element={<InterviewerDashboard/>}/>
					<Route path='/vdashboard' element={<InchargeDashboard/>}/>

					<Route path='/test' element={<FileUpload/>}/>


				</Routes>
			</Router> */}

			<RouterProvider router={router} />
			<Toaster toastOptions={{
					success: {
						style: {
						  background: '',
						},
					  },
					  error: {
						style: {
						  background: '',
						},
					  },
  			}} />
		</>
  	)
}
