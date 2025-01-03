import CountryList from '@/components/CountryList';

export default function Home() {
  return (
    <main className="min-h-screen bg-background p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Countries Information</h1>
        <CountryList />
      </div>
    </main>
  );
}