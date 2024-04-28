import moment from "moment";

export const fetchCustomers = () => {
    return fetch(import.meta.env.VITE_API_CUSTOMERS_URL) // Fetch the backend for customer data from designated website
        .then(response => {
            if (!response.ok) // Handle errors
                throw new Error("Error in fetch " + response.statusText);
            return response.json();
        })
};

export const fetchTrainingsCustomers = () => { // Fetch the backend for training data from designated website
    return fetch(import.meta.env.VITE_API_TRAININGS_CUSTOMERS_URL)
        .then(response => {
            if (!response.ok)
                throw new Error("Error in fetch " + response.statusText);
            return response.json();
        })
};

export const fetchTrainings = () => {
    return fetch(import.meta.env.VITE_API_TRAININGS_URL)
        .then(response => {
            if (!response.ok)
                throw new Error("Error in fetch " + response.statusText);
            return response.json();
        })
};

export const handleCustomerUpdate = (url, updatedCustomer) => {
    return fetch(url, {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(updatedCustomer)
    })
        .then(response => {
            if (!response.ok)
                throw new Error("Error when updating: " + response.statusText);
            return response.json();
        });
};

export const handleAddTraining = (newTraining) => {
    return fetch(import.meta.env.VITE_API_TRAININGS_URL, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(newTraining)
    })
        .then(response => {
            if (!response.ok)
                throw new Error("Error when adding training: " + response.statusText);

            return response.json();
        });
};

export const handleDeleteCustomer = (url) => {
    if (window.confirm("Are you sure?")) {
        return fetch(url,
            { method: 'DELETE' })
            .then(response => {
                if (!response.ok)
                    throw new Error("Error while deleting: " + response.statusText);

                return response.json();
            });
    }
};

export const handleDeleteTraining = (url) => {
    if (window.confirm("Are you sure?")) {
        return fetch(import.meta.env.VITE_API_TRAININGS_URL + '/' + url,
            { method: 'DELETE' })
            .then(response => {
                if (!response.ok)
                    throw new Error("Error while deleting: " + response.statusText);

                return response.json();
            })
    }
};

export const handleFormat = (trainings) => {
    return trainings.map(training => {
        const firstName = training.customer.firstname || "No name";
        const lastName = training.customer.lastname || "No name";

        return {
            title: training.activity + " - " + firstName + " " + lastName,
            start: new Date(training.date),
            end: moment(training.date).add(training.duration, 'minutes'),
        };
    });
};

export const handleAddCustomer = (newCustomer) => {
    return fetch(import.meta.env.VITE_API_CUSTOMERS_URL, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(newCustomer)
    })
        .then(response => {
            if (!response.ok)
                throw new Error("Error when adding training: " + response.statusText);

            return response.json();
        });
};
