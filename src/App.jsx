
import React from 'react';
import Container from '@mui/material/Container';
import Customerlist from './components/Customerlist';
import Traininglist from './components/Trainginlist';
import Home from './components/Home';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

function App() {

  const [currentValue, setCurrentValue] = React.useState('one');

  const handleTabs = (ev, value) => {
    setCurrentValue(value);

  }

  return (
    <>
      <Container maxWidth='xl' > {/* Add tab bar for easier navigation between pages */}
        <Tabs value={currentValue} onChange={handleTabs}>
          <Tab value='one' label='Home' justifycontent='center' alignitems='center' />
          <Tab value='two' label='Customers' justifycontent='center' alignitems='center' />
          <Tab value='three' label='Trainings' justifycontent='center' alignitems='center' />
        </Tabs>

        {currentValue === 'one' && <Home />}
        {currentValue === 'two' && <Customerlist />}
        {currentValue === 'three' && <Traininglist />}

      </Container>
    </>
  );
}

export default App
