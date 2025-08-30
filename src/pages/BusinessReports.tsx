import { useState } from "react";
import { Header } from "@/components/layout/header";
import { StatsCard } from "@/components/ui/stats-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, TrendingUp, Users, DollarSign, Clock, Download, Filter, BarChart3 } from "lucide-react";

// Mock data for reports
const mockReportsData = {
  overview: {
    thisMonth: {
      appointments: 94,
      revenue: 12500,
      newClients: 23,
      avgRating: 4.8,
      trends: {
        appointments: 15,
        revenue: 22,
        clients: 8,
        rating: 2
      }
    }
  },
  weeklyData: [
    { week: "שבוע 1", appointments: 18, revenue: 2800, clients: 5 },
    { week: "שבוע 2", appointments: 22, revenue: 3200, clients: 7 },
    { week: "שבוע 3", appointments: 25, revenue: 3800, clients: 6 },
    { week: "שבוע 4", appointments: 29, revenue: 2700, clients: 5 }
  ],
  topServices: [
    { name: "גזיזה וסטיילינג", bookings: 34, revenue: 4080 },
    { name: "צביעת שיער", bookings: 18, revenue: 4500 },
    { name: "פן וקשרים", bookings: 22, revenue: 3960 },
    { name: "גזיזה רגילה", bookings: 20, revenue: 1600 }
  ],
  peakHours: [
    { time: "09:00-10:00", bookings: 12 },
    { time: "10:00-11:00", bookings: 18 },
    { time: "11:00-12:00", bookings: 22 },
    { time: "14:00-15:00", bookings: 25 },
    { time: "15:00-16:00", bookings: 19 },
    { time: "16:00-17:00", bookings: 16 }
  ],
  clientStats: {
    returning: 67,
    new: 23,
    avgAge: 32,
    genderSplit: { male: 45, female: 55 }
  }
};

