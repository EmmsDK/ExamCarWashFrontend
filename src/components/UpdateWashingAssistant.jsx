import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { WashingAssistantURL } from '../Setting.js';

const UpdateWashingAssistant = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [washingAssistant, setWashingAssistant] = useState(null);
    const [name, setName] = useState('');
    const [primaryLanguage, setPrimaryLanguage] = useState('');
    const [yearsOfExperience, setYearsOfExperience] = useState('');
    const [hourlyPrice, setHourlyPrice] = useState('');

    useEffect(() => {
        // Fetch the washing assistant details from the backend API
        fetch(WashingAssistantURL + `/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setWashingAssistant(data);
                setName(data.name);
                setPrimaryLanguage(data.primaryLanguage);
                setYearsOfExperience(data.yearsOfExperience);
                setHourlyPrice(data.hourlyPrice);
            })
            .catch((error) => console.error('Error fetching washing assistant:', error));
    }, [id]);

    const handleEditEvent = (e) => {
        e.preventDefault();
        // Update the washing assistant
        const updatedWashingAssistant = {
            id: washingAssistant.id,
            name,
            primaryLanguage,
            yearsOfExperience,
            hourlyPrice,
        };

        // Send a PUT request to the backend API
        fetch(WashingAssistantURL + `/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedWashingAssistant),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Washing assistant updated:', data);
                // Redirect to the washing assistant list page
                navigate('/washing-assistants');
            })
            .catch((error) => console.error('Error updating washing assistant:', error));
    };

    if (!washingAssistant) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Edit Washing Assistant</h2>
            <form onSubmit={handleEditEvent}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="primaryLanguage">Primary Language:</label>
                    <input
                        type="text"
                        id="primaryLanguage"
                        value={primaryLanguage}
                        onChange={(e) => setPrimaryLanguage(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="yearsOfExperience">Years of Experience:</label>
                    <input
                        type="text"
                        id="yearsOfExperience"
                        value={yearsOfExperience}
                        onChange={(e) => setYearsOfExperience(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="hourlyPrice">Hourly Price:</label>
                    <input
                        type="text"
                        id="hourlyPrice"
                        value={hourlyPrice}
                        onChange={(e) => setHourlyPrice(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default UpdateWashingAssistant;
