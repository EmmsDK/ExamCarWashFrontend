import React, {useState} from 'react';

function WashingAssistant(name,primary_language,years_of_experience,hourly_price) {
    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = () => {
        setExpanded(!expanded);
    }

    return (
        <div className="guide-box">
            <div className="guide-header" onClick={toggleExpanded}>
                <h2>
                    {id}
                    {expanded ? ' ▲' : ' ▼'}
                </h2>
            </div>
            {expanded && (
                <div className="fact-details">
                    <label>
                        <h3>Name:</h3>
                        <div
                            className="autoscale-field"
                            dangerouslySetInnerHTML={{ __html: name }}
                        ></div>
                    </label>
                    <br />
                    <label>
                        <h3>Primary Language:</h3>
                        <div
                            className="autoscale-field"
                            dangerouslySetInnerHTML={{ __html: primary_language }}
                        ></div>
                    </label>
                    <br />
                    <label>
                        <h3>Years of Experience:</h3>
                        <div
                            className="autoscale-field"
                            dangerouslySetInnerHTML={{ __html: years_of_experience }}
                        ></div>
                    </label>
                    <br />
                    <label>
                        <h3>Hourly Price:</h3>
                        <div
                            className="autoscale-field"
                            dangerouslySetInnerHTML={{ __html: hourly_price }}
                        ></div>
                    </label>
                </div>
            )}
        </div>
    );
}

export default WashingAssistant;