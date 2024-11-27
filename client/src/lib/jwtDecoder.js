export function decodeToken(token) {
    if (!token) {
        console.error("Token is missing.");
        return null;
    }

    try {
        const payloadBase64 = token.split(".")[1];
        const decodedPayload = atob(payloadBase64);
        return JSON.parse(decodedPayload); // Parse the payload to a JavaScript object
    } catch (error) {
        console.error("Failed to decode token:", error);
        return null;
    }
}
