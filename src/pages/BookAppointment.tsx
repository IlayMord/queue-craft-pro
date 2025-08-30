import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Phone, Star, ArrowRight, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock business data - in real app this would be fetched by ID
const mockBusiness = {
  id: "1",
  name: "מספרת דני",
  category: "מספרות",
  rating: 4.8,
  reviewCount: 124,
  address: "רחוב הרצל 15, תל אביב",
  phone: "03-1234567",
  services: [
    { id: "1", name: "גזיזה רגילה", duration: 30, price: 80 },
    { id: "2", name: "גזיזה וסטיילינג", duration: 45, price: 120 },
    { id: "3", name: "צביעת שיער", duration: 90, price: 250 },
    { id: "4", name: "פן וקשרים", duration: 60, price: 180 }
  ],
  availableSlots: {
    "2024-01-15": ["09:00", "10:30", "14:00", "15:30", "17:00"],
    "2024-01-16": ["09:30", "11:00", "13:30", "16:00"],
    "2024-01-17": ["10:00", "11:30", "14:30", "16:30", "18:00"]
  }
};

export default function BookAppointment() {
  const { businessId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [notes, setNotes] = useState("");
  const [step, setStep] = useState(1);

  const business = mockBusiness; // In real app: fetch by businessId

  const selectedServiceData = business.services.find(s => s.id === selectedService);
  const dateKey = selectedDate?.toISOString().split('T')[0];
  const availableTimesForDate = dateKey ? business.availableSlots[dateKey] || [] : [];

  const handleBooking = () => {
    if (!selectedService || !selectedDate || !selectedTime) {
      toast({
        title: "חסרים פרטים",
        description: "אנא מלא את כל השדות הנדרשים",
        variant: "destructive"
      });
      return;
    }

    // Simulate booking process
    toast({
      title: "התור נקבע בהצלחה!",
      description: `התור שלך ב${business.name} נקבע ל${selectedDate.getDate()}/${selectedDate.getMonth() + 1} בשעה ${selectedTime}`,
    });

    // Navigate back to appointments
    setTimeout(() => {
      navigate("/my-appointments");
    }, 2000);
  };

  const nextStep = () => {
    if (step === 1 && !selectedService) {
      toast({
        title: "בחר שירות",
        description: "אנא בחר את השירות הרצוי",
        variant: "destructive"
      });
      return;
    }
    if (step === 2 && !selectedDate) {
      toast({
        title: "בחר תאריך",
        description: "אנא בחר תאריך לתור",
        variant: "destructive"
      });
      return;
    }
    if (step === 3 && !selectedTime) {
      toast({
        title: "בחר שעה",
        description: "אנא בחר שעה לתור",
        variant: "destructive"
      });
      return;
    }
    setStep(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header userType="user" userName="יוסי לוי" />
      
      <main className="container mx-auto px-4 py-8">
        {/* Business Header */}
        <div className="max-w-4xl mx-auto mb-8 animate-fade-in">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl text-right">{business.name}</CardTitle>
                  <CardDescription className="text-right">{business.category}</CardDescription>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{business.rating}</span>
                      <span className="text-sm text-muted-foreground">({business.reviewCount})</span>
                    </div>
                  </div>
                </div>
                <Badge variant="outline" className="bg-success/10 text-success">
                  פתוח עכשיו
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{business.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>{business.phone}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Booking Steps */}
        <div className="max-w-4xl mx-auto">
          {/* Progress Indicator */}
          <div className="flex items-center justify-center mb-8 animate-slide-up">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="flex items-center">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center font-medium
                  ${step >= num 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                  }
                `}>
                  {step > num ? <Check className="h-5 w-5" /> : num}
                </div>
                {num < 4 && (
                  <div className={`
                    w-16 h-1 mx-2
                    ${step > num ? 'bg-primary' : 'bg-muted'}
                  `} />
                )}
              </div>
            ))}
          </div>

          {/* Step Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Step 1: Select Service */}
              {step === 1 && (
                <Card className="animate-fade-in">
                  <CardHeader>
                    <CardTitle>בחר שירות</CardTitle>
                    <CardDescription>איזה שירות תרצה לקבל?</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {business.services.map((service) => (
                        <div
                          key={service.id}
                          className={`
                            p-4 border rounded-lg cursor-pointer transition-all hover-lift
                            ${selectedService === service.id 
                              ? 'border-primary bg-primary/5' 
                              : 'border-border hover:border-primary/50'
                            }
                          `}
                          onClick={() => setSelectedService(service.id)}
                        >
                          <div className="flex justify-between items-start">
                            <div className="text-right flex-1">
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
                            {selectedService === service.id && (
                              <Check className="h-5 w-5 text-primary flex-shrink-0 mr-3" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 2: Select Date */}
              {step === 2 && (
                <Card className="animate-fade-in">
                  <CardHeader>
                    <CardTitle>בחר תאריך</CardTitle>
                    <CardDescription>באיזה תאריך תרצה לקבוע את התור?</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-center">
                      <CalendarComponent
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => {
                          const dateKey = date.toISOString().split('T')[0];
                          return !business.availableSlots[dateKey];
                        }}
                        className="rounded-md border"
                      />
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 3: Select Time */}
              {step === 3 && (
                <Card className="animate-fade-in">
                  <CardHeader>
                    <CardTitle>בחר שעה</CardTitle>
                    <CardDescription>
                      שעות פנויות ב{selectedDate?.getDate()}/{selectedDate && selectedDate.getMonth() + 1}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                      {availableTimesForDate.map((time) => (
                        <Button
                          key={time}
                          variant={selectedTime === time ? "default" : "outline"}
                          className="h-12"
                          onClick={() => setSelectedTime(time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 4: Summary & Notes */}
              {step === 4 && (
                <Card className="animate-fade-in">
                  <CardHeader>
                    <CardTitle>סיכום ופרטים נוספים</CardTitle>
                    <CardDescription>בדוק את הפרטים ואשר את התור</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Booking Summary */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <span className="font-medium">שירות:</span>
                        <span>{selectedServiceData?.name}</span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <span className="font-medium">תאריך:</span>
                        <span>{selectedDate?.getDate()}/{selectedDate && selectedDate.getMonth() + 1}/{selectedDate?.getFullYear()}</span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <span className="font-medium">שעה:</span>
                        <span>{selectedTime}</span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <span className="font-medium">משך:</span>
                        <span>{selectedServiceData?.duration} דקות</span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg">
                        <span className="font-medium">מחיר:</span>
                        <span className="font-bold text-primary">₪{selectedServiceData?.price}</span>
                      </div>
                    </div>

                    {/* Notes */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">הערות (אופציונלי)</label>
                      <Textarea
                        placeholder="הוסף הערות או בקשות מיוחדות..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="text-right"
                      />
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Selected Service Summary */}
              {selectedServiceData && (
                <Card className="sticky top-24 animate-scale-in">
                  <CardHeader>
                    <CardTitle className="text-lg">פרטי ההזמנה</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-right">
                      <p className="font-medium">{selectedServiceData.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedServiceData.duration} דקות
                      </p>
                    </div>
                    
                    {selectedDate && (
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span className="text-sm">
                          {selectedDate.getDate()}/{selectedDate.getMonth() + 1}
                        </span>
                      </div>
                    )}
                    
                    {selectedTime && (
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <span className="text-sm">{selectedTime}</span>
                      </div>
                    )}
                    
                    <div className="pt-4 border-t">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">סה״כ:</span>
                        <span className="text-lg font-bold text-primary">
                          ₪{selectedServiceData.price}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 animate-fade-in">
            <Button
              variant="outline"
              onClick={() => step > 1 ? setStep(prev => prev - 1) : navigate("/search")}
            >
              {step > 1 ? "חזור" : "בטל"}
            </Button>
            
            {step < 4 ? (
              <Button onClick={nextStep} className="gap-2">
                המשך
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleBooking} className="gap-2 bg-gradient-primary hover:opacity-90">
                אשר הזמנה
                <Check className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}