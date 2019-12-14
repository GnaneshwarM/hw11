const db = require('../tourserver/tourDBRef');
const tours = require('./tours.json');

async function initializeTours() {
  try {
    let numberRemoved = await db.remove({}, { multi: true });
    console.log("Removed tours : " + numberRemoved);

    let addedTour = await db.insert(tours);
    console.log("Added" + addedTour + "tours");
  }
  catch (err) {
    console.log(err);
  }
}

initializeTours();
