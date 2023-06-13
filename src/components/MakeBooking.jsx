import React, {useState, useEffect} from 'react';
import {WashingAssistantURL, BookingURL} from '../Setting.js';
import {useNavigate} from "react-router-dom";

const MakeBooking = () => {
    const history = useNavigate();

    const [userName, setUserName] = useState('');
    const [assistantNames, setAssistantNames] = useState([]);
    const [washingAssistants, setWashingAssistants] = useState([]);
    const [selectedAssistants, setSelectedAssistants] = useState([]);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [duration, setDuration] = useState('');

    useEffect(() => {
        // Fetch the list of washing assistants from the backend API
        fetch(WashingAssistantURL + 'all')
            .then((response) => response.json())
            .then((data) => setWashingAssistants(data))
            .catch((error) => console.error('Error fetching washing assistants:', error));
    }, []);

    const handleUserNameChange = (e) => {
        setUserName(e.target.value);
    };

    const handleAssistantChange = (e) => {
        const assistantName = e.target.value;
        setSelectedAssistants((prevSelectedAssistants) => {
            // Check if the assistant has already been selected
            if (prevSelectedAssistants.includes(assistantName)) {
                return prevSelectedAssistants.filter((name) => name !== assistantName);
            } else {
                // Check if the maximum limit of 3 assistants has been reached
                if (prevSelectedAssistants.length >= 3) {
                    return prevSelectedAssistants;
                } else {
                    return [...prevSelectedAssistants, assistantName];
                }
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Get the washing assistant IDs
        const assistantIds = selectedAssistants.map((assistantName) => {
            const assistant = washingAssistants.find((assistant) => assistant.name === assistantName);
            return assistant.id;
        });

        // Perform the submission logic here, e.g., send a POST request to the backend API
        const bookingData = {
            userName: userName,
            assistantNames: selectedAssistants,
            date: date,
            time: time,
            duration: duration,
        };

        // Send a POST request to the backend API
        fetch(BookingURL + 'create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Booking created:', data);
                // Reset the form
                setUserName('');
                setSelectedAssistants([]);
                setDate('');
                setTime('');
                setDuration('');
                //redirect to the home page
                history('/');
            })
            .catch((error) => console.error('Error creating booking:', error));
    };

    return (
        <div>
            <h2>Make a Booking</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="userName">User Name:</label>
                    <input
                        type="text"
                        id="userName"
                        value={userName}
                        onChange={handleUserNameChange}
                        required
                    />
                </div>
                <div>
                    <label>Assistant Names:</label>
                    <select multiple value={selectedAssistants} onChange={handleAssistantChange}>
                        {washingAssistants.map((assistant) => (
                            <option key={assistant.id} value={assistant.name}>
                                {assistant.name}
                            </option>
                        ))}
                    </select>
                </div>
                <br/>
                <label>
                    Date:
                    <input type="text" value={date} onChange={(e) => setDate(e.target.value)}/>
                </label>
                <br/>
                <label>
                    Time:
                    <input type="text" value={time} onChange={(e) => setTime(e.target.value)}/>
                </label>
                <br/>
                <label>
                    Duration:
                    <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)}/>
                </label>
                <br/>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default MakeBooking;
