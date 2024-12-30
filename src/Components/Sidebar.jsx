// components/Sidebar.js
import React from "react";

const Sidebar = ({ events }) => {
  return (
    <div className="sidebar">
      <h3>All Events</h3>
      <ul>
        {Object.entries(events).map(([date, eventList], dateIndex) => {
          const formattedDate = new Date(date).toLocaleDateString("en-US", {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          });
          
          return eventList.map((event, index) => (
            <li key={`${date}-${index}`}>
              {`${index + 1}. ${event.name} / ${formattedDate}`}
            </li>
          ));
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
