export const fetchCustomers = () => {
    return fetch(import.meta.env.VITE_API_CUSTOMERS_URL) //Fetch the backend from designated website
        .then(response => {
            if (!response.ok) // Handle errors
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