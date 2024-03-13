import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

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


export function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path='/' element={<Home/>}/>
					<Route path='/ilogin' element={<InterviewerLogin/>}/>
					<Route path='/vlogin' element={<InchargeLogin/>}/>
					<Route path='/alogin' element={<AdminLogin/>}/>
					<Route path='/adashboard' element={<AdminDashboard/>}/>
					
					<Route path='/adashboard/users' element={<AdminUsers/>}/>
					<Route path='/adashboard/users/user/:id' element={<UserDetails/>}/>

					<Route path='/adashboard/students' element={<AdminStudents/>}/>
					<Route path='/adashboard/students/student/:id' element={<StudentDetails/>}/>

					<Route path='/idashboard' element={<InterviewerDashboard/>}/>
					<Route path='/vdashboard' element={<InchargeDashboard/>}/>

					<Route path='/test' element={<FileUpload/>}/>


				</Routes>
			</Router>
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
