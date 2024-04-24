import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState, useEffect } from "react";
import { fetchTrainingsCustomers } from "../customerapi";



const localizer = momentLocalizer(moment);

export default function Calendar() {

    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        handleFetch();
    }, []);

    const handleFetch = () => {
        fetchTrainingsCustomers()
            .then(data => setTrainings(data))
            .catch(err => console.error(err))
        console.log(trainings);
    }

    const endTime = moment(trainings.date).add(trainings.duration, 'minutes').toDate();

    const events = trainings.map(training => ({ // Convert trainings data into events format
        title: `${training.customer.firstname} ${training.customer.lastname} - ${training.activity}`,
        start: new Date(training.date),
        end: endTime,
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