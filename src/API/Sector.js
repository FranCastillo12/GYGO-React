export const getSectors = async () => {
  try {
    const response = await fetch('http://localhost:5135/api/Sector/Sector', {
      method: 'GET',
      credentials: 'include', 
      headers: { Accept: 'application/json' }
    });

    if (!response.ok) {
      throw new Error('Failed to load categories');
    }

    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};