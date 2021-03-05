"use strict";

class WooahanDate {
  static getCurrentFullDate() {
    const date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    month = month < 10 ? `0${month}` : month;
    let day = date.getDate();
    day = day < 10 ? `0${day}` : day;
    let hours = date.getHours();
    hours = hours < 10 ? `0${hours}` : hours;
    let minutes = date.getMinutes();
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    let seconds = date.getSeconds();
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    const currentDate = Number(
      `${year}${month}${day}${hours}${minutes}${seconds}`
    );

    return currentDate;
  }
}

module.exports = WooahanDate;
