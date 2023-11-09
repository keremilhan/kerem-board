// import React, { useState } from 'react';
// import { DateRangePicker, Calendar } from 'react-date-range';
// import 'react-date-range/dist/styles.css'; // main style file
// import 'react-date-range/dist/theme/default.css'; // theme css file

// const CalendarComponent: React.FC<{
//     date?: Date;
//     setDate?: (param: Date) => void;
//     singleDate: boolean;
//     setShowCalendar?: (param: any) => void;
//     handleSelectDate?: () => void;
//     setSelectionRange?: (param: any) => void;
//     selectionRange?: any;
// }> = ({ date, setDate, singleDate, setShowCalendar, handleSelectDate, setSelectionRange, selectionRange }) => {
//     console.log(selectionRange);
//     const handleSelectRange = (ranges: any) => {
//         setShowCalendar(false);
//         setSelectionRange(ranges.selection);
//         if (handleSelectDate) {
//             handleSelectDate();
//         }
//     };
//     const handleSelect = (date: any) => {
//         setShowCalendar(false);
//         setDate(date);
//     };

//     if (singleDate) {
//         return <Calendar date={date} onChange={handleSelect} />;
//     }
//     return <DateRangePicker ranges={[selectionRange]} onChange={handleSelectRange} />;
// };

// export default CalendarComponent;
export {};
