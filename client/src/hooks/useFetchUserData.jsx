export const fetchUserName = async (userId) => {
    try {
        const response = await fetch('http://localhost:3000/api/v1/auth/getUserData', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: userId }),
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Invalid ID');
        }

        const data = await response.json();
        // console.log("Fetched user data:", data.data.lastName); 
        return data.data?.lastName || null; // Return `name` if present
    } catch (error) {
        console.error("Error in fetchUserData:", error.message);
        alert(error.message); // Notify the user of the error
        return null;
    }
};

export const fetchUserData = async (userId) => {
    try {
        const response = await fetch('http://localhost:3000/api/v1/auth/getUserData', {
            method: 'POST',
            headers: { "Content-Type": "application/json" , Authorization : localStorage.getItem('token') },
            body: JSON.stringify({ id: userId }),
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Invalid ID');
        }

        const data = await response.json();
        // console.log("Fetched user data:", data.data.lastName); 
        return data.data // Return `name` if present
    } catch (error) {
        console.error("Error in fetchUserData:", error.message);
        alert(error.message); // Notify the user of the error
        return null;
    }
};