import React, {useState} from "react";
import {WashingAssistantURL} from "../Setting.js";
import {useNavigate} from "react-router-dom";

const WashingAssistantForm = () => {
    const history = useNavigate();


    const [name, setName] = useState("");
    const [primaryLanguage, setPrimaryLanguage] = useState("");
    const [yearsOfExperience, setYearsOfExperience] = useState("");
    const [hourlyPrice, setHourlyPrice] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Create an object with the form data
        const washingAssistant = {
            name,
            primaryLanguage,
            yearsOfExperience,
            hourlyPrice,
        };
        console.log(washingAssistant)

        // Send the form data to the backend (replace 'apiEndpoint' with your actual endpoint)
        fetch(WashingAssistantURL + "new", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(washingAssistant),
        })
            .then((response) => response.json())
            .then((data) => {
                // Handle the response from the backend if needed
                console.log(data);
                //Redirect to the home page
                history("/");

            })
            .catch((error) => {
                // Handle any errors that occurred during the request
                console.error('Error:', error);
            });
    }

    return (
        <div>
            <label>
                Washing Assistant Name
                <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </label>
            <br/>
            <label>
                Language:
                <input
                    type="text"
                    value={primaryLanguage}
                    onChange={e => setPrimaryLanguage(e.target.value)}
                />
            </label>
            <br/>
            <label>
                Years of Experience:
                <input
                    type="text"
                    value={yearsOfExperience}
                    onChange={e => setYearsOfExperience(e.target.value)}
                />
            </label>
            <br/>
            <label>
                Hourly Price:
                <input
                    type="text"
                    value={hourlyPrice}
                    onChange={e => setHourlyPrice(e.target.value)}
                />
            </label>
            <br/>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}
export default WashingAssistantForm;