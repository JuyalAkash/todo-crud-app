import express from "express";
const router = express.Router();

// HOME ROUTER
router.get("/", (req, res) => {
  res.render("index", {
    title: "Welcome to ToDo Application",
    content: "This is a simple Todo application.",
  });
});

export default router;
