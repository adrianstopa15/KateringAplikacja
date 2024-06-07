import React, { useState, useEffect } from "react";

const fetchNotifications = () => {
  return Promise.resolve({
    id: Math.random().toString(36).substr(2, 9),
    message: "Nowe działanie w systemie o " + new Date().toLocaleTimeString(),
  });
};

export default function AdminNotifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchNotifications().then(newNotification => {
        setNotifications(prevNotifications => [newNotification, ...prevNotifications]);
      });
    }, 5000); 

    return () => clearInterval(intervalId); 
  }, []);

  return (
    <div>
      <div className="ml-s mt-s">
        <h1 className="h1-regular mb-m">Powiadomienia:</h1>
        <div>
          {notifications.map(notification => (
            <div key={notification.id} style={{ margin: '10px 0', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
              {notification.message}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}