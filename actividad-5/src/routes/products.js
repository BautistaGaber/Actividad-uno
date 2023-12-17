import { Router } from "express";
import productModel from "../dao/mongodb/models/product.model.js";

const router = Router();

router.get("/", async (req, res) => {
  const products = await productModel.find();
  const limit = req.query.limit;

  if (!limit || limit > products.length || limit <= 0) {
    res.json({ products: products });
  } else {
    res.json({ products: products.slice(0, limit) });
  }
});

router.get("/:pid", async (req, res) => {
  const productsId = await productModel.find(
    (product) => product.id === req.params.pid
  );
  const product = await productModel.findById(productsId);

  if (!product) {
    res.json({ error: "producto no encontrado" });
  } else {
    res.json({ product: product });
  }
});

router.post("/", async (req, res) => {
  const prod = req.body;
  const products = await productModel.create(prod);
  res.json(products);
});

router.put("/:pid", async (req, res) => {
  const productId = req.params.pid;
  const prod = req.body;
  const products = await productModel.findByIdAndUpdate(productId, prod);
  res.send({
    status: "success",
    products: products,
  });
});

router.delete("/:pid", async (req, res) => {
  const productId = req.params.pid;
  const products = await productModel.findByIdAndDelete(productId);
  res.json(products);
});

export { router as productsRouter };
