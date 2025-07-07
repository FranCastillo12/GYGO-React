const API_BASE_URL = "http://localhost:5135"

const getGroupId = async () => {
  const groupId = await fetchGroupId();

  if (!groupId) {
    throw new Error("Group ID not found in cookies. Please select a group.");
  }

  const parsedGroupId = Number.parseInt(groupId, 10);
  if (isNaN(parsedGroupId)) {
    throw new Error("Invalid group ID format in cookies.");
  }

  return parsedGroupId;
};

// shared helper ─ safe JSON parsing
const parseJSON = async (response) => {
  const contentType = response.headers.get("content-type") || ""
  if (contentType.includes("application/json")) {
    return response.json()
  }
<<<<<<< HEAD
  // fallback (plain-text responses, etc.)
  return response.text()
}

/**
 * Get all users in a group
 * Uses group ID from cookies automatically
 * @returns {Promise<Array>} Array of users in the group
 */


export const getGroupUsers = async () => {
  try {
    const groupId = await getGroupId(); // <--- await here
=======
  return response.text()
}

export const getGroupUsers = async () => {
  try {
    const groupId = await getGroupId(); 
>>>>>>> a219cde9733cdbd773ca907d2990d3992b281e60

    const response = await fetch(`${API_BASE_URL}/GetGroup/${groupId}`, {
      method: "GET",
      mode: "cors",
<<<<<<< HEAD
      credentials: "include", // add this to send cookies
=======
      credentials: "include", 
>>>>>>> a219cde9733cdbd773ca907d2990d3992b281e60
      headers: { Accept: "application/json" }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch group users: ${response.statusText}`);
    }

<<<<<<< HEAD
    const data = await response.json(); // parse JSON here
=======
    const data = await response.json(); 
>>>>>>> a219cde9733cdbd773ca907d2990d3992b281e60
    console.log("Fetched users:", data);
    return data;
  } catch (error) {
    console.error("Error fetching group users:", error);
    throw error;
  }
};

export const sendUserInvite = async (email) => {
  try {

    console.log(email);
    const response = await fetch(`${API_BASE_URL}/sendInvite`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    },
    body: JSON.stringify({email})
});

    if (!response.ok) {
      throw new Error(`Failed to send invite: ${response.statusText}`)
    }

    const data = await parseJSON(response)
    return data
  } catch (error) {
    console.error("Error sending invite:", error)
    throw error
  }
}

export const removeUserFromGroup = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/removeFromGroup/${userId}`, {
      method: "PUT",
      mode: "cors",
      credentials: "include",
      headers: {
        Accept: "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to remove user: ${response.statusText}`)
    }

    const data = await parseJSON(response)
    return data
  } catch (error) {
    console.error("Error removing user:", error)
    throw error
  }
}

async function fetchGroupId() {
    try {

<<<<<<< HEAD
        const response = await fetch(`http://localhost:5135/getGroupId`, {
=======
        const response = await fetch(`${API_BASE_URL}/getGroupId`, {
>>>>>>> a219cde9733cdbd773ca907d2990d3992b281e60
            method: "GET",
            credentials: "include"
        });

        const groupId = await response.json();
        const hours = 4;
        const expires = new Date(Date.now() + hours * 3600 * 1000).toUTCString();
        document.cookie = `groupId=${groupId}; expires=${expires}; path=/`;
        return groupId;
    } catch (error) {
        console.error('Error fetching group ID:', error);
    }
}

export {getGroupId, fetchGroupId}
