import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import Button from '@mui/material/Button';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { fetchCustomers } from "../customerapi";
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';

export default function Customerlist() {

    const [customers, setCustomers] = useState([]); //Create empty list for customers

    const [colDefs] = useState([ //Define AG-Grid columns
        { field: 'firstname', filter: true, floatingFilter: true, width: 120 },
        { field: 'lastname', filter: true, floatingFilter: true, width: 120 },
        { field: 'streetaddress', headerName: 'Address', filter: true, floatingFilter: true },
        { field: 'postcode', filter: true, floatingFilter: true, width: 120 },
        { field: 'city', filter: true, floatingFilter: true },
        { field: 'email', filter: true, floatingFilter: true },
        { field: 'phone', filter: true, floatingFilter: true, width: 160 },
        {
            cellRenderer: params => <EditCustomer data={params.data} updateCustomer={updateCustomer} />,
            width: 120
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

    const updateCustomer = (url, updateCustomer) => {
        fetch(url, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(updateCustomer)
        })

            .then(response => {
                if (!response.ok)
                    throw new Error("Error when updating customer details " + response.statusText)
                return response.json();
            })
            .then(() => handleFetch())
            .catch(err => console.error(err))
    }

    return (
        <>
            <AddCustomer addCustomer={addCustomer} />
            <div className={"ag-theme-material"} style={{ height: 600 }}> {/* Show Ag-Ggrid with data on page */}
                <AgGridReact
                    rowData={customers}
                    columnDefs={colDefs}
                    pagination={true}
                    paginationAutoPageSize={true}
                />
            </div>
        </>
    );
}
