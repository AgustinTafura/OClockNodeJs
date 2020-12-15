const { Op, Sequelize } = require("sequelize");
const {sequelize, Booking}  = require('../models/index');

module.exports = {

  bookingStore :  async (req, res) => {

    try {
      const {appointmentDuration, dateStart, status_id, service_id, days } = req.body
      var dateStartTime = new Date(dateStart + ' 00:00:00').getTime();
      var numberOfDays = 10;
      var dateEndTime = dateStartTime + 86400000 * numberOfDays;
      var provider_id =  req.user.Providers[0].dataValues.id;


      for (var dateTime = dateStartTime; dateTime < dateEndTime; dateTime = dateTime + 86400000) {
        var dayNumber = new Date(dateTime).getDay();
        var day = days[dayNumber];

        if(typeof day == 'object') {

          day.open_hour.forEach(function(value,index, array) {

            var hourStart = value.substring(0,2);
            var minuteStart = value.substring(3,5);
            var hourEnd = day.close_hour[index].substring(0,2);
            var minuteEnd = day.close_hour[index].substring(3,5);
            console.log(hourEnd);
            console.log(minuteEnd);
            timeStart = (value == '24hours')? dateTime : dateTime + (3600000 * hourStart) + (60000 * minuteStart);
            timeEnd = (day.close_hour == '24hours')? dateTime + (3600000 * 23) + (60000 * 59) : dateTime + (3600000 * hourEnd) + (60000 * minuteEnd);

            for (var bookingTimeStart = timeStart; bookingTimeStart < timeEnd; bookingTimeStart = bookingTimeStart + (60000 * appointmentDuration)) {

              var bookingTimeEnd = bookingTimeStart + (60000 * appointmentDuration);
              console.log(day, new Date(bookingTimeStart).toLocaleString(), new Date(bookingTimeEnd).toLocaleString());
              Booking.create({
                StatusId:status_id,
                ServiceId:service_id,
                ProviderId: provider_id,
                start_time: bookingTimeStart,
                finish_time:  bookingTimeEnd,
                createdAt: new Date(),
                updatedAt: new Date(),
              }).then(function(newProvider){
                req.session.newProviderId = newProvider.dataValues.id;
                console.log('OKKKKK BOOKING');
                // return res.status(201).json(newProvider)

              }).catch(function(err){
                console.log('ERROR al crear BOOKINGS');
                console.log(err);
                return res.status(500).json(err)
              });

            }
          })
        }
      }



      return res.status(201).json('BOOKING Validated')
    } catch (error) {

      console.log('ERROR al crear BOOKINGS');
      console.log(error);
      return res.status(500).json(error)
    }
  },


  bookingValidator :  async(req, res) => {
    try {
      const {dataDays, appointment_duration, date_start } = req.query
      const errors = {};
      console.log((typeof date_start !== 'undefined'));
      (appointment_duration != '')? '' :errors.appointment_duration = 'Debes seleccionar la duracion de tus turnos';
      (date_start != '')? '' :errors.date_start = 'Debes seleccionar una fecha';

      if(JSON.stringify(errors) !== JSON.stringify({})){
        throw errors
      }

      return res.status(201).json('booking Validated')
    } catch (error) {
      return res.status(500).json(error)
    }
  },



}
