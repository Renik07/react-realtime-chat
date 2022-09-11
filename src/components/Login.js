import React, { useContext } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Context } from '../index';
import firebase from "firebase/compat/app";
import google from '../assets/img/google.png';

const Login = () => {
	const {auth} = useContext(Context);

	const login = async () => {
		const provider = new firebase.auth.GoogleAuthProvider();
		const {user} = await auth.signInWithPopup(provider);
	}
	return (
		<Container>
			<Grid 
				container
				style={{height: window.innerHeight - 64}}
				alignItems={"center"}
				justifyContent={"center"}
			>
				<Grid style={{
					boxShadow: '0px 4px 35px rgba(0, 0, 0, 0.08)',
					padding: '40px',
					borderRadius: '40px'
				}}>
					<Box>
						<h3 style={{
							fontSize: 21
						}}>Welcome to real-time chat</h3>
						<h2 style={{
							fontSize: 55,
							marginBottom: 60
						}}>Log in</h2>
						<Button 
							onClick={login} 
							variant="contained" 
							endIcon={<img src={google} alt="" />}
							fullWidth
							style={{
								background: '#E9F1FF',
								color: '#4285F4',
								padding: '20px 15px',
								borderRadius: '9px',
								textTransform: 'inherit',
								fontSize: 16,
								boxShadow: 'none'
							}}
						>
							Log in with Google
						</Button>
					</Box>
				</Grid>
			</Grid>
		</Container>
	);
};

export default Login;