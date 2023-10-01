import logo from './logo.svg';
import './App.css';
import Main from './Main.js'
import { Button, Container, Paper, TextField, Typography } from '@mui/material';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div sx={{maxWidth: '30px'}}>
          <Container>
            <Button variant='contained'>App Icon</Button>
            <Button variant='contained'>Settings</Button>
          </Container>
          
          <Typography>Good Evening</Typography>
          <Typography>6:40 pm</Typography>
          <Typography>30/9/23</Typography>
          <Paper elevation={4} sx={{padding: '40px'}} >Work on Assignment 3</Paper>
        </div>
        
      </header>
      <div>
      
      </div>
    </div>
  );
}

export default App;
