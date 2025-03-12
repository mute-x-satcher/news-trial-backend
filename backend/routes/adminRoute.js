const express = require("express");
const router = express.Router();
const {getPaper,uploadPaper,deletePaper,updatePaper} = require("../controllers/adminController");
const {noval_middleware,noval_url_middleware} = require("../middleware/Novelty");

router.get("/getpaper",getPaper);
router.post("/upload",noval_middleware,noval_url_middleware,uploadPaper);
router.put("/update",noval_middleware,noval_url_middleware,updatePaper);
router.delete("/remove",deletePaper);


module.exports = router;