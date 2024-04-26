import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState, useEffect } from "react";
import { fetchTrainingsCustomers } from "../customerapi";

export default function Calendar() {

    const noName = "Unknown customer";
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


    const events = trainings.map(training => ({// Convert trainings data into events format
        title: training.activity + " - " + training.customer.firstname + " " + training.customer.lastname,
        start: new Date(training.date),
        end: moment(training.date).add(training.duration, 'minutes'),

    }));


    const formats = {
        timeGutterFormat: 'H:mm', // Format for time in the left side column
        eventTimeRangeFormat: ({ start, end }, culture, localizer) =>
            localizer.format(start, 'H:mm', culture) + ' - ' +
            localizer.format(end, 'H:mm', culture) // Format for event times
    };

    return (

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

    );

}