require("dotenv").config();
const express = require("express");
const { validate } = require("express-validation");
const multer = require("multer");
const path = require("path");
const {
  getPenguins,
  deletePenguin,
  createPenguin,
  getFavsPenguins,
  getLikesPenguins,
  getPenguin,
  editPenguin,
} = require("../../../controllers/penguinControllers/penguinControllers");
const { penguinSchema } = require("../../../schemas/penguinSchema");

const firebaseUploads = require("../../firebase/firebaseUploads");

const penguinRouters = express.Router();

const upload = multer({
  dest: path.join("uploads", "images"),
  limits: {
    fieldSize: 8000000,
  },
});

penguinRouters.post(
  "/create",
  upload.single("image"),
  firebaseUploads,
  createPenguin
);

penguinRouters.get("/", getPenguins);
penguinRouters.delete("/:idPenguin", deletePenguin);
penguinRouters.get("/favs", getFavsPenguins);
penguinRouters.get("/likes", getLikesPenguins);
penguinRouters.get("/:idPenguin", validate(penguinSchema), getPenguin);
penguinRouters.put("/:idPenguin", editPenguin);

module.exports = penguinRouters;
