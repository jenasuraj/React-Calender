import React from "react";

const Calendar = ({ events, setSelectedDate, setModalOpen, currentMonth }) => {
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();

  const handleClick = (day) => {
    const dateString = `${currentMonth.getFullYear()}-${currentMonth.getMonth() + 1}-${day}`;
    setSelectedDate(dateString);
    setModalOpen(true);
  };

  return (
    <div className="calendar">
      {Array.from({ length: daysInMonth }, (_, index) => {
        const day = index + 1;
        const dateString = `${currentMonth.getFullYear()}-${currentMonth.getMonth() + 1}-${day}`;
        return (
          <div
            key={day}
            className="calendar-day"
            onClick={() => handleClick(day)}
          >
            <span>{day}</span>
            {events[dateString] && <span>({events[dateString].length} events)</span>}
          </div>
        );
      })}
    </div>
  );
};

export default Calendar;
