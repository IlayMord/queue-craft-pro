import { Header } from "@/components/layout/header";

export default function BusinessSchedule() {
  return (
    <div className="min-h-screen bg-background">
      <Header userType="business" businessName="מספרת דני" />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">לוח זמנים</h1>
        <p className="text-muted-foreground">ניהול לוח הזמנים יתווסף בקרוב.</p>
      </main>
    </div>
  );
}
