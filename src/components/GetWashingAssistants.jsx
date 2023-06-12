import React, { useState } from 'react';
import { WashingAssistantURL } from '../Setting.js';

function WashingAssistants() {
    const [washingAssistants, setWashingAssistant] = useState([]);

    const handleGetWashingAssistantClick = async () => {
        try {
            const response = await fetch(WashingAssistantURL+"all");

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setWashingAssistant(data);
            } else {
                console.error('Error fetching washingAssistants:', response.status);
            }
        } catch (error) {
            console.error('Error fetching washingAssistants:', error);
        }
    };

    return (
        <div>
            <button onClick={handleGetWashingAssistantClick}>Get Washing Assistant</button>
            {washingAssistants.length > 0 && (
                <div>
                    {washingAssistants.map((washingAssistant) => (
                        <div key={washingAssistant.id}>
                            <h3>Washing Assistant Name: {washingAssistant.name}</h3>
                            <p>Primary Language: {washingAssistant.primaryLanguage}</p>
                            <p>Years of Experience: {washingAssistant.yearsOfExperience}</p>
                            <p>Hourly Price: {washingAssistant.hourlyPrice}</p>
                            <br />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default WashingAssistants;
