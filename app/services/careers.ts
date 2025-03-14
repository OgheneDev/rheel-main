import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Career } from '@/app/types'; // Ensure Career type is correctly imported

export const getCareers = async (): Promise<Career[]> => {
    try {
        console.log("Fetching careers from Firestore...");
        const careersRef = collection(db, 'careers');
        const querySnapshot = await getDocs(careersRef); // Removed orderBy

        if (querySnapshot.empty) {
            console.log("No careers found in Firestore.");
            return [];
        }

        return querySnapshot.docs.map((doc) => {
            const data = doc.data() as Career;
            return {
                id: doc.id,
                position: data.position || 'Unknown Position',
                title: data.title || 'No Title',
                type: data.type || 'Unknown',
                description: data.description || 'No Description',
                salary: data.salary ?? 0,
                location: data.location || 'Not specified',
            };
        });
    } catch (error) {
        console.error('Error fetching careers:', error);
        throw new Error('Failed to fetch careers');
    }
};
