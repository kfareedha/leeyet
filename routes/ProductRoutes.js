const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");
const verifyJWT = require("../middleware/verifyJWT");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/products");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(
      null,
      `${Math.floor(Math.random() * 1000)}${
        file.fieldname
      }-${Date.now()}.${ext}`
    );
  },
});
const upload = multer({ storage });

router
  .route("/")
  .get(verifyJWT, productController.getAllProducts)
  .post(verifyJWT, upload.array("image", 5), productController.createProducts);
router
  .route("/:id")
  .get(verifyJWT, productController.getAProduct)
  .delete(verifyJWT, productController.deleteAProduct)
  .put(verifyJWT, upload.array("image", 5), productController.updateProduct);
module.exports = router;
