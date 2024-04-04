export const fetchCustomers = () => {
    return fetch(import.meta.env.VITE_API_URL) //Fetch the backend from designated website
        .then(response => {
            if (!response.ok) // Handle errors
                throw new Error("Error in fetch " + response.statusText);
            return response.json();
        })
}