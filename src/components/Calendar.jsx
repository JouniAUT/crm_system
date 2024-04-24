import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState, useEffect } from "react";

export default function Calendar() {

    const localizer = momentLocalizer(moment);
    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        handleFetch();
    }, []);

    const handleFetch = () => {
        fetch(import.meta.env.VITE_API_TRAININGS_CUSTOMERS_URL)
            .then(response => {
                if (!response.ok)
                    throw new Error("Error in fetch " + response.statusText);
                return response.json();
            })
            .then(data => setTrainings(data))
            .catch(err => console.error(err))

    }

    const events = trainings.map(training => ({// Convert trainings data into events format

        title: `${training.customer.firstname} ${training.customer.lastname} - ${training.activity}`,
        start: new Date(training.date),
        end: moment().add(training.duration, 'minutes'),
    }));

    const formats = {
        timeGutterFormat: 'HH:mm', // Format for time in the left side column
        eventTimeRangeFormat: ({ start, end }, culture, localizer) =>
            localizer.format(start, 'HH:mm', culture) + ' - ' +
            localizer.format(end, 'HH:mm', culture) // Format for event times
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