export default function getNextSevenDays() {
  var aryDates = [];
  var daysToAdd = 6;
  var startDate = new Date();
  for (var i = 0; i <= daysToAdd; i++) {
    var currentDate = new Date();
    currentDate.setDate(startDate.getDate() + i);
    var fullDate =
      DayAsString(currentDate.getDay()) +
      ", " +
      currentDate.getDate() +
      " " +
      MonthAsString(currentDate.getMonth()) +
      " " +
      currentDate.getFullYear();
    var dayName = DayAsString(currentDate.getDay());
    var day =
      currentDate.getDate() < 10
        ? "0" + currentDate.getDate()
        : "" + currentDate.getDate();
    var datObj = { fullDate, dayName, day };
    aryDates.push(datObj);
  }

  return aryDates;
}

function MonthAsString(monthIndex) {
  var d = new Date();
  var month = new Array();
  month[0] = "January";
  month[1] = "February";
  month[2] = "March";
  month[3] = "April";
  month[4] = "May";
  month[5] = "June";
  month[6] = "July";
  month[7] = "August";
  month[8] = "September";
  month[9] = "October";
  month[10] = "November";
  month[11] = "December";

  return month[monthIndex];
}

function DayAsString(dayIndex) {
  var weekdays = new Array(7);
  weekdays[0] = "Sun";
  weekdays[1] = "Mon";
  weekdays[2] = "Tue";
  weekdays[3] = "Wed";
  weekdays[4] = "Thu";
  weekdays[5] = "Fri";
  weekdays[6] = "Sat";

  return weekdays[dayIndex];
}
