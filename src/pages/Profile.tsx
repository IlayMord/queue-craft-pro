import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, Edit, MapPin, Phone, Mail, Calendar, Star, Award, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Camera as CapacitorCamera, CameraResultType, CameraSource } from '@capacitor/camera';

const mockUserData = {
  id: "1",
  name: "יוסי לוי",
  email: "yossi@example.com",
  phone: "050-1234567",
  address: "רחוב הרצל 10, תל אביב",
  joinDate: "מרץ 2023",
  appointmentsCount: 47,
  rating: 4.8,
  profileImage: ""
};

const mockBusinessData = {
  id: "1",
  businessName: "מספרת דני",
  category: "מספרות",
  description: "מספרה מקצועית עם ניסיון של 15 שנה",
  rating: 4.9,
  reviewsCount: 156,
  completedAppointments: 1247,
  clientsCount: 89,
  establishedYear: 2008
};

interface ProfileProps {
  userType?: "user" | "business";
}

export default function Profile({ userType = "user" }: ProfileProps) {
  const [userData, setUserData] = useState(mockUserData);
  const [businessData] = useState(mockBusinessData);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const handlePreferenceClick = (label: string) => {
    toast({
      title: "הגדרה עודכנה",
      description: `${label} נשמר`,
    });
  };

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "הפרופיל עודכן בהצלחה",
      description: "השינויים נשמרו במערכת"
    });
  };

  const handleImageUpload = async () => {
    try {
      const image = await CapacitorCamera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri,
        source: CameraSource.Prompt,
      });
      
      // In real app, upload to server
      toast({
        title: "תמונה עודכנה",
        description: "תמונת הפרופיל עודכנה בהצלחה"
      });
    } catch (error) {
      console.log('Error taking photo:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header userType={userType} userName={userData.name} businessName={businessData.businessName} />
      
      <main className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <Card className="mb-6 animate-fade-in">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                {/* Profile Image */}
                <div className="relative">
                  <Avatar className="w-24 h-24 md:w-32 md:h-32">
                    <AvatarImage src={userData.profileImage} />
                    <AvatarFallback className="text-2xl">
                      {userData.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                    onClick={handleImageUpload}
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>

                {/* Profile Info */}
                <div className="flex-1 text-center md:text-right">
                  <div className="flex items-center justify-center md:justify-end gap-2 mb-2">
                    <h1 className="text-2xl font-bold">
                      {userType === "business" ? businessData.businessName : userData.name}
                    </h1>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {userType === "business" ? (
                    <div className="space-y-2">
                      <Badge variant="info">{businessData.category}</Badge>
                      <div className="flex items-center justify-center md:justify-end gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{businessData.rating} ({businessData.reviewsCount} ביקורות)</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{businessData.clientsCount} לקוחות</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-muted-foreground">לקוח מאז {userData.joinDate}</p>
                      <div className="flex items-center justify-center md:justify-end gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-primary" />
                          <span>{userData.appointmentsCount} תורים</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>דירוג {userData.rating}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Tabs */}
          <Tabs defaultValue="info" className="animate-slide-up">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="info">פרטים אישיים</TabsTrigger>
              <TabsTrigger value="stats">סטטיסטיקות</TabsTrigger>
              <TabsTrigger value="preferences">העדפות</TabsTrigger>
            </TabsList>

            {/* Personal Info Tab */}
            <TabsContent value="info" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>פרטים אישיים</CardTitle>
                  <CardDescription>עדכן את הפרטים האישיים שלך</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">שם מלא</Label>
                      <Input
                        id="name"
                        value={userData.name}
                        onChange={(e) => setUserData({...userData, name: e.target.value})}
                        disabled={!isEditing}
                        className="text-right"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">אימייל</Label>
                      <Input
                        id="email"
                        type="email"
                        value={userData.email}
                        onChange={(e) => setUserData({...userData, email: e.target.value})}
                        disabled={!isEditing}
                        className="text-right"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">טלפון</Label>
                      <Input
                        id="phone"
                        value={userData.phone}
                        onChange={(e) => setUserData({...userData, phone: e.target.value})}
                        disabled={!isEditing}
                        className="text-right"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">כתובת</Label>
                      <Input
                        id="address"
                        value={userData.address}
                        onChange={(e) => setUserData({...userData, address: e.target.value})}
                        disabled={!isEditing}
                        className="text-right"
                      />
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex gap-2 pt-4">
                      <Button onClick={handleSave} className="flex-1">
                        שמור שינויים
                      </Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        בטל
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card>
                <CardHeader>
                  <CardTitle>פרטי קשר</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <span>{userData.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <span>{userData.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <span>{userData.address}</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Statistics Tab */}
            <TabsContent value="stats" className="space-y-6">
              {userType === "business" ? (
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-primary" />
                        הישגים עסקיים
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span>תורים שבוצעו:</span>
                        <span className="font-bold">{businessData.completedAppointments}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>לקוחות פעילים:</span>
                        <span className="font-bold">{businessData.clientsCount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>דירוג ממוצע:</span>
                        <span className="font-bold">{businessData.rating}/5</span>
                      </div>
                      <div className="flex justify-between">
                        <span>שנת הקמה:</span>
                        <span className="font-bold">{businessData.establishedYear}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        סטטיסטיקות תורים
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span>סך תורים:</span>
                        <span className="font-bold">{userData.appointmentsCount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>תורים החודש:</span>
                        <span className="font-bold">8</span>
                      </div>
                      <div className="flex justify-between">
                        <span>דירוג אישי:</span>
                        <span className="font-bold">{userData.rating}/5</span>
                      </div>
                      <div className="flex justify-between">
                        <span>עסקים מועדפים:</span>
                        <span className="font-bold">5</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>

            {/* Preferences Tab */}
            <TabsContent value="preferences" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>העדפות כלליות</CardTitle>
                  <CardDescription>התאם את האפליקציה לצרכים שלך</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>התראות דחופות</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePreferenceClick("התראות דחופות")}
                    >
                      הפעל
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>התראות תזכורת</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePreferenceClick("התראות תזכורת")}
                    >
                      הפעל
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>שיתוף מיקום</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePreferenceClick("שיתוף מיקום")}
                    >
                      אפשר
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>מצב כהה</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePreferenceClick("מצב כהה")}
                    >
                      אוטומטי
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}