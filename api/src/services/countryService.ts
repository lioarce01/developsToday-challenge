import axios, { AxiosError } from "axios";

interface Country {
  countryCode: string;
  name: string;
}

interface PopulationCount {
  year: number;
  value: number;
}

interface CountryPopulation {
  country: string;
  code: string;
  iso3: string;
  populationCounts: PopulationCount[];
}

interface CountryFlag {
  name: string;
  flag: string;
  iso2: string;
  iso3: string;
}

interface CountryInfo {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: any[];
  population: PopulationCount[];
  flag: string | null;
}

export class CountryService {
  private dateNagerBaseUrl: string;
  private countriesNowBaseUrl: string;

  constructor() {
    this.dateNagerBaseUrl = "https://date.nager.at/api/v3";
    this.countriesNowBaseUrl = "https://countriesnow.space/api/v0.1";
  }

  async getAvailableCountries(): Promise<Country[]> {
    try {
      const response = await axios.get<Country[]>(
        `${this.dateNagerBaseUrl}/AvailableCountries`
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(
          error.response?.data?.message || "Failed to fetch available countries"
        );
      }
      throw new Error("Failed to fetch available countries");
    }
  }

  async getCountryInfo(countryCode: string) {
    try {
      console.log(`Fetching info for country: ${countryCode}`);

      console.log("Calling DateNager API...");
      const countryInfoResponse = await axios.get(
        `${this.dateNagerBaseUrl}/CountryInfo/${countryCode}`
      );
      console.log("DateNager API response:", countryInfoResponse.data);

      console.log("Calling CountriesNow Population API...");
      const populationResponse = await axios.post<any>(
        `${this.countriesNowBaseUrl}/countries/population`,
        {
          country: countryInfoResponse.data.commonName,
        }
      );
      console.log("Population data received:", populationResponse.data);

      console.log("Calling CountriesNow Flag API...");
      const flagResponse = await axios.get(
        `${this.countriesNowBaseUrl}/countries/flag/images`
      );
      console.log("Flag data received");

      const countryFlag = flagResponse.data.data.find(
        (country: any) =>
          country.iso2 === countryCode ||
          country.iso3 === countryCode ||
          country.name.toLowerCase() ===
            countryInfoResponse.data.commonName.toLowerCase()
      );

      const result = {
        ...countryInfoResponse.data,
        population: populationResponse.data.data?.populationCounts || [],
        flag: countryFlag?.flag || null,
      };

      console.log("Final result:", result);
      return result;
    } catch (error) {
      console.error("Error details:", error);

      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.msg ||
          error.response?.data?.message ||
          `Failed to fetch country info for ${countryCode}. Status: ${error.response?.status}`;
        throw new Error(errorMessage);
      }

      if (error instanceof Error) {
        throw new Error(`Error processing country data: ${error.message}`);
      }

      throw new Error(`Failed to fetch country info for ${countryCode}`);
    }
  }
}
