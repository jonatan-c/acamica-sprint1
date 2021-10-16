const { Router } = require("express");
const router = Router();
const { auth } = require("../middlewares/users/auth.middlewares");
const {
  autenticarUsuario,
  usuarioAutenticado,
} = require("../controllers/auth.controller");

//

router.post("/auth", autenticarUsuario);
router.get("/auth", auth, usuarioAutenticado);
module.exports = router;
