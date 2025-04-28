"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const comments_controller_1 = require("../controllers/comments.controller");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticate);
router.post("/create", comments_controller_1.create);
exports.default = router;
