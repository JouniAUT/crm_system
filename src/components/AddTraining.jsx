import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Stack } from '@mui/material';

export default function AddTraining({ addTraining, data }) {

    const [open, setOpen] = useState(false);

    const [training, setTraining] = useState({ //Create training object with attributes
        date: null,
        activity: '',
        duration: 0,
        customer: data._links.customer.href //Fetch customer data from the row
    })

    const handleClickOpen = () => { // Open Add new training dialog
        setOpen(true);
    };

    const handleClose = () => { //Close the sheet
        setOpen(false);
    };

    const handleSave = () => { // Save new training and close dialog
        addTraining(training);
        handleClose();

    }

    const handleDate = (date) => { // Add chosen date in training object
        setTraining({ ...training, date: date.toDate() })
    }

    return (
        <>

            <Button size='small' variant='contained' color='success' onClick={handleClickOpen}> {/* Button for adding new training for a customer */}
                +
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle> {/* Dialog with date, activity and duration attributes */}
                    <DialogContent>
                        <Stack>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    ampm={false}
                                    inputFormat='DD.MM.YYYY HH:mm'
                                    label='Date and Time'
                                    selected={training.date}
                                    onChange={handleDate}
                                    fullWidth
                                    variant='standard'
                                />
                            </LocalizationProvider>
                            <TextField
                                margin='dense'
                                label='Activity'
                                value={training.activity}
                                onChange={e => setTraining({ ...training, activity: e.target.value })}
                                fullWidth
                                variant='standard'
                            />
                            <TextField
                                margin='dense'
                                label='Duration'
                                value={training.duration}
                                onChange={e => setTraining({ ...training, duration: e.target.value })}
                                fullWidth
                                variant='standard'
                            />
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Close</Button>
                        <Button onClick={handleSave}>Save</Button>
                    </DialogActions>
                </DialogTitle>


            </Dialog>
        </>
    );
}