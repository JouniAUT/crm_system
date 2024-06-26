import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import Button from '@mui/material/Button';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { fetchCustomers, handleAddTraining, handleDeleteCustomer, handleCustomerUpdate } from "../customerapi";
import EditCustomer from './EditCustomer';
import AddTraining from './AddTraining';
import { CSVLink } from "react-csv";


export default function Customerlist() {

    const [customers, setCustomers] = useState([]); //Create empty list for customers

    const [colDefs] = useState([ //Define AG-Grid columns
        { field: 'firstname', filter: true, floatingFilter: true, width: 120 },
        { field: 'lastname', filter: true, floatingFilter: true, width: 120 },
        { field: 'streetaddress', headerName: 'Address', filter: true, floatingFilter: true, width: 160 },
        { field: 'postcode', filter: true, floatingFilter: true, width: 100 },
        { field: 'city', filter: true, floatingFilter: true, width: 100 },
        { field: 'email', filter: true, floatingFilter: true },
        { field: 'phone', filter: true, floatingFilter: true, width: 160 },
        {
            cellRenderer: params => <AddTraining data={params.data} addTraining={addTraining} />, //Column and button for adding new trainings for customer
            width: 120,
            headerName: 'New Training'
        },
        {
            cellRenderer: params => <EditCustomer data={params.data} updateCustomer={updateCustomer} />, //Column and button for editing customer info
            width: 112,
            headerName: 'Edit',

        },
        {
            cellRenderer: params => // Button for deleting customer 
                <Button size='small' color='error' variant='contained' onClick={() => deleteCustomer(params.data._links.customer.href)}>
                    Delete
                </Button>, width: 125,
            headerName: 'Delete',

        }
    ]);

    useEffect(() => {
        handleFetch();

    }, []);

    const handleFetch = () => { // Fetch the data for AG-Grid
        fetchCustomers()
            .then(data => setCustomers(data._embedded.customers))
            .catch(err => console.error(err))
    }

    const updateCustomer = (url, updatedCustomer) => { // Update customer data with PUT-method
        handleCustomerUpdate(url, updatedCustomer)
            .then(() => handleFetch())
            .catch(err => console.error(err))
    }

    const addTraining = (newTraining) => {
        handleAddTraining(newTraining)
            .then(() => handleFetch())
            .catch(err => console.error(err))
    }

    const deleteCustomer = (url) => { //Delete customer with DELETE-method
        handleDeleteCustomer(url)
            .then(() => handleFetch())
            .catch(err => console.error(err))
    }


    const exportCsvData = [
        ["Firstname", "Lastname", "Streetaddress", "Postcode", "City", "Email", "Phone"],
        ...customers.map(({ firstname, lastname, streetaddress, postcode, city, email, phone }) => [
            firstname,
            lastname,
            streetaddress,
            postcode,
            city,
            email,
            phone,
        ]),
    ];


    return (

        <div className={"ag-theme-material"} style={{ height: 600, maxWidth: 'xl' }}> {/* Show Ag-Ggrid with data on page */}
            <AgGridReact
                rowData={customers}
                columnDefs={colDefs}
                pagination={true}
                paginationAutoPageSize={true}
            />
            <CSVLink data={exportCsvData} filename='customerdata.csv' separator=';' style={{ marginLeft: '1360px' }}>
                <Button size='large' variant='contained' style={{ marginTop: '10px' }}>
                    Export
                </Button>
            </CSVLink>
        </div>

    );
}

