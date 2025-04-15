'use client';

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Make sure this CSS file is included

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const CustomCalendar = () => {
  const [dateRange, setDateRange] = useState<Value>([new Date(), new Date()]);

  const handleDateChange = (
    value: Value,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | undefined
  ) => {
    console.log('Date changed:', value);
    setDateRange(value);
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-md max-w-md mx-auto">
      <Calendar
        onChange={handleDateChange}
        value={dateRange}
        selectRange={true}
        className="w-full"
      />
    </div>
  );
};

export default CustomCalendar;
