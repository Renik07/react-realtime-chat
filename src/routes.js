import Chat from "./components/Chat";
import Login from "./components/Login";
import { CHAT_ROUTE, LOGIN_ROUTE } from "./utils/consts";

export const publicRoute = [
	{
		path: LOGIN_ROUTE,
		Component: Login
	}
]

export const privateRoute = [
	{
		path: CHAT_ROUTE,
		Component: Chat
	}
]