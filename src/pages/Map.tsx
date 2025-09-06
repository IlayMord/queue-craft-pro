import { Header } from "@/components/layout/header";

export default function MapPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">מפה</h1>
        <p className="text-muted-foreground">תצוגת המפה תתווסף בקרוב.</p>
      </main>
    </div>
  );
}
