import { useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react';
import Button from '@mui/material/Button';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { fetchTrainings } from "../customerapi";

function Traininglist() {

    const [trainings, setTrainnings] = useState([]);

    const [colDefs] = useState([
        { field: 'date', filter: true },
        { field: 'duration', filter: true },
        { field: 'activity', filter: true }

    ]);

    useEffect(() => {
        handleFetch();
    }, []);

    const handleFetch = () => {
        fetchTrainings()
            .then(data => setTrainnings(data._embedded.trainings))
            .catch(err => console.error(err))
    }

    return (
        <>
            <div className={"ag-theme-material"} style={{ height: 600 }}>
                <AgGridReact
                    rowData={trainings}
                    columnDefs={colDefs}
                    pagination={true}
                    paginationAutoPageSize={true}
                />
            </div>
        </>
    )
}

export default Traininglist;