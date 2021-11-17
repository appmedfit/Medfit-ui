import * as moment from "moment";
export function createSlots() {
  let timeSlots = {
    timeSlotHeaders: ["9AM-12PM", "12PM-3PM", "3PM-6PM", "6PM-9PM"],
    timeSlots: [
      {
        value: "09:00",
        detailText: "09:00 AM",
        isSelected: false,
        slotHeader: "9AM-12PM",
      },
      {
        value: "09:30",
        detailText: "09:30 AM",
        isSelected: false,
        slotHeader: "9AM-12PM",
      },
      {
        value: "10:00",
        detailText: "10:00 AM",
        isSelected: false,
        slotHeader: "9AM-12PM",
      },
      {
        value: "10:30",
        detailText: "10:30 AM",
        isSelected: false,
        slotHeader: "9AM-12PM",
      },
      {
        value: "11:00",
        detailText: "11:00 AM",
        isSelected: false,
        slotHeader: "9AM-12PM",
      },
      {
        value: "11:30",
        detailText: "11:30 AM",
        isSelected: false,
        slotHeader: "9AM-12PM",
      },

      {
        value: "12:00",
        detailText: "12:00 PM",
        isSelected: false,
        slotHeader: "12PM-3PM",
      },
      {
        value: "12:30",
        detailText: "12:30 PM",
        isSelected: false,
        slotHeader: "12PM-3PM",
      },
      {
        value: "01:00",
        detailText: "01:00 PM",
        isSelected: false,
        slotHeader: "12PM-3PM",
      },
      {
        value: "01:30",
        detailText: "01:30 PM",
        isSelected: false,
        slotHeader: "12PM-3PM",
      },
      {
        value: "02:00",
        detailText: "02:00 PM",
        isSelected: false,
        slotHeader: "12PM-3PM",
      },
      {
        value: "02:30",
        detailText: "02:30 PM",
        isSelected: false,
        slotHeader: "12PM-3PM",
      },

      {
        value: "03:00",
        detailText: "03:00 PM",
        isSelected: false,
        slotHeader: "3PM-6PM",
      },
      {
        value: "03:30",
        detailText: "03:30 PM",
        isSelected: false,
        slotHeader: "3PM-6PM",
      },
      {
        value: "04:00",
        detailText: "04:00 PM",
        isSelected: false,
        slotHeader: "3PM-6PM",
      },
      {
        value: "04:30",
        detailText: "04:30 PM",
        isSelected: false,
        slotHeader: "3PM-6PM",
      },
      {
        value: "05:00",
        detailText: "05:00 PM",
        isSelected: false,
        slotHeader: "3PM-6PM",
      },
      {
        value: "05:30",
        detailText: "05:30 PM",
        isSelected: false,
        slotHeader: "3PM-6PM",
      },

      {
        value: "06:00",
        detailText: "06:00 PM",
        isSelected: false,
        slotHeader: "6PM-9PM",
      },
      {
        value: "06:30",
        detailText: "06:30 PM",
        isSelected: false,
        slotHeader: "6PM-9PM",
      },
      {
        value: "07:00",
        detailText: "07:00 PM",
        isSelected: false,
        slotHeader: "6PM-9PM",
      },
      {
        value: "07:30",
        detailText: "07:30 PM",
        isSelected: false,
        slotHeader: "6PM-9PM",
      },
      {
        value: "08:00",
        detailText: "08:00 PM",
        isSelected: false,
        slotHeader: "6PM-9PM",
      },
      {
        value: "08:30",
        detailText: "08:30 PM",
        isSelected: false,
        slotHeader: "6PM-9PM",
      },
    ],
  };
  return timeSlots;
}

export const getTimeDiff = (day1, day2) => {
  const today = day2 && day2 != "today" ? moment(day2) : moment();
  const someday = moment(day1);
  const diff = someday.diff(today, "minutes");
  return diff - 10;
};

export const getDateTimestamp = (day1) => {
  const someday = moment(day1);
  return someday;
};

export const isNullorUndefined = (obj) => {
  return !(typeof obj !== "undefined" && obj !== null);
};
