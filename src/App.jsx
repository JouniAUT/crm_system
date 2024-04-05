
import React from 'react';
import Container from '@mui/material/Container';
import Customerlist from './components/Customerlist';
import Traininglist from './components/Trainginlist';
import Home from './components/Home';
import Calendar from './components/Calendar';
import Statistics from './components/Statistics';
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
          <Tab value='four' label='Statistics' justifycontent='center' alignitems='center' />
          <Tab value='five' label='Calendar' justifycontent='center' alignitems='center' />
        </Tabs>

        {currentValue === 'one' && <Home />}
        {currentValue === 'two' && <Customerlist />}
        {currentValue === 'three' && <Traininglist />}
        {currentValue === 'four' && <Statistics />}
        {currentValue === 'five' && <Calendar />}

      </Container>
    </>
  );
}

export default App
