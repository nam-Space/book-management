import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Home from './components/Home';
import TodoBook from './components/TodoBook';

function App() {
	return (
		<Routes>
			<Route path='/' element={<Home />}/>
			<Route path='/update' element={<TodoBook />}/>
		</Routes>
	)
}

export default App;
