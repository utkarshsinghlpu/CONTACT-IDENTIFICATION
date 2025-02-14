"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const contactService_1 = require("./contactService");
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
app.use(express_1.default.json()); // Ensure JSON middleware is enabled
// Ensure identifyContact is a valid function
app.post("/identify", async (req, res) => {
    try {
        console.log("🛠 Full Request Body:", req.body); // Debugging line
        const { email, phoneNumber } = req.body;
        if (!email && !phoneNumber) {
            return res.status(400).json({ error: "Email or Phone Number is required" });
        }
        const result = await (0, contactService_1.identifyContact)({ email, phoneNumber });
        res.json(result);
    }
    catch (error) {
        console.error("❌ Error in /identify:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