export default function BusinessReports() {
  const [selectedPeriod, setSelectedPeriod] = useState("thisMonth");
  const [reportType, setReportType] = useState("overview");

  const { overview } = mockReportsData;

  const exportReport = () => {
    // In real app, this would generate and download a report
    console.log("Exporting report...");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header userType="business" businessName="מספרת דני" />
      
      <main className="container mx-auto px-4 py-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 animate-fade-in">
            <div>
              <h1 className="text-3xl font-bold mb-2">דוחות ואנליטיקות</h1>
              <p className="text-lg text-muted-foreground">סקירה מפורטת של ביצועי העסק</p>
            </div>
            
            <div className="flex gap-3 mt-4 md:mt-0">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="thisWeek">השבוע</SelectItem>
                  <SelectItem value="thisMonth">החודש</SelectItem>
                  <SelectItem value="lastMonth">החודש הקודם</SelectItem>
                  <SelectItem value="thisYear">השנה</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={exportReport} className="gap-2">
                <Download className="h-4 w-4" />
                ייצא דוח
              </Button>
            </div>
          </div>

          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="תורים החודש"
              value={overview.thisMonth.appointments}
              description="סה״כ תורים שבוצעו"
              icon={Calendar}
              trend={{ value: overview.thisMonth.trends.appointments, isPositive: true }}
              className="animate-slide-up"
            />
            <StatsCard
              title="הכנסות"
              value={`₪${overview.thisMonth.revenue.toLocaleString()}`}
              description="הכנסות החודש"
              icon={DollarSign}
              trend={{ value: overview.thisMonth.trends.revenue, isPositive: true }}
              className="animate-slide-up"
            />
            <StatsCard
              title="לקוחות חדשים"
              value={overview.thisMonth.newClients}
              description="לקוחות חדשים החודש"
              icon={Users}
              trend={{ value: overview.thisMonth.trends.clients, isPositive: true }}
              className="animate-slide-up"
            />
            <StatsCard
              title="דירוג ממוצע"
              value={overview.thisMonth.avgRating}
              description="דירוג לקוחות"
              icon={TrendingUp}
              trend={{ value: overview.thisMonth.trends.rating, isPositive: true }}
              className="animate-slide-up"
            />
          </div>

          <Tabs defaultValue="performance" className="animate-fade-in">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="performance">ביצועים</TabsTrigger>
              <TabsTrigger value="services">שירותים</TabsTrigger>
              <TabsTrigger value="clients">לקוחות</TabsTrigger>
              <TabsTrigger value="insights">תובנות</TabsTrigger>
            </TabsList>

            {/* Performance Tab */}
            <TabsContent value="performance" className="space-y-6">
              {/* Weekly Performance */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    ביצועים שבועיים
                  </CardTitle>
                  <CardDescription>מעקב אחר התקדמות העסק לאורך החודש</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockReportsData.weeklyData.map((week, index) => (
                      <div key={week.week} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div className="text-right flex-1">
                          <h3 className="font-medium">{week.week}</h3>
                          <div className="flex gap-6 mt-1 justify-end">
                            <span className="text-sm text-muted-foreground">
                              {week.appointments} תורים
                            </span>
                            <span className="text-sm font-medium text-primary">
                              ₪{week.revenue}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {week.clients} לקוחות חדשים
                            </span>
                          </div>
                        </div>
                        <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                          <span className="text-xl font-bold text-primary">{index + 1}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Peak Hours */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    שעות עומס
                  </CardTitle>
                  <CardDescription>הזמנים הפופולריים ביותר להזמנות</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {mockReportsData.peakHours.map((hour) => (
                      <div key={hour.time} className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="font-medium">{hour.time}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary rounded-full"
                              style={{ width: `${(hour.bookings / 25) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{hour.bookings}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Services Tab */}
            <TabsContent value="services" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>השירותים הפופולריים</CardTitle>
                  <CardDescription>ביצועי השירותים השונים לפי הזמנות ורווחיות</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockReportsData.topServices.map((service, index) => (
                      <div key={service.name} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <span className="font-bold text-primary">#{index + 1}</span>
                          </div>
                          <div className="text-right">
                            <h3 className="font-medium">{service.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {service.bookings} הזמנות החודש
                            </p>
                          </div>
                        </div>
                        <div className="text-left">
                          <p className="font-bold text-primary">₪{service.revenue}</p>
                          <p className="text-xs text-muted-foreground">סה״כ הכנסות</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Clients Tab */}
            <TabsContent value="clients" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>התפלגות לקוחות</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>לקוחות חוזרים:</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="success">{mockReportsData.clientStats.returning}%</Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>לקוחות חדשים:</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="info">{mockReportsData.clientStats.new}%</Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>גיל ממוצע:</span>
                      <span className="font-medium">{mockReportsData.clientStats.avgAge}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>חלוקה לפי מגדר</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>גברים:</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${mockReportsData.clientStats.genderSplit.male}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{mockReportsData.clientStats.genderSplit.male}%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>נשים:</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-accent rounded-full"
                            style={{ width: `${mockReportsData.clientStats.genderSplit.female}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{mockReportsData.clientStats.genderSplit.female}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Insights Tab */}
            <TabsContent value="insights" className="space-y-6">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>תובנות עסקיות</CardTitle>
                    <CardDescription>המלצות לשיפור הביצועים</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                      <div className="flex items-start gap-3">
                        <TrendingUp className="h-5 w-5 text-success mt-0.5" />
                        <div>
                          <h3 className="font-medium text-success">מגמה חיובית</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            הכנסותיך עלו ב-22% החודש! המשך כך.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-warning mt-0.5" />
                        <div>
                          <h3 className="font-medium text-warning">הזדמנות לשיפור</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            השעות 12:00-14:00 פחות עמוסות. שקול הנחות להעלאת הביקוש.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Users className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <h3 className="font-medium text-primary">המלצה</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            67% מהלקוחות שלך חוזרים - נסה להוסיף תוכנית נאמנות.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}