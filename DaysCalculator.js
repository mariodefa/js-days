const moment = require("moment");
const DATE_FORMAT = "YYYY-MM-DD";

class DaysCalculator {
  static calculateSlotsLenghts(savedDates) {
    return savedDates
      .map((date, index, arr) => {
        if (index === arr.length - 1) return null;
        const firstElem = moment(date, DATE_FORMAT);
        const secondElem = moment(arr[index + 1], DATE_FORMAT);
        return moment.duration(secondElem.diff(firstElem)).asDays();
      })
      .filter((duration) => duration !== null);
  }
  static calculate(savedDates) {
    if (savedDates.length < 2) {
      return res.status(500).send("2 dates are necessary to calculate it");
    }
    var slotsLenghts = DaysCalculator.calculateSlotsLenghts(savedDates);
    const minSlotLength = Math.min(...slotsLenghts);
    const maxSlotLength = Math.max(...slotsLenghts);

    const lastDate = moment(savedDates[savedDates.length - 1], DATE_FORMAT);

    const daysTilEnd = maxSlotLength - 11;
    const daysTilStart = minSlotLength - 18;

    const startDay = lastDate
      .clone()
      .add(daysTilStart, "days")
      .format(DATE_FORMAT);
    const endDay = lastDate.clone().add(daysTilEnd, "days").format(DATE_FORMAT);
    return { startDay: startDay, endDay: endDay };
  }
}

module.exports = DaysCalculator;
