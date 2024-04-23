const Express = require("express");
const userControllr = require("../Controllers/userControllr.cjs");
const router = Express.Router(); // Routes

router.get("/api/user/register", userControllr.GetAllUser); //
router.get("/api/user/register/:id", userControllr.GetOneUser); //
router.post("/api/user/register", userControllr.register); //
// ...........................................................................................................
router.get("/api/user/login", userControllr.login); //
router.post("/api/user/login", userControllr.login); //

module.exports = router; //  Exports
