import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { BookingURL } from '../Setting.js';

const UpdateBooking = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [booking, setBooking] = useState(null);
    const [userName, setUserName] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [duration, setDuration] = useState('');

    useEffect(() => {
        // Fetch the booking details from the backend API
        fetch(BookingURL + `/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setBooking(data);
                setUserName(data.userName);
                setDate(data.date);
                setTime(data.time);
                setDuration(data.duration);
            })
            .catch((error) => console.error('Error fetching booking:', error));
    }, [id]);

    const handleUpdateBooking = (e) => {
        e.preventDefault();
        // Update the booking
        const updatedBooking = {
            id: booking.id,
            userName,
            date,
            time,
            duration,
        };

        // Send a PUT request to the backend API
        fetch(BookingURL + `update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedBooking),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Booking updated:', data);
                // Redirect to the booking list page
                navigate('/bookings');
            })
            .catch((error) => console.error('Error updating booking:', error));
    };

    const handleDeleteBooking = () => {
        // Send a DELETE request to the backend API
        fetch(BookingURL + `${id}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Booking deleted:', data);
                // Redirect to the booking list page
                navigate('/bookings');
            })
            .catch((error) => console.error('Error deleting booking:', error));
    };

    if (!booking) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Edit Booking</h2>
            <form onSubmit={handleUpdateBooking}>
                <div>
                    <label htmlFor="userName">User Name:</label>
                    <input
                        type="text"
                        id="userName"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="date">Date:</label>
                    <input
                        type="text"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="time">Time:</label>
                    <input
                        type="text"
                        id="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="duration">Duration:</label>
                    <input
                        type="text"
                        id="duration"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Update</button>
                <button onClick={handleDeleteBooking}>Delete</button>
            </form>
        </div>
    );
};

export default UpdateBooking;
