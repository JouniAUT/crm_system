export const fetchCustomers = () => {
    return fetch(import.meta.env.VITE_API_CUSTOMERS_URL) // Fetch the backend for customer data from designated website
        .then(response => {
            if (!response.ok) // Handle errors
                throw new Error("Error in fetch " + response.statusText);
            return response.json();
        })
}

export const fetchTrainingsCustomers = () => { // Fetch the backend for training data from designated website
    return fetch(import.meta.env.VITE_API_TRAININGS_CUSTOMERS_URL)
        .then(response => {
            if (!response.ok)
                throw new Error("Error in fetch " + response.statusText);
            return response.json();
        })
}

export const fetchTrainings = () => {
    return fetch(import.meta.env.VITE_API_TRAININGS_URL)
        .then(response => {
            if (!response.ok)
                throw new Error("Error in fetch " + response.statusText);
            return response.json();
        })
}
{/* 
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
*/}

