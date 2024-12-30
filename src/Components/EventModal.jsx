import React, { useState } from "react";

const EventModal = ({ date, events, onClose, onAdd, onEdit, onDelete }) => {
  const [eventName, setEventName] = useState("");

  const handleAdd = () => {
    if (eventName.trim()) {
      const newEvent = { name: eventName };
      onAdd(date, newEvent);
      setEventName(""); // Clear input after adding
    }
  };

  return (
    <div className="modal">
      <h2>Events on {date}</h2>
      <button onClick={onClose}>Close</button>
      <ul>
        {events.map((event, index) => (
          <li key={index}>
            {event.name}
            <button onClick={() => onEdit(date, index, { name: "Edited Event" })}>
              Edit
            </button>
            <button onClick={() => onDelete(date, index)}>Delete</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
        placeholder="New event name"
      />
      <button onClick={handleAdd}>Add Event</button>
    </div>
  );
};

export default EventModal;
