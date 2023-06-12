import React, { useState } from 'react';
import { BookingURL } from '../Setting.js';

function GetBookings() {
    const [bookings, setBookings] = useState([]);
    const [userName, setUserName] = useState('');

    const handleGetBookingClick = async () => {
        try {
            const response = await fetch(BookingURL + 'user/' + userName, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setBookings(data);
            } else {
                console.error('Error fetching bookings:', response.status);
            }
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter username"
            />
            <button onClick={handleGetBookingClick}>Get Bookings</button>
            {bookings.length > 0 && (
                <div>
                    {bookings.map((booking) => (
                        <div key={booking.id}>
                            <h3>Date: {booking.date}</h3>
                            <p>Time: {booking.time}</p>
                            <p>Duration: {booking.duration}</p>
                            <br />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default GetBookings;
