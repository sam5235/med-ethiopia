import {
  Calendar,
  CalendarControls,
  CalendarPrevButton,
  CalendarNextButton,
  CalendarMonths,
  CalendarMonth,
  CalendarMonthName,
  CalendarWeek,
  CalendarDays,
} from "@uselessdev/datepicker";

const getLastDay = (date) => {
  date.setDate(date.getDate() - 1);
  return date;
};

const SimpleCalendar = ({ date, setDate }) => {
  const handleSelectDate = (values) => setDate(values);

  return (
    <Calendar
      singleDateSelection
      highlightToday
      value={{ start: date }}
      allowOutsideDays
      disablePastDates={getLastDay(new Date())}
      onSelectDate={handleSelectDate}
    >
      <CalendarControls>
        <CalendarPrevButton />
        <CalendarNextButton />
      </CalendarControls>

      <CalendarMonths>
        <CalendarMonth>
          <CalendarMonthName />
          <CalendarWeek />
          <CalendarDays />
        </CalendarMonth>
      </CalendarMonths>
    </Calendar>
  );
};

export default SimpleCalendar;
