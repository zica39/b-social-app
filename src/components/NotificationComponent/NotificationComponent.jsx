import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import "./NotificationComponent.css"

const NotificationComponent = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const socket = io('http://localhost:3001', {
            withCredentials: true,
        });

        const loggedUser = JSON.parse(localStorage.getItem("userData"));
        if(!loggedUser)return;
        console.log(loggedUser);
        socket.emit('joinRoom', loggedUser._id);

        socket.on('newComment', ({ comment }) => {
            setNotifications((prevNotifications) => [...prevNotifications, comment]);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const removeNotification = (id) => {
        setNotifications((prevNotifications) => prevNotifications.filter((notification) => notification.id !== id));
    };

    return (
        <div className="notification-container">
            <h2>Notifications</h2>
            {notifications.map((comment) => (
                <div key={comment.id} className="notification-item" onClick={() => removeNotification(comment.id)}>
                    <span className="notification-text">
                        <strong>{comment.email}</strong> left a comment on your post.
                    </span>
                    <button className="close-button">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
            ))}
        </div>
    );
};

export default NotificationComponent;
