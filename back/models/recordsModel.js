class Record {
  constructor(
    animalSpecies,
    animalName,
    animalAge,
    animalWeight,
    animalHealth,
    animalHabitat,
    animalBehavior,
    animalDiet,
    observations,
    animalPictures,
    modificationDate,
    userId
  ) {
    this.animalSpecies = animalSpecies;
    this.animalName = animalName;
    this.animalAge = animalAge;
    this.animalWeight = animalWeight;
    this.animalHealth = animalHealth;
    this.animalHabitat = animalHabitat;
    this.animalBehavior = animalBehavior;
    this.animalDiet = animalDiet;
    this.observations = observations;
    this.animalPictures = animalPictures;
    this.modificationDate = modificationDate;
    this.userId = userId;
  }
}

const db = require("../config/db");

const addRecord = (
  animalSpecies,
  animalName,
  animalAge,
  animalWeight,
  animalHealth,
  animalHabitat,
  animalBehavior,
  animalDiet,
  observations,
  animalPictures,
  modificationDate,
  userId
) => {
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO animalRecords (animalSpecies, animalName, animalAge, animalWeight, animalHealth, animalHabitat, animalBehavior, animalDiet, observations, animalPictures, modificationDate, userId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(
      query,
      [
        animalSpecies,
        animalName,
        animalAge,
        animalWeight,
        animalHealth,
        animalHabitat,
        animalBehavior,
        animalDiet,
        observations,
        animalPictures,
        modificationDate,
        userId,
      ],
      (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      }
    );
  });
};

const getRecords = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM animalrecords";
    db.query(query, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

const getRecordsByAnimal = (animalName) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM animalRecords WHERE animalName = ?";
    db.query(query, [animalName], (err, results) => {
      if (err) {
        return reject(err);
      }
      if (results.length > 0) {
        resolve(results[0]);
      } else {
        resolve(null);
      }
    });
  });
};

const getAnimalByUserId = (userId) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM animalRecords WHERE userId = ?";
    db.query(query, [userId], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

const deleteRecord = (id) => {
  return new Promise((resolve, reject) => {
    const query = "DELETE FROM animalRecords WHERE id = ?";
    db.query(query, [id], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

const getRecordImages = (id) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT animalPictures FROM animalRecords WHERE id = ?";
    db.query(query, [id], (err, results) => {
      if (err) {
        return reject(err);
      }
      if (results.length > 0) {
        resolve(results[0].animalPictures);
      } else {
        resolve(null);
      }
    });
  });
};

const updateRecord = (id, updatedFields) => {
  return new Promise((resolve, reject) => {
    const fields = [];
    const values = [];

    for (const [key, value] of Object.entries(updatedFields)) {
      fields.push(`${key} = ?`);
      values.push(value);
    }

    const query = `UPDATE animalRecords SET ${fields.join(", ")} WHERE id = ?`;
    values.push(id);

    db.query(query, values, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

module.exports = {
  addRecord,
  getRecords,
  getRecordsByAnimal,
  getAnimalByUserId,
  deleteRecord,
  getRecordImages,
  updateRecord,
};
