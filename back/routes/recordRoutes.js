const express = require("express");
const {
  addRecord,
  getRecords,
  getRecordsByAnimal,
  getAnimalByUserId,
  deleteRecord,
  getRecordImages,
  updateRecord,
} = require("../models/recordsModel");
const { DeleteObjectCommand } = require("@aws-sdk/client-s3");
const s3 = require("../config/s3-config");
const { URL } = require("url");

const router = express.Router();

router.get("/recordslist", async (req, res) => {
  try {
    const records = await getRecords();
    res.json(records);
  } catch (err) {
    console.error("Erro ao buscar os registros:", err);
    res
      .status(500)
      .json({ message: "Erro ao buscar os Registros", error: err });
  }
});

router.get("/recordsByUser/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const records = await getAnimalByUserId(userId);

    if (!records) {
      return res
        .status(404)
        .json({ message: "Nenhum registro encontrado para esse usuário." });
    }

    res.json(records);
  } catch (err) {
    console.error("Erro ao buscar registros por userId:", err);
    res.status(500).json({ message: "Erro ao buscar registros", error: err });
  }
});

router.post("/registerRecords", async (req, res) => {
  const {
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
  } = req.body;

  if (
    !animalSpecies ||
    !animalName ||
    !animalAge ||
    !animalWeight ||
    !animalHealth ||
    !animalHabitat ||
    !animalBehavior ||
    !animalDiet ||
    !observations ||
    !animalPictures ||
    !modificationDate ||
    !userId
  ) {
    return res.status(400).json({ message: "Preencha todos os campos." });
  }

  try {
    const existingAnimal = await getRecordsByAnimal(animalName);

    if (existingAnimal) {
      return res
        .status(409)
        .json({ message: "O nome desse animal já está registrado!" });
    }

    const result = await addRecord(
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
    );

    res.status(201).json({
      message: "Registro inserido com sucesso!",
      recordId: result.insertId,
    });
  } catch (err) {
    console.error("Erro ao criar registro:", err);
    res.status(500).json({ message: "Erro ao criar o registro", error: err });
  }
});

router.delete("/deleteRecord/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const animalPictures = await getRecordImages(id);

    if (!animalPictures) {
      return res.status(404).json({ message: "Registro não encontrado." });
    }

    const imageUrls = animalPictures.split(",").map((url) => url.trim());

    if (imageUrls.length > 0) {
      const deletePromises = imageUrls.map(async (url) => {
        try {
          const parsedUrl = new URL(url);
          const encodedKey = parsedUrl.pathname.substring(1);
          const key = decodeURIComponent(encodedKey);

          const params = {
            Bucket: "animal-images-capizoo",
            Key: key,
          };
          return await s3.send(new DeleteObjectCommand(params));
        } catch (error) {
          console.error(`Erro ao excluir imagem ${url}:`, error);
          throw error;
        }
      });

      try {
        await Promise.all(deletePromises);
      } catch (error) {
        console.error("Erro ao excluir uma ou mais imagens:", error);
        return res
          .status(500)
          .json({ message: "Erro ao excluir uma ou mais imagens.", error });
      }
    }

    const result = await deleteRecord(id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Registro não encontrado." });
    }

    res.json({ message: "Registro e todas as imagens deletados com sucesso." });
  } catch (err) {
    console.error("Erro ao deletar registro ou imagens:", err);
    res.status(500).json({ message: "Erro ao deletar registro", error: err });
  }
});

router.put("/updateRecord/:id", async (req, res) => {
  const { id } = req.params;
  const updatedFields = req.body;

  if (Object.keys(updatedFields).length === 0) {
    return res.status(400).json({ message: "Nenhum campo para atualizar." });
  }

  try {
    const result = await updateRecord(id, updatedFields);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Registro não encontrado." });
    }

    res.json({ message: "Registro atualizado com sucesso." });
  } catch (err) {
    console.error("Erro ao atualizar o registro:", err);
    res
      .status(500)
      .json({ message: "Erro ao atualizar o registro", error: err });
  }
});

module.exports = router;
