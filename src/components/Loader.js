import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { CircularProgress } from '@mui/material';

const Loader = () => {
	return (
		<Container>
			<Grid 
				container
				style={{height: window.innerHeight - 64}}
				alignItems={"center"}
				justifyContent={"center"}
			>
				<Grid>
					<CircularProgress />
				</Grid>
			</Grid>
		</Container>
	);
};

export default Loader;