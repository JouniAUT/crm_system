import { useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { fetchTrainingsCustomers } from "../customerapi";
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
        {
            cellRenderer: params => //Add column and button for deleting trainings
                <Button size='small' color='error' variant='contained' onClick={() => deleteTraining(params.data.id)}>
                    Delete
                </Button>

        }

    ]);

    useEffect(() => {
        handleFetch();

    }, []);

    const handleFetch = () => { // Fetch the data for AG-Grid
        fetchTrainingsCustomers()
            .then(data => setTrainings(data))
            .catch(err => console.error(err))
    }

    const formatDate = (dateString) => { // Function for date formatting
        const formattedDate = dayjs(dateString).format('D.M.YYYY HH:mm');
        return formattedDate;
    }

    const deleteTraining = (url) => { // Function for deleting training
        console.log(url)
        if (window.confirm("Are you sure?")) {
            fetch(import.meta.env.VITE_API_TRAININGS_URL + '/' + url, { method: 'DELETE' })
                .then(response => {
                    if (!response.ok)
                        throw new Error("Error while deleting: " + response.statusText)

                    return response.json();
                })
                .then(() => handleFetch())
                .catch(err => console.error(err))
        }
    }

    return (

        <div className={"ag-theme-material"} style={{ height: 600, maxWidth: 'xl' }}> {/* Show Ag-Ggrid with data on page */}
            < AgGridReact
                rowData={trainings}
                columnDefs={colDefs}
                pagination={true}
                paginationAutoPageSize={true}
            />
        </div>

    )
}

export default Traininglist;