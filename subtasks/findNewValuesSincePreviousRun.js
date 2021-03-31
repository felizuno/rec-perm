const fs = require('fs');

module.exports = async (currentRunOutput, CONFIG) => {
  const previousRunOutput = fs.existsSync(`./${CONFIG.OUTPUT_FILE_NAME}`) 
  ? JSON.parse(fs.readFileSync(`./${CONFIG.OUTPUT_FILE_NAME}`))
  : {};
  
  const newAvailability = {};

  // For every river in the current output, check to see if its availability
  // matches the previous run
  Object.keys(currentRunOutput).forEach(river => {
    // what if we didn't have anything for this river before?
    if (!previousRunOutput[river]) {
      // then all the availability we found for that river is new availability
      newAvailability[river] = currentRunOutput[river];
    } else {
      // ok, so we had this river, but did we have anything for this month?
      Object.keys(currentRunOutput[river]).forEach(month => {
        // if we didn't have anything for this month before
        if (!previousRunOutput[river][month]) {
          // then all the availability we found for that month is new availability
          newAvailability[river] = newAvailability[river] || {};
          newAvailability[river][month] = currentRunOutput[river][month];
        } else {
          // We had the river and the month before, but still need to check for new days
          currentRunOutput[river][month].forEach(dayNumber => {
            if (!previousRunOutput[river][month].includes(dayNumber)) {
              newAvailability[river] = newAvailability[river] || {};
              newAvailability[river][month] = newAvailability[river][month] || [];
              newAvailability[river][month].push(dayNumber);
            }
          })

        }
      });
    }
  });

  return newAvailability;
};
