import { Link, Outlet } from 'react-router-dom'
import Container from '@mui/material/Container';
import Customerlist from './components/Customerlist';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function App() {

  return (
    <>
      <h1>Customer Realtionship Management</h1>
      <div className='App'>
        <nav>
          <Link to={"/"}>Home</Link>
          {"\n"}
          <Link to={"/customerlist"}>Customer list</Link>
          {"\n"}
          <Link to={"/traininglist"}>Trainning list</Link>
        </nav>
        <Outlet />
      </div>

      {/*
      <Container maxWidth='xl'>
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h6'>Customer management</Typography>
          </Toolbar>
        </AppBar>
        <Customerlist />
      </Container>
      */}
    </>
  );
}

export default App
