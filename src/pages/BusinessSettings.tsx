import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, X, Clock, MapPin, Phone, Globe, Camera } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockBusinessData = {
  name: "מספרת דני",
  category: "מספרות",
  description: "מספרה מקצועית עם ניסיון של 15 שנה. מתמחים בגזיזות מודרניות, צביעות איכותיות ועיצוב שיער.",
  address: "רחוב הרצל 15, תל אביב",
  phone: "03-1234567",
  email: "info@danny-salon.co.il",
  website: "www.danny-salon.co.il",
  services: [
    { id: "1", name: "גזיזה רגילה", duration: 30, price: 80 },
    { id: "2", name: "גזיזה וסטיילינג", duration: 45, price: 120 },
    { id: "3", name: "צביעת שיער", duration: 90, price: 250 },
    { id: "4", name: "פן וקשרים", duration: 60, price: 180 }
  ],
  workingHours: {
    sunday: { open: "09:00", close: "19:00", isWorking: true },
    monday: { open: "09:00", close: "19:00", isWorking: true },
    tuesday: { open: "09:00", close: "19:00", isWorking: true },
    wednesday: { open: "09:00", close: "19:00", isWorking: true },
    thursday: { open: "09:00", close: "19:00", isWorking: true },
    friday: { open: "08:00", close: "14:00", isWorking: true },
    saturday: { open: "20:00", close: "23:00", isWorking: false }
  },
  settings: {
    autoApprove: true,
    advanceBooking: 30,
    cancellationPolicy: 24,
    requireDeposit: false,
    onlinePayments: true
  }
};

const categories = [
  "מספרות", "יופי וטיפוח", "רפואת שיניים", "מוסכים", 
  "בריאות", "שירותים עסקיים", "בילוי ופנאי", "אחר"
];

const daysOfWeek = [
  { key: "sunday", label: "ראשון" },
  { key: "monday", label: "שני" },
  { key: "tuesday", label: "שלישי" },
  { key: "wednesday", label: "רביעי" },
  { key: "thursday", label: "חמישי" },
  { key: "friday", label: "שישי" },
  { key: "saturday", label: "שבת" }
];

