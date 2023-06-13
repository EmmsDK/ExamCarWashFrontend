import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { WashingAssistantURL } from '../Setting.js';

const WashingAssistantList = () => {
    const [washingAssistants, setWashingAssistants] = useState([]);

    useEffect(() => {
        // Fetch the list of washing assistants from the backend API
        fetch(WashingAssistantURL + 'all')
            .then((response) => response.json())
            .then((data) => setWashingAssistants(data))
            .catch((error) => console.error('Error fetching washing assistants:', error));
    }, []);

    let id = washingAssistants.id;
    return (

        <div>
            <h2>Washing Assistants</h2>
            <ul>
                {washingAssistants.map((assistant) => (
                    <li key={assistant.id}>
                        <span>Name: {assistant.name}</span>
                        <br />
                        <span>Primary Language: {assistant.primaryLanguage}</span>
                        <br />
                        <span>Years of Experience: {assistant.yearsOfExperience}</span>
                        <br />
                        <span>Hourly Price: {assistant.hourlyPrice}</span>
                        <br />
                        <Link to={WashingAssistantURL`/${id}/edit`}>Edit</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default WashingAssistantList;
