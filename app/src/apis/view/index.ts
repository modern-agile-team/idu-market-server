import * as express from "express";

const router: express.Router = express.Router();

router.get("/reset/password/:token", (req, res) => {
  res.render("reset-password");
});

export default router;