export default function BusinessSettings() {
  const [businessData, setBusinessData] = useState(mockBusinessData);
  const [newService, setNewService] = useState({ name: "", duration: 30, price: 0 });
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "הגדרות נשמרו",
      description: "ההגדרות עודכנו בהצלחה במערכת"
    });
  };

  const addService = () => {
    if (!newService.name || !newService.price) {
      toast({
        title: "חסרים פרטים",
        description: "אנא מלא את כל פרטי השירות",
        variant: "destructive"
      });
      return;
    }

    const service = {
      id: Date.now().toString(),
      ...newService
    };

    setBusinessData({
      ...businessData,
      services: [...businessData.services, service]
    });

    setNewService({ name: "", duration: 30, price: 0 });
    
    toast({
      title: "שירות נוסף",
      description: `השירות "${service.name}" נוסף בהצלחה`
    });
  };

  const removeService = (serviceId: string) => {
    setBusinessData({
      ...businessData,
      services: businessData.services.filter(s => s.id !== serviceId)
    });
  };

  const updateWorkingHours = (day: string, field: string, value: string | boolean) => {
    setBusinessData({
      ...businessData,
      workingHours: {
        ...businessData.workingHours,
        [day]: {
          ...businessData.workingHours[day as keyof typeof businessData.workingHours],
          [field]: value
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header userType="business" businessName={businessData.name} />
      
      <main className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-6 animate-fade-in">
            <h1 className="text-3xl font-bold mb-2">הגדרות עסק</h1>
            <p className="text-lg text-muted-foreground">נהל את פרטי העסק והגדרות התורים</p>
          </div>

          <Tabs defaultValue="general" className="animate-slide-up">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="general">כללי</TabsTrigger>
              <TabsTrigger value="services">שירותים</TabsTrigger>
              <TabsTrigger value="hours">שעות עבודה</TabsTrigger>
              <TabsTrigger value="booking">הזמנות</TabsTrigger>
            </TabsList>

            {/* General Settings */}
            <TabsContent value="general" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>פרטי העסק</CardTitle>
                  <CardDescription>עדכן את הפרטים הבסיסיים של העסק</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="businessName">שם העסק</Label>
                      <Input
                        id="businessName"
                        value={businessData.name}
                        onChange={(e) => setBusinessData({...businessData, name: e.target.value})}
                        className="text-right"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">קטגוריה</Label>
                      <Select value={businessData.category} onValueChange={(value) => setBusinessData({...businessData, category: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(cat => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">תיאור העסק</Label>
                    <Textarea
                      id="description"
                      value={businessData.description}
                      onChange={(e) => setBusinessData({...businessData, description: e.target.value})}
                      className="text-right min-h-[100px]"
                      placeholder="כתוב תיאור קצר על העסק שלך..."
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">טלפון</Label>
                      <Input
                        id="phone"
                        value={businessData.phone}
                        onChange={(e) => setBusinessData({...businessData, phone: e.target.value})}
                        className="text-right"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">אימייל</Label>
                      <Input
                        id="email"
                        type="email"
                        value={businessData.email}
                        onChange={(e) => setBusinessData({...businessData, email: e.target.value})}
                        className="text-right"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">כתובת</Label>
                    <Input
                      id="address"
                      value={businessData.address}
                      onChange={(e) => setBusinessData({...businessData, address: e.target.value})}
                      className="text-right"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">אתר אינטרנט</Label>
                    <Input
                      id="website"
                      value={businessData.website}
                      onChange={(e) => setBusinessData({...businessData, website: e.target.value})}
                      className="text-right"
                      placeholder="www.example.com"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>תמונות העסק</CardTitle>
                  <CardDescription>הוסף תמונות שיציגו את העסק שלך</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full h-32 border-2 border-dashed">
                    <div className="text-center">
                      <Camera className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">לחץ להוספת תמונות</p>
                    </div>
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Services Management */}
            <TabsContent value="services" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>השירותים שלי</CardTitle>
                  <CardDescription>נהל את השירותים שהעסק מציע</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {businessData.services.map((service) => (
                    <div key={service.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1 text-right">
                        <h3 className="font-medium">{service.name}</h3>
                        <div className="flex items-center gap-4 mt-1 justify-end">
                          <span className="text-sm text-muted-foreground">
                            {service.duration} דקות
                          </span>
                          <span className="font-medium text-primary">
                            ₪{service.price}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeService(service.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Add New Service */}
              <Card>
                <CardHeader>
                  <CardTitle>הוסף שירות חדש</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="serviceName">שם השירות</Label>
                      <Input
                        id="serviceName"
                        value={newService.name}
                        onChange={(e) => setNewService({...newService, name: e.target.value})}
                        className="text-right"
                        placeholder="לדוגמה: גזיזה"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="duration">משך (דקות)</Label>
                      <Input
                        id="duration"
                        type="number"
                        value={newService.duration}
                        onChange={(e) => setNewService({...newService, duration: parseInt(e.target.value)})}
                        min="5"
                        max="480"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="price">מחיר (₪)</Label>
                      <Input
                        id="price"
                        type="number"
                        value={newService.price}
                        onChange={(e) => setNewService({...newService, price: parseInt(e.target.value)})}
                        min="0"
                      />
                    </div>
                  </div>
                  <Button onClick={addService} className="w-full">
                    <Plus className="h-4 w-4 ml-2" />
                    הוסף שירות
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Working Hours */}
            <TabsContent value="hours" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>שעות עבודה</CardTitle>
                  <CardDescription>הגדר את שעות הפעילות של העסק</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {daysOfWeek.map((day) => {
                    const dayData = businessData.workingHours[day.key as keyof typeof businessData.workingHours];
                    return (
                      <div key={day.key} className="flex items-center gap-4 p-4 border rounded-lg">
                        <div className="w-20 text-right">
                          <span className="font-medium">{day.label}</span>
                        </div>
                        
                        <Switch
                          checked={dayData.isWorking}
                          onCheckedChange={(checked) => updateWorkingHours(day.key, 'isWorking', checked)}
                        />
                        
                        {dayData.isWorking && (
                          <>
                            <div className="flex items-center gap-2">
                              <Label>מ:</Label>
                              <Input
                                type="time"
                                value={dayData.open}
                                onChange={(e) => updateWorkingHours(day.key, 'open', e.target.value)}
                                className="w-32"
                              />
                            </div>
                            <div className="flex items-center gap-2">
                              <Label>עד:</Label>
                              <Input
                                type="time"
                                value={dayData.close}
                                onChange={(e) => updateWorkingHours(day.key, 'close', e.target.value)}
                                className="w-32"
                              />
                            </div>
                          </>
                        )}
                        
                        {!dayData.isWorking && (
                          <Badge variant="secondary">סגור</Badge>
                        )}
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Booking Settings */}
            <TabsContent value="booking" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>הגדרות הזמנות</CardTitle>
                  <CardDescription>התאם את אופן פעולת מערכת ההזמנות</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">אישור אוטומטי לתורים</Label>
                      <p className="text-sm text-muted-foreground">תורים יאושרו מיידית ללא דרישה לאישור ידני</p>
                    </div>
                    <Switch
                      checked={businessData.settings.autoApprove}
                      onCheckedChange={(checked) => setBusinessData({
                        ...businessData,
                        settings: {...businessData.settings, autoApprove: checked}
                      })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>מספר הימים מראש שניתן להזמין</Label>
                    <Select
                      value={businessData.settings.advanceBooking.toString()}
                      onValueChange={(value) => setBusinessData({
                        ...businessData,
                        settings: {...businessData.settings, advanceBooking: parseInt(value)}
                      })}
                    >
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7">שבוע</SelectItem>
                        <SelectItem value="14">שבועיים</SelectItem>
                        <SelectItem value="30">חודש</SelectItem>
                        <SelectItem value="60">חודשיים</SelectItem>
                        <SelectItem value="90">3 חודשים</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>מדיניות ביטולים (שעות מראש)</Label>
                    <Select
                      value={businessData.settings.cancellationPolicy.toString()}
                      onValueChange={(value) => setBusinessData({
                        ...businessData,
                        settings: {...businessData.settings, cancellationPolicy: parseInt(value)}
                      })}
                    >
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">2 שעות</SelectItem>
                        <SelectItem value="4">4 שעות</SelectItem>
                        <SelectItem value="12">12 שעות</SelectItem>
                        <SelectItem value="24">24 שעות</SelectItem>
                        <SelectItem value="48">48 שעות</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">דרישת מקדמה</Label>
                      <p className="text-sm text-muted-foreground">דרוש תשלום מקדמה בעת קביעת התור</p>
                    </div>
                    <Switch
                      checked={businessData.settings.requireDeposit}
                      onCheckedChange={(checked) => setBusinessData({
                        ...businessData,
                        settings: {...businessData.settings, requireDeposit: checked}
                      })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">תשלומים מקוונים</Label>
                      <p className="text-sm text-muted-foreground">אפשר ללקוחות לשלם מראש דרך האפליקציה</p>
                    </div>
                    <Switch
                      checked={businessData.settings.onlinePayments}
                      onCheckedChange={(checked) => setBusinessData({
                        ...businessData,
                        settings: {...businessData.settings, onlinePayments: checked}
                      })}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Save Button */}
          <div className="mt-8 animate-fade-in">
            <Button onClick={handleSave} className="w-full bg-gradient-primary hover:opacity-90">
              שמור את כל ההגדרות
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}