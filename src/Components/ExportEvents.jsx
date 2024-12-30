// components/ExportEvents.js
import React from "react";

const ExportEvents = ({ events }) => {
  const handleExport = () => {
    const dataStr = JSON.stringify(events, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "events.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <button onClick={handleExport}>Export Events</button>
    </div>
  );
};

export default ExportEvents;
