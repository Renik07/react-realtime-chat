import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { publicRoute, privateRoute } from "../routes";
import { CHAT_ROUTE, LOGIN_ROUTE } from '../utils/consts';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from '../index';

const AppRouter = () => {
	// авторизован пользователь или нет
	const {auth} = useContext(Context)
	const [user] = useAuthState(auth);

	return user ?
		(
			<Routes>
				{privateRoute.map(({path, Component}) => {
					return <Route key={path} path={path} element={<Component />} />
				})}
				<Route path="*" element={<Navigate to={CHAT_ROUTE} replace />} />
			</Routes>
		)
		:
		(
			<Routes>
				{publicRoute.map(({path, Component}) => {
					return <Route key={path} path={path} element={<Component />} />
				})}
				<Route path="*" element={<Navigate to={LOGIN_ROUTE} replace />} />
			</Routes>
		)
	;
};

export default AppRouter;