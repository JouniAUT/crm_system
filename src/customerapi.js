export const fetchCustomers = () => {
    return fetch(import.meta.env.VITE_API_CUSTOMERS_URL) // Fetch the backend for customer data from designated website
        .then(response => {
            if (!response.ok) // Handle errors
                throw new Error("Error in fetch " + response.statusText);
            return response.json();
        })
}

export const fetchTrainings = () => { // Fetch the backend for trainnig data from designated website
    return fetch(import.meta.env.VITE_API_TRAININGS_URL)
        .then(response => {
            if (!response.ok)
                throw new Error("Error in fetch " + response.statusText);
            return response.json();
        })
}
