import express from "express";
import { PrismaClient } from "@prisma/client";
import { identifyContact } from "./contactService";

const app = express();
const prisma = new PrismaClient();

app.use(express.json()); // Ensure JSON middleware is enabled

// Ensure identifyContact is a valid function
app.post("/identify", async (req, res) => {
  try {
    console.log("🛠 Full Request Body:", req.body); // Debugging line

    const { email, phoneNumber } = req.body;

    if (!email && !phoneNumber) {
      return res.status(400).json({ error: "Email or Phone Number is required" });
    }

    const result = await identifyContact({ email, phoneNumber });

    res.json(result);
  } catch (error) {
    console.error("❌ Error in /identify:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
