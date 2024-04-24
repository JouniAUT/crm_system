import React from 'react';
import Container from '@mui/material/Container';
import Customerlist from './components/Customerlist';
import Traininglist from './components/Traininglist';
import Home from './components/Home';
import Calendar from './components/Calendar';
import Statistics from './components/Statistics';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { Box, Button } from '@mui/material';
import AddCustomer from './components/AddCustomer';
import { fetchCustomers } from "./customerapi";
import { useState } from 'react';


function App() {

  const [currentValue, setCurrentValue] = React.useState('one');

  const handleTabs = (ev, value) => {
    setCurrentValue(value);

  }

  const handleFetch = () => { // Fetch the data for AG-Grid
    fetchCustomers()
      .then(data => setCustomers(data._embedded.customers))
      .catch(err => console.error(err))
  }

  const addCustomer = (newCustomer) => {
    fetch(import.meta.env.VITE_API_CUSTOMERS_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newCustomer)
    })

      .then(response => {
        if (!response.ok)
          throw new Error('Error when adding new customer ' + response.statusText)
        return response.json();
      })
      .then(() => handleFetch())
      .catch(err => console.error(err))
  }

  return (

    <Container maxWidth='xl' > {/* Add tab bar for easier navigation between pages */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: 5 }}>
        <Tabs value={currentValue} onChange={handleTabs} variant="fullWidth">
          <Tab value='one' label='Home' justifycontent='center' alignitems='center' />
          <Tab value='two' label='Customers' justifycontent='center' alignitems='center' />
          <Tab value='three' label='Trainings' justifycontent='center' alignitems='center' />
          <Tab value='four' label='Statistics' justifycontent='center' alignitems='center' />
          <Tab value='five' label='Calendar' justifycontent='center' alignitems='center' />
          <AddCustomer addCustomer={addCustomer} />
        </Tabs>
        {currentValue === 'one' && <Home />}
        {currentValue === 'two' && <Customerlist />}
        {currentValue === 'three' && <Traininglist />}
        {currentValue === 'four' && <Statistics />}
        {currentValue === 'five' && <Calendar />}

      </Box >
    </Container>



  );
}

export default App
