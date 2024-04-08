import { useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { fetchTrainings } from "../customerapi";
import dayjs from 'dayjs';
import { Button } from "@mui/material";


function Traininglist() {

    const [trainings, setTrainings] = useState([]);

    const [colDefs] = useState([ // Define columns for AG-Grid component
        {
            field: 'date',
            filter: true,
            floatingFilter: true,
            cellRenderer: (dateTime) => formatDate(dateTime.value) // Date and time formatting
        },
        { field: 'duration', filter: true, floatingFilter: true },
        { field: 'activity', filter: true, floatingFilter: true },
        { field: 'customer.firstname', headerName: 'Firstname', filter: true, floatingFilter: true },
        { field: 'customer.lastname', headerName: 'Lastname', filter: true, floatingFilter: true },


    ]);

    const formatDate = (dateString) => { // Function for date formatting
        const formattedDate = dayjs(dateString).format('D.M.YYYY HH:mm');
        return formattedDate;
    }

    useEffect(() => {
        handleFetch();
    }, []);

    const handleFetch = () => { // Fetch the data for AG-Grid
        fetchTrainings()
            .then(data => setTrainings(data))
            .catch(err => console.error(err))
    }



    return (
        <div className={"ag-theme-material"} style={{ height: 600, maxWidth: 'xl' }}> {/* Show Ag-Ggrid with data on page */}
            <AgGridReact
                rowData={trainings}
                columnDefs={colDefs}
                pagination={true}
                paginationAutoPageSize={true}
            />
        </div>

    )
}

export default Traininglist;