import { useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react';
import Button from '@mui/material/Button';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { fetchCustomers } from "../customerapi";

function Customerlist() {

    const [customers, setCustomers] = useState([]); //Create empty list for customers

    const [colDefs] = useState([ //Define AG-Grid columns
        { field: 'firstname', filter: true },
        { field: 'lastname', filter: true },
        { field: 'streetaddress', filter: true },
        { field: 'postcode', filter: true },
        { field: 'city', filter: true },
        { field: 'email', filter: true },
        { field: 'phone', filter: true },
    ]);

    useEffect(() => {
        handleFetch();

    }, []);

    const handleFetch = () => {
        fetchCustomers()
            .then(data => setCustomers(data._embedded.customers))
            .catch(err => console.error(err))
    }




    return (
        <>
            <div className={"ag-theme-material"} style={{ height: 600 }}>
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

export default Customerlist;