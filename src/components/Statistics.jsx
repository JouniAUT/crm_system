import { useState, useEffect } from 'react';
import { fetchTrainings } from '../customerapi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts'
import { Box } from '@mui/material';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

export default function Statistics() {

    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        handleFetch();

    }, [])

    const handleFetch = () => { // Fetch the data for AG-Grid
        fetchTrainings()
            .then(data => setTrainings(data._embedded.trainings))
            .catch(err => console.error(err))
    }

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));


    return (
        <>
            <Box sx={{ width: '100%', marginTop: '10px' }}>
                <Stack spacing={2}>
                    <Item>Total duration of each training type</Item>
                </Stack>
            </Box>
            <ResponsiveContainer width="100%" height={600} >
                <BarChart data={trainings} margin={{ top: 50, right: 30, left: 20, bottom: 5 }} >

                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='activity' />
                    <YAxis >
                        <Label angle={-90} value="Duration (mins)" position="insideLeft" />
                    </YAxis>
                    <Tooltip />
                    <Bar dataKey='duration' fill='#235ed3' />
                </BarChart>
            </ResponsiveContainer>


        </>

    );
}