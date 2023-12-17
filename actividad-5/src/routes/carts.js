import { Router } from "express";
import cartModel from "../dao/mongodb/models/cart.model.js";
import productModel from "../dao/mongodb/models/product.model.js";

const router = Router();

router.get("/", async (req, res) => {
  const cart = await cartModel.find();
  res.json(cart);
});

router.get("/:cid", async (req, res) => {
  const cartId = req.params.cid;
  const cart = await cartModel.findById(cartId);
  res.json(cart);
});

router.post("/", async (req, res) => {
  const cart = req.body;
  const newCart = await cartModel.create(cart);
  res.json(newCart);
});

router.post("/:cid/products/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cart = await cartModel.findById(cid);
    const product = await productModel.findById(pid);
    if (!cart) {
      res.status(404).json({ message: "Cart not found" });
    } else if (!product) {
      res.status(404).json({ message: "Product not found" });
    }
    
    const existingProduct = cart.products.find((p) => p.product == pid);
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cart.products.push({ product: pid, quantity: 1 });
    }
    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export { router as cartsRouter };
