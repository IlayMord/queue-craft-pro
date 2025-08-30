import { Header } from "@/components/layout/header";
import { StatsCard } from "@/components/ui/stats-card";
import { AppointmentCard } from "@/components/ui/appointment-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Clock, TrendingUp, Plus, Settings } from "lucide-react";

// Mock data - in real app this would come from a database
const mockStats = [
  {
    title: "תורים השבוע",
    value: 47,
    description: "8 תורים נוספים השבוע",
    icon: Calendar,
    trend: { value: 20, isPositive: true }
  },
  {
    title: "לקוחות פעילים",
    value: 156,
    description: "בסך הכל רשומים",
    icon: Users,  
    trend: { value: 12, isPositive: true }
  },
  {
    title: "ממוצע המתנה",
    value: "12 דק׳",
    description: "זמן המתנה ממוצע",
    icon: Clock,
    trend: { value: 8, isPositive: false }
  },
  {
    title: "הכנסות חודשיות",
    value: "₪8,500",
    description: "החודש הנוכחי",
    icon: TrendingUp,
    trend: { value: 15, isPositive: true }
  }
];

const mockTodayAppointments = [
  {
    id: "1",
    serviceName: "גזיזה וסטיילינג",
    customerName: "יוסי לוי",
    customerPhone: "050-1234567",
    date: "היום",
    time: "14:30",
    duration: 45,
    status: "confirmed" as const,
    businessName: "מספרת דני",
    type: "business" as const
  },
  {
    id: "2", 
    serviceName: "צביעת שורשים",
    customerName: "שרה כהן",
    customerPhone: "052-9876543", 
    date: "היום",
    time: "16:00",
    duration: 90,
    status: "pending" as const,
    businessName: "מספרת דני",
    type: "business" as const
  }
];

export default function BusinessDashboard() {
  const handleAppointmentAction = (action: string, id: string) => {
    console.log(`Action: ${action} for appointment: ${id}`);
    // In real app, this would update the appointment status
  };

  return (
    <div className="min-h-screen bg-background">
      <Header userType="business" businessName="מספרת דני" />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold">דשבורד ניהול</h1>
            <p className="text-lg text-muted-foreground">
              סקירה כללית של העסק שלך
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Settings className="h-4 w-4" />
              הגדרות
            </Button>
            <Button className="gap-2 bg-gradient-primary hover:opacity-90">
              <Plus className="h-4 w-4" />
              תור חדש
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {mockStats.map((stat, index) => (
            <div 
              key={stat.title}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <StatsCard {...stat} />
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Today's Appointments */}
          <div className="lg:col-span-2">
            <Card className="animate-fade-in">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">תורים היום</CardTitle>
                    <CardDescription>
                      {mockTodayAppointments.length} תורים מתוכננים
                    </CardDescription>
                  </div>
                  <Button size="sm" variant="outline">
                    הצג הכל
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockTodayAppointments.map((appointment, index) => (
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
                  ))}
                  {mockTodayAppointments.length === 0 && (
                    <div className="text-center py-8">
                      <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">אין תורים מתוכננים להיום</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & Schedule */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <CardHeader>
                <CardTitle>פעולות מהירות</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start gap-2" variant="outline">
                  <Calendar className="h-4 w-4" />
                  עריכת לוח זמנים
                </Button>
                <Button className="w-full justify-start gap-2" variant="outline">
                  <Users className="h-4 w-4" />
                  ניהול לקוחות
                </Button>
                <Button className="w-full justify-start gap-2" variant="outline">
                  <Settings className="h-4 w-4" />
                  הגדרות עסק
                </Button>
                <Button className="w-full justify-start gap-2" variant="outline">
                  <TrendingUp className="h-4 w-4" />
                  דוחות
                </Button>
              </CardContent>
            </Card>

            {/* Schedule Overview */}
            <Card className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <CardHeader>
                <CardTitle>השבוע הקרוב</CardTitle>
                <CardDescription>זמנים פנויים</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { day: "ראשון", slots: 8 },
                    { day: "שני", slots: 12 },
                    { day: "שלישי", slots: 6 },
                    { day: "רביעי", slots: 10 },
                    { day: "חמישי", slots: 4 }
                  ].map((item, index) => (
                    <div key={item.day} className="flex justify-between items-center">
                      <span className="font-medium">{item.day}</span>
                      <span className="text-sm text-muted-foreground">
                        {item.slots} זמנים פנויים
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}