import { Header } from "@/components/layout/header";

export default function BusinessAppointments() {
  return (
    <div className="min-h-screen bg-background">
      <Header userType="business" businessName="מספרת דני" />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">ניהול תורים</h1>
        <p className="text-muted-foreground">עמוד זה בבנייה.</p>
      </main>
    </div>
  );
}
