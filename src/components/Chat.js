import React, { useContext, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from '../index';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Avatar, Button, TextField } from '@mui/material';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Loader from './Loader';
import firebase from "firebase/compat/app";
import SendIcon from '@mui/icons-material/Send';
import sound from '../assets/sound/alert.mp3'

const Chat = () => {
	const {auth, firestore} = useContext(Context)
	const [user] = useAuthState(auth);
	const [value, setValue] = useState('');
	const [messages, loading] = useCollectionData(
		firestore.collection('messages').orderBy('createdAt')
	);

	const playSound = () => new Audio(sound).play();

	const sendMessage = async() => {
		firestore.collection('messages').add({
			uid: user.uid,
			displayName: user.displayName,
			photoURL: user.photoURL,
			text: value,
			createdAt: firebase.firestore.FieldValue.serverTimestamp()
		})
		setValue('');
		playSound();
	}

	if (loading) {
		return <Loader />
	}

	return (
		<Container>
			<Grid 
				container
				style={{height: window.innerHeight - 64, marginTop: 10}}
				alignItems={"center"}
				justifyContent={"center"}
			>
				<div style={{
						height: '80vh', 
						width:'80%',
						padding: '30px 50px',
						borderBottom: '2px solid rgba(112, 124, 151, 0.15)', 
						overflowY: 'auto',
						boxShadow: '0px 4px 35px rgba(0, 0, 0, 0.08)',
						borderRadius: '20px',
						background: '#fff'}}>
					{messages.map(message => {
						return (
							<div style={{
									marginLeft: user.uid === message.uid ? 'auto' : '10px',
									width: 'fit-content',
									marginBottom: 15
									}}>
								<Grid
									container
									alignItems='center'
									direction={user.uid === message.uid ? 'row-reverse' : 'row'}
								>
									<Avatar style={{
											margin: user.uid === message.uid ? '0 0 0 10px' : '0 10px 0 0'
										}} 
										src={ message.photoURL } 
									/>
									<div>{ message.displayName }</div>
								</Grid>
								<div className={user.uid === message.uid ? 'message' : 'user-message'}>{ message.text }</div>
							</div>
						)
					})}
				</div>
				<Grid
						container
						direction={"column"}
						alignItems={"flex-end"}
						style={{width:'80%'}}
					>
						<TextField 
							fullWidth
							value={value}
							label="write a message..."
							id="fullWidth"
							style={{
								background: '#fff'
							}}
							onChange={(e) => setValue(e.target.value)}
						/>
						<Button 
							onClick={sendMessage} 
							variant="contained" 
							endIcon={<SendIcon />}
							style={{marginTop: 10}}
						>Send
						</Button>
					</Grid>
			</Grid>
		</Container>
	);
};

export default Chat;