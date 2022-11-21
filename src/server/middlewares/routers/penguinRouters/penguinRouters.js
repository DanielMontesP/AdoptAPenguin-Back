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
  searchPenguin,
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

penguinRouters.put(
  "/:idPenguin",
  upload.single("image"),
  firebaseUploads,
  editPenguin
);

penguinRouters.get("/", getPenguins);
penguinRouters.get("/favs", getFavsPenguins);
penguinRouters.get("/likes", getLikesPenguins);
penguinRouters.get("/:idPenguin", validate(penguinSchema), getPenguin);
penguinRouters.get("/search/:stringToSearch", searchPenguin);

penguinRouters.delete("/:idPenguin", deletePenguin);

module.exports = penguinRouters;
