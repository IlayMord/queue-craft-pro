import { useState } from "react";
import { Header } from "@/components/layout/header";
import { AppointmentCard } from "@/components/ui/appointment-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, CheckCircle, X } from "lucide-react";

// Mock data - in real app this would come from a database
const mockAppointments = [
  {
    id: "1",
    businessName: "מספרת דני",
    serviceName: "גזיזה וסטיילינג",
    date: "היום",
    time: "14:30",
    duration: 45,
    address: "רחוב הרצל 15, תל אביב",
    status: "confirmed" as const,
    type: "customer" as const
  },
  {
    id: "2", 
    businessName: "קליניקת שיניים ד״ר כהן",
    serviceName: "ניקוי שיניים",
    date: "מחר",
    time: "10:00",
    duration: 30,
    address: "שדרות רוטשילד 22, תל אביב",
    status: "confirmed" as const,
    type: "customer" as const
  },
  {
    id: "3",
    businessName: "מוסך אברהם", 
    serviceName: "טיפול תקופתי",
    date: "15/12/2024",
    time: "09:00",
    duration: 60,
    address: "רחוב הנביאים 8, ירושלים",
    status: "pending" as const,
    type: "customer" as const  
  },
  {
    id: "4",
    businessName: "מספרת דני",
    serviceName: "צביעת שיער",
    date: "10/12/2024", 
    time: "16:00",
    duration: 90,
    address: "רחוב הרצל 15, תל אביב",
    status: "completed" as const,
    type: "customer" as const
  },
  {
    id: "5",
    businessName: "קליניקת שיניים ד״ר כהן",
    serviceName: "בדיקת שגרה",
    date: "05/12/2024",
    time: "11:30", 
    duration: 45,
    address: "שדרות רוטשילד 22, תל אביב",
    status: "cancelled" as const,
    type: "customer" as const
  }
];

export default function MyAppointments() {
  const [appointments] = useState(mockAppointments);

  const upcomingAppointments = appointments.filter(
    apt => apt.status === "confirmed" || apt.status === "pending"
  );
  const pastAppointments = appointments.filter(
    apt => apt.status === "completed" || apt.status === "cancelled"
  );

  const handleAppointmentAction = (action: string, id: string) => {
    console.log(`Action: ${action} for appointment: ${id}`);
    // In real app, this would update the appointment status
  };

  const getStatusStats = () => {
    const confirmed = appointments.filter(apt => apt.status === "confirmed").length;
    const pending = appointments.filter(apt => apt.status === "pending").length;
    const completed = appointments.filter(apt => apt.status === "completed").length;
    
    return { confirmed, pending, completed };
  };

  const stats = getStatusStats();

  return (
    <div className="min-h-screen bg-background">
      <Header userType="user" userName="יוסי לוי" />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold mb-4">התורים שלי</h1>
          <p className="text-lg text-muted-foreground">
            נהל את כל התורים שלך במקום אחד
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="hover-lift animate-slide-up">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                תורים מאושרים
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{stats.confirmed}</div>
            </CardContent>
          </Card>

          <Card className="hover-lift animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                ממתינים לאישור
              </CardTitle>
              <Clock className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">{stats.pending}</div>
            </CardContent>
          </Card>

          <Card className="hover-lift animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                תורים שבוצעו
              </CardTitle>
              <Calendar className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.completed}</div>
            </CardContent>
          </Card>
        </div>

        {/* Appointments Tabs */}
        <div className="max-w-4xl mx-auto animate-fade-in">
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="upcoming" className="gap-2">
                <Calendar className="h-4 w-4" />
                תורים קרובים ({upcomingAppointments.length})
              </TabsTrigger>
              <TabsTrigger value="past" className="gap-2">
                <Clock className="h-4 w-4" />
                תורים קודמים ({pastAppointments.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-6">
              {upcomingAppointments.length > 0 ? (
                upcomingAppointments.map((appointment, index) => (
                  <div 
                    key={appointment.id} 
                    className="animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <AppointmentCard
                      {...appointment}
                      onAction={handleAppointmentAction}
                    />
                  </div>
                ))
              ) : (
                <Card className="text-center py-12">
                  <CardContent>
                    <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">אין תורים קרובים</h3>
                    <p className="text-muted-foreground mb-6">
                      נראה שאין לך תורים מתוכננים. מה דעתך לתזמן תור חדש?
                    </p>
                    <Button className="bg-gradient-primary hover:opacity-90" asChild>
                      <Link to="/search">חפש עסקים</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="past" className="space-y-6">
              {pastAppointments.length > 0 ? (
                pastAppointments.map((appointment, index) => (
                  <div 
                    key={appointment.id} 
                    className="animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <AppointmentCard
                      {...appointment}
                      onAction={handleAppointmentAction}
                    />
                  </div>
                ))
              ) : (
                <Card className="text-center py-12">
                  <CardContent>
                    <Clock className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">אין תורים קודמים</h3>
                    <p className="text-muted-foreground">
                      כשתבצע תורים, הם יופיעו כאן
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Quick Actions */}
        <div className="max-w-md mx-auto mt-12 animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">פעולות מהירות</CardTitle>
              <CardDescription className="text-center">
                ניהול התורים שלך
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-gradient-primary hover:opacity-90" asChild>
                <Link to="/search">תזמן תור חדש</Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/notifications">הגדרות התראות</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}