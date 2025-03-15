import axiosInstance from "../axios";

export const getProperties = async () => {
    try {
        const response = await axiosInstance.get('/data/properties');
        console.log('API response:', response);
        const { data, status } = response;

        if (status !== 200) {
            throw new Error('Failed to fetch properties');
        }
        return data.data;
    } catch (err) {
        console.error('Error fetching properties: ', err);
        return [];
    } 
};

export const getPropertyById = async (id) => {
    try {
        const response = await axiosInstance.get(`/data/properties/${id}`);
        const { data, status } = response;

        if (status !== 200) {
            throw new Error('Failed to fetch property');
        }
        return data; 
    } catch (err) {
        console.error('Error fetching property: ', err);
        throw new Error('Failed to fetch property');
    }
};