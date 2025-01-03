import express, { Request, Response } from "express";
import { CountryService } from "../services/countryService";

const router = express.Router();
const countryService = new CountryService();

router.get("/", async (req: Request, res: Response) => {
  try {
    const countries = await countryService.getAvailableCountries();
    res.json(countries);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
});

router.get("/:countryCode", async (req: Request, res: Response) => {
  try {
    const { countryCode } = req.params;
    const countryInfo = await countryService.getCountryInfo(countryCode);
    res.json(countryInfo);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
});

export default router;
