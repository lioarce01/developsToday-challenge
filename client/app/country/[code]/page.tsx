"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CountryDetails from "@/components/CountryDetails";
import { Loader2 } from "lucide-react";

interface CountryData {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: Array<{
    commonName: string;
    officialName: string;
    countryCode: string;
    region: string;
  }>;
  population: Array<{
    year: number;
    value: number;
  }>;
  flag: string;
}

export default function CountryPage() {
  const { code } = useParams();
  const [countryData, setCountryData] = useState<CountryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/countries/${code}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch country data");
        }
        const data = await response.json();
        setCountryData(data);
      } catch (error) {
        console.error("Error fetching country data:", error);
        setError("Failed to load country information");
      } finally {
        setLoading(false);
      }
    };

    fetchCountryData();
  }, [code]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="container mx-auto">
        {countryData && <CountryDetails country={countryData} />}
      </div>
    </main>
  );
}
