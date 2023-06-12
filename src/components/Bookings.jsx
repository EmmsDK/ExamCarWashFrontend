import React, {useState} from "react";

function Bookings(date, time, duration) {
    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    return (
        <div className="Bookings-box">
            <div className="bookings-header" onClick={toggleExpanded}>
                <h2>
                    {id}
                    {expanded ? ' ▲' : ' ▼'}
                </h2>
            </div>
            {expanded && (
                <div className="fact-details">
                    <label>
                        <h3>Date:</h3>
                        <div
                            className="autoscale-field"
                            dangerouslySetInnerHTML={{__html: date}}
                        ></div>
                    </label>
                    <br/>
                    <label>
                        <h3>Time:</h3>
                        <div
                            className="autoscale-field"
                            dangerouslySetInnerHTML={{__html: time}}
                        ></div>
                    </label>
                    <br/>
                    <label>
                        <h3>Duration:</h3>
                        <div
                            className="autoscale-field"
                            dangerouslySetInnerHTML={{__html: duration}}
                        ></div>
                    </label>
                </div>
            )}
        </div>
    );
}

export default Bookings;