const express_handlebars_sections = require('express-handlebars-sections');
const helpers = {};

helpers.section = express_handlebars_sections()


helpers.times = (n, block)=> {
  var accum = '';
  for(var i = 0; i < n; ++i)
      accum += block.fn(i);
  return accum;
}

helpers.for = (from, to, incr, block) => {

  var accum = 'from';
  for(var i = from; i <= to; i += incr)
      accum += block.fn(i);

  return accum;
}

helpers.reverse_for = (from, to, decrease, block) => {
  var accum = '';
    for(var i = from; i >= to; i -= decrease)
      accum += block.fn(i);

  return accum;
}


helpers.forLess = (n, decr, block) => {
  var accum = '';
  for(var i = new Date().getFullYear(); i > new Date().getFullYear()-n; i -= decr)
      accum += block.fn(i);
  return accum;

}

helpers.checkDate = (valueToCheck, typeOfDate, reference, output) => {

  var value = '';

  if(typeOfDate == 'd') {value = new Date(reference).getDate()+1}
  if(typeOfDate == 'm') {value = new Date(reference).getMonth()+1}
  if(typeOfDate == 'Y') {value = new Date(reference).getFullYear()+1}

  if (valueToCheck == value) {
    var response = output;
  }

  return response;
}

helpers.ifEquals = (val1, val2, result) => {

  if(val1 == val2){
    return result
  };
}


//Less than..
helpers.lt = function(a, b, context, options) {
  return (a < b)? a:false;
};

//Greater or Equeal than..
helpers.ge = function(a, b, options) {
  return (a >= b)? a: false;
};

//get json
helpers.json = function(context) {
  const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    };
  };
  (context)?context.password = null:' ';
  return JSON.stringify(context, getCircularReplacer());
};

//substr
helpers.substr = function(string, from, quantity) {
  return string.substr(from,quantity)
}

module.exports = helpers;
