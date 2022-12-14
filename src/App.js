import './App.css';
import { BrowserRouter } from 'react-router-dom';
import React, { useContext } from 'react';
import Navbar from './components/Navbar';
import AppRouter from './components/AppRouter';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from './index';
import Loader from './components/Loader';

const App = () => {
	const {auth} = useContext(Context)
	const [user, loading, error] = useAuthState(auth);
	if (loading) {
		return <Loader />
	}
	return (
		<BrowserRouter>
			<Navbar />
			<AppRouter />
		</BrowserRouter>
	);
};

export default App;
