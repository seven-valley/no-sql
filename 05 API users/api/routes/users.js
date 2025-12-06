import { Router } from "express";
import { ObjectId } from "mongodb";
import { getDB } from "../db.js";

const router = Router();

/**
 * GET /users
 */
router.get("/", async (req, res) => {
  const users = await getDB().collection("users").find().toArray();
  res.json(users);
});

/**
 * GET /users/:id
 */
router.get("/:id", async (req, res) => {
  try {
    const user = await getDB()
      .collection("users")
      .findOne({ _id: new ObjectId(req.params.id) });

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(400).json({ error: "Invalid ID" });
  }
});

/**
 * POST /users
 */
router.post("/", async (req, res) => {
  const result = await getDB().collection("users").insertOne(req.body);
  res.status(201).json(result);
});

/**
 * PUT /users/:id
 */
router.put("/:id", async (req, res) => {
  try {
    const result = await getDB().collection("users").findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body },
      { returnDocument: "after" }
    );

    if (!result.value) return res.status(404).json({ error: "User not found" });

    res.json(result.value);
  } catch (err) {
    res.status(400).json({ error: "Invalid ID" });
  }
});

/**
 * DELETE /users/:id
 */
router.delete("/:id", async (req, res) => {
  try {
    const result = await getDB()
      .collection("users")
      .deleteOne({ _id: new ObjectId(req.params.id) });

    if (result.deletedCount === 0)
      return res.status(404).json({ error: "User not found" });

    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: "Invalid ID" });
  }
});

export default router;