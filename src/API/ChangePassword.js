import { appsettings } from "../settings/appsettings";

export async function PostChangePassword(UserDTO){
    const response = await fetch(`${appsettings.apiUrl}user/ChangePassword`, {
        method: 'POST',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(UserDTO)
    });

    if (response.ok) {
        const text = await response.text();
        const data = JSON.parse(text)
        return data.message;
    } else {
        const error = await response.text();
        const err = JSON.parse(error)
        throw new Error(err.message);
    }
}