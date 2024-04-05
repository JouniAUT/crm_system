import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import Button from '@mui/material/Button';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { fetchCustomers } from "../customerapi";

export default function Customerlist() {

    const [customers, setCustomers] = useState([]); //Create empty list for customers

    const [colDefs] = useState([ //Define AG-Grid columns
        { field: 'firstname', filter: true, floatingFilter: true },
        { field: 'lastname', filter: true, floatingFilter: true },
        { field: 'streetaddress', headerName: 'Address', filter: true, floatingFilter: true },
        { field: 'postcode', filter: true, floatingFilter: true },
        { field: 'city', filter: true, floatingFilter: true },
        { field: 'email', filter: true, floatingFilter: true },
        { field: 'phone', filter: true, floatingFilter: true },
    ]);

    useEffect(() => {
        handleFetch();

    }, []);

    const handleFetch = () => { // Fetch the data for AG-Grid
        fetchCustomers()
            .then(data => setCustomers(data._embedded.customers))
            .catch(err => console.error(err))
    }

    return (
        <>

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
