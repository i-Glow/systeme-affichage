const router = require("express").Router();

router.get("/api", (_, res) => res.send("API ENDPOINTS"));

module.exports = router;
