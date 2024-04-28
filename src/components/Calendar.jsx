import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState, useEffect } from "react";
import { fetchTrainingsCustomers } from "../customerapi";
import { Box } from '@mui/material';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

export default function Calendar() {

    const localizer = momentLocalizer(moment);
    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        handleFetch();
    }, []);

    const handleFetch = () => {
        fetchTrainingsCustomers()
            .then(data => setTrainings(data))
            .catch(err => console.error(err))

    }

    const events = trainings.map(training => {

        const firstName = training.customer.firstname || "No name"; // Check if names are empty, if so, set them to "No name"
        const lastName = training.customer.lastname || "No name";

        return {
            title: training.activity + " - " + firstName + " " + lastName,
            start: new Date(training.date),
            end: moment(training.date).add(training.duration, 'minutes'),
        };
    });


    const formats = {
        timeGutterFormat: 'H:mm', // Format for time in the left side column
        eventTimeRangeFormat: ({ start, end }, culture, localizer) =>
            localizer.format(start, 'H:mm', culture) + ' - ' +
            localizer.format(end, 'H:mm', culture), // Format for event times
        agendaTimeRangeFormat: ({ start, end }, culture, localizer) =>
            localizer.format(start, 'HH:mm', culture) + ' - ' +
            localizer.format(end, 'HH:mm', culture)
    };

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
                    <Item>Customer schedule</Item>
                </Stack>
            </Box>

            <BigCalendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                views={['month', 'week', 'day', 'agenda']}
                defaultView='week'
                formats={formats}
                style={{ margin: "20px", height: 600, font: "Arial" }}
            />
        </>

    );

}