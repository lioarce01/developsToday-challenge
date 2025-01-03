"use client";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import PopulationChart from "./PopulationChart";

interface BorderCountry {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
}

interface CountryDetailsProps {
  country: {
    commonName: string;
    officialName: string;
    countryCode: string;
    region: string;
    borders: BorderCountry[];
    population: Array<{
      year: number;
      value: number;
    }>;
    flag: string;
  };
}

export default function CountryDetails({ country }: CountryDetailsProps) {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row items-center gap-8">
        {country.flag && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={country.flag}
            alt={`${country.commonName} flag`}
            className="w-full md:w-1/3 rounded-lg shadow-lg"
          />
        )}
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-4">{country.commonName}</h1>
          <p className="text-xl text-muted-foreground">
            {country.officialName}
          </p>
          <p className="text-lg text-muted-foreground">
            Region: {country.region}
          </p>
          <Separator className="my-4" />
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Border Countries</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {country.borders?.map((border) => (
                <Link
                  href={`/country/${border.countryCode}`}
                  key={border.countryCode}
                >
                  <Card className="p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                    <p className="text-center font-medium">
                      {border.commonName}
                    </p>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Population Over Time</h2>
        <div className="h-[400px]">
          <PopulationChart data={country.population} />
        </div>
      </Card>
    </div>
  );
}
