const Express = require("express");
const BookControllr = require("../Controllers/BookControllr.cjs");
const authMiddleware = require("../middlewares/auth.cjs");
const router = Express.Router(); // Routes

// -----------------------------------------------------------------------------------------------------------
router.post("/api/book/", authMiddleware, BookControllr.addNewBook); // Admin only
// -----------------------------------------------------------------------------------------------------------
router.get("/api/book/", authMiddleware, BookControllr.GetAllBook);
router.get("/api/book/:id", authMiddleware, BookControllr.GetoneBook);
// -----------------------------------------------------------------------------------------------------------
router.put("/api/book/:id", authMiddleware, BookControllr.UpdateBook); // Admin only
router.delete("/api/book/:id", authMiddleware, BookControllr.DeleteBook); // Admin only

module.exports = router; //  Exports
