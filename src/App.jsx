import Container from '@mui/material/Container';
import Customerlist from './components/Customerlist';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function App() {

  return (
    <>
      <Container>
        <AppBar>
          <Toolbar>
            <Typography variant='h6'>Customers & Management</Typography>
          </Toolbar>
        </AppBar>
        <Customerlist />
      </Container>
    </>
  )
}

export default App
