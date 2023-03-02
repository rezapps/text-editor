import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react';
import io from 'socket.io-client';
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Editor from './pages/Editor'
import Register from './pages/Register'

// function App() {
//   return (
//     <>
// 		<Router basename={process.env.REACT_APP_BASENAME} >
// 			<div className='container'>
// 			<Header />
// 			<Routes>
// 				<Route path='/' element={<Dashboard />} />
// 				<Route path='/editor/:id' element={<Editor />} />
// 				<Route path='/register' element={<Register />} />
// 			</Routes>
// 			</div>
//       </Router>
//     </>
//   )
// }

// export default App


function App() {
	useEffect(() => {
		const socket = io('http://localhost:3000');

		socket.on('connect', () => {
			console.log('Connected to WebSocket server');
		});

		socket.on('message', (data) => {
			console.log('Received message:', data);
		});

		return () => {
			socket.disconnect();
		};
	}, []);

	return (
	    <>
		{/* <Router basename={process.env.REACT_APP_BASENAME} > */}
		<Router >
			<div className='container'>
			<Header />
			<Routes>
				<Route path='/' element={<Dashboard />} />
				<Route path='/editor/:id' element={<Editor />} />
				<Route path='/register' element={<Register />} />
			</Routes>
			</div>
		</Router>
    </>
	);
}

export default App;