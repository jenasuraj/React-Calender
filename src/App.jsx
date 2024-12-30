import React, { useState, useEffect } from "react";
import Calendar from "./Components/Calendar";
import EventModal from "./Components/EventModal";
import Filter from "./Components/Filter";
import ExportEvents from "./Components/ExportEvents";
import Sidebar from "./Components/Sidebar"; // Import Sidebar
import "./App.css";

const App = () => {
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem("events");
    return savedEvents ? JSON.parse(savedEvents) : {};
  });
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [filterKeyword, setFilterKeyword] = useState("");
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const daysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const handleAddEvent = (date, newEvent) => {
    setEvents((prev) => ({
      ...prev,
      [date]: prev[date] ? [...prev[date], newEvent] : [newEvent],
    }));
  };

  const handleEditEvent = (date, eventIndex, updatedEvent) => {
    setEvents((prev) => {
      const updatedEvents = [...prev[date]];
      updatedEvents[eventIndex] = updatedEvent;
      return { ...prev, [date]: updatedEvents };
    });
  };

  const handleDeleteEvent = (date, eventIndex) => {
    setEvents((prev) => {
      const updatedEvents = [...prev[date]];
      updatedEvents.splice(eventIndex, 1);
      return { ...prev, [date]: updatedEvents };
    });
  };

  const handleFilterChange = (keyword) => {
    setFilterKeyword(keyword);
  };

  const handlePreviousMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const filteredEvents = Object.keys(events).reduce((acc, date) => {
    const matchingEvents = events[date].filter((event) =>
      event.name.toLowerCase().includes(filterKeyword.toLowerCase())
    );
    if (matchingEvents.length > 0) {
      acc[date] = matchingEvents;
    }
    return acc;
  }, {});

  return (
    <div className="App">
      <h1>Dynamic Event Calendar</h1>
      <Filter onFilterChange={handleFilterChange} />
      <div className="month-navigation">
        <button onClick={handlePreviousMonth}>Previous</button>
        <span>
          {currentMonth.toLocaleString("default", { month: "long" })} {currentMonth.getFullYear()}
        </span>
        <button onClick={handleNextMonth}>Next</button>
      </div>
      <div className="main-content">
        <Calendar
          events={filteredEvents}
          setSelectedDate={setSelectedDate}
          setModalOpen={setModalOpen}
          currentMonth={currentMonth}
          daysInMonth={daysInMonth(currentMonth.getMonth(), currentMonth.getFullYear())}
        />
        <Sidebar events={filteredEvents} /> {/* Add Sidebar here */}
        {modalOpen && (
          <EventModal
            date={selectedDate}
            events={events[selectedDate] || []}
            onClose={() => setModalOpen(false)}
            onAdd={handleAddEvent}
            onEdit={handleEditEvent}
            onDelete={handleDeleteEvent}
          />
        )}
        <ExportEvents events={filteredEvents} />
      </div>
    </div>
  );
};

export default App;
