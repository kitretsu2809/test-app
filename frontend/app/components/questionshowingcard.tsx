// Import necessary dependencies
import React from 'react'; // Import React
import { quiztakingprops } from '@/types'; // Import the quiztakingprops type
import { useRouter } from 'next/navigation'; // Import the useRouter hook
import '../globals.css'; // Import global CSS styles

// Define the Quecard component
const Quecard: React.FC<quiztakingprops> = (props) => {
    // Initialize the useRouter hook
    const router = useRouter();

    // Prepare data for the component
    let data = {
        quizid: props.quizid, // Quiz ID received as a prop
        token: localStorage.getItem('accessToken'), // Retrieve token from local storage
    };

    // Handle button click
    const handleclick = () => {
        let token = data.token;
        if (!token) {
            // If token doesn't exist, redirect to the login page
            router.push('/Login');
        } else {
            // Otherwise, navigate to the quiz page with the specified quiz ID
            router.push(`/takequiz/${data.quizid}`);
        }
    };

    // Render the component
    return (
        <div style={{ height: '3rem', backgroundColor: 'pink', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: '3px' }}>
            <div>
                {/* Display quiz name and topics */}
                <h3>{props.quizname}</h3>
                <h5>Topics: {props.quiztopic}</h5>
            </div>
            {/* Button to start the quiz */}
            <button style={{ backgroundColor: 'aqua', borderRadius: '3px', marginRight: '2rem', height: '2rem' }} onClick={handleclick}>
                {props.buttontext}
            </button>
        </div>
    );
};

export default Quecard; // Export the Quecard component
