export const fetchCustomers = () => {
    return fetch(import.meta.env.VITE_API_CUSTOMERS_URL) // Fetch the backend for customer data from designated website
        .then(response => {
            if (!response.ok) // Handle errors
                throw new Error("Error in fetch " + response.statusText);
            return response.json();
        })
}

export const fetchTrainingsCustomers = () => { // Fetch the backend for trainnig data from designated website
    return fetch(import.meta.env.VITE_API_TRAININGS_CUSTOMERS_URL)
        .then(response => {
            if (!response.ok)
                throw new Error("Error in fetch " + response.statusText);
            return response.json();
        })
}

export const editCustomer = () => { // Edit customer data in Customers page
    fetch(url, {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(updateCustomer)
    })

        .then(response => {
            if (!response.ok)
                throw new Error("Error when updating customer details " + response.statusText)
            return response.json();
        })
}

export const handleTraining = () => { // Fetch Trainings and send POST request
    fetch(import.meta.env.VITE_API_TRAININGS_URL, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(training)
    })

        .then(response => {
            if (!response.ok)
                throw new Error("Error while adding new trainig for customer: " + response.statusText)
            return response.json();

        })
}
