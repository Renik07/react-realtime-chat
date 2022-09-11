import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import { NavLink } from 'react-router-dom';
import { LOGIN_ROUTE } from '../utils/consts';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from '../index';
import { Login, Logout } from '@mui/icons-material';
import { Container, Grid, Link } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Navbar = () => {
	const {auth} = useContext(Context)
	const [user] = useAuthState(auth);

	const [state, setState] = React.useState({
    left: false
  });

	const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

	const list = (anchor) => (
    <Box
			sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
			<Container 					
				style={{
					background: '#1976d2'
				}}
			>
				<Grid
					container
					style={{
						height: window.innerHeight,
						color: '#fff'
					}}
					alignItems={"center"}
					justifyContent={"center"}
				>
					<Grid
						container
						alignItems={"center"}
						justifyContent={"center"}
					>
						React+Firebase+Material UI
						<Link href="https://github.com/Renik07" color="inherit">
							<GitHubIcon />
						</Link>
						<Link href="https://www.linkedin.com/in/renat-gayazutdinov-07344a65" color="inherit">
							<LinkedInIcon />
						</Link>
					</Grid>
				</Grid>
			</Container>
    </Box>
  );

	return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
						onClick={toggleDrawer('left', true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Real-time chat
          </Typography>
					{user
						? <Button onClick={() => auth.signOut()} variant="contained" endIcon={<Logout />}>Logout</Button>
						: <NavLink style={{textDecoration: 'none'}} to={LOGIN_ROUTE}> <Button variant="contained" endIcon={<Login />}>Login</Button> </NavLink>
					}
        </Toolbar>
      </AppBar>
			<Drawer
				anchor={'left'}
				open={state['left']}
				onClose={toggleDrawer('left', false)}
			>
				{list('left')}
			</Drawer>
    </Box>
	);
};

export default Navbar;