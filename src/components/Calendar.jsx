import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Traininglist from "./Traininglist";

const localizer = momentLocalizer(moment);

export default function Calendar({ trainings }) {

    const events = trainings.map(training => ({ // Convert trainings data into events format
        title: training.activity,
        start: new Date(training.date),
        end: new Date(training.date),
    }));


    return (
        <>
            <BigCalendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ margin: "20px", height: 600 }}
            />
            <Calendar trainings={trainings} />
        </>
    );
}