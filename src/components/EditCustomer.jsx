import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


export default function EditCustomer({ data, updateCustomer }) {
    const [open, setOpen] = useState(false);

    const [customer, setCustomer] = useState({ // Create customer object with empty attributes
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        streetaddress: '',
        postcode: '',
        city: ''
    });

    const handleClickOpen = () => { // Open dialog with existing data
        setCustomer({
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            phone: data.phone,
            streetaddress: data.streetaddress,
            postcode: data.postcode,
            city: data.city
        })
        setOpen(true);
    }

    const handleClose = () => { // Close dialog without saving
        setOpen(false);
    };

    const handleSave = () => { // Save edited data and close dialog
        updateCustomer(data._links.customer.href, customer)
        handleClose();
    }

    return (
        <>
            <Button size='small' variant='contained' onClick={handleClickOpen}> {/* Create button for editing */}
                Edit
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Add new customer</DialogTitle> {/* Dialog with text fields to edit customer data */}
                <DialogContent>
                    <TextField
                        margin='dense'
                        label='Firstname'
                        value={customer.firstname}
                        onChange={e => setCustomer({ ...customer, firstname: e.target.value })}
                        fullWidth
                        variant='standard'
                    />
                    <TextField
                        margin='dense'
                        label='Lastname'
                        value={customer.lastname}
                        onChange={e => setCustomer({ ...customer, lastname: e.target.value })}
                        fullWidth
                        variant='standard'
                    />
                    <TextField
                        margin='dense'
                        label='Email'
                        value={customer.email}
                        onChange={e => setCustomer({ ...customer, email: e.target.value })}
                        fullWidth
                        variant='standard'
                    />
                    <TextField
                        margin='dense'
                        label='Phone'
                        value={customer.phone}
                        onChange={e => setCustomer({ ...customer, phone: e.target.value })}
                        fullWidth
                        variant='standard'
                    />
                    <TextField
                        margin='dense'
                        label='Streetaddress'
                        value={customer.streetaddress}
                        onChange={e => setCustomer({ ...customer, streetaddress: e.target.value })}
                        fullWidth
                        variant='standard'
                    />
                    <TextField
                        margin='dense'
                        label='Postcode'
                        value={customer.postcode}
                        onChange={e => setCustomer({ ...customer, postcode: e.target.value })}
                        fullWidth
                        variant='standard'
                    />
                    <TextField
                        margin='dense'
                        label='City'
                        value={customer.city}
                        onChange={e => setCustomer({ ...customer, city: e.target.value })}
                        fullWidth
                        variant='standard'
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}