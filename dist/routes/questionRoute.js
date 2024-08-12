"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const QuestionController_1 = require("../controllers/QuestionController");
const router = (0, express_1.Router)();
router.get('/generate-question', QuestionController_1.QuestionController.generateQuestion);
exports.default = router;
