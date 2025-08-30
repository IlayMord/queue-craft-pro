import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Calendar, MessageSquare, Settings, Star, Clock, CheckCircle, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock notifications data
const mockNotifications = [
  {
    id: "1",
    type: "appointment",
    title: "תור חדש נקבע",
    message: "יוסי לוי קבע תור לגזיזה ב-15/12 בשעה 14:30",
    time: "לפני 5 דקות",
    isRead: false,
    urgent: false
  },
  {
    id: "2", 
    type: "reminder",
    title: "תזכורת תור",
    message: "תור עם שרה כהן מתחיל בעוד 30 דקות",
    time: "לפני 25 דקות",
    isRead: false,
    urgent: true
  },
  {
    id: "3",
    type: "review",
    title: "ביקורת חדשה",
    message: "קיבלת ביקורת 5 כוכבים מדני לוי",
    time: "לפני שעה",
    isRead: true,
    urgent: false
  },
  {
    id: "4",
    type: "cancellation", 
    title: "ביטול תור",
    message: "מיכל כהן ביטלה את התור ב-16/12 בשעה 10:00",
    time: "לפני 2 שעות",
    isRead: true,
    urgent: false
  },
  {
    id: "5",
    type: "system",
    title: "עדכון מערכת",
    message: "זמינות תכונות חדשות באפליקציה",
    time: "אתמול",
    isRead: true,
    urgent: false
  }
];

const notificationSettings = {
  appointments: true,
  reminders: true,
  reviews: true,
  cancellations: true,
  system: false,
  email: true,
  sms: false,
  push: true
};

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "appointment": return Calendar;
    case "reminder": return Clock;
    case "review": return Star;
    case "cancellation": return X;
    case "system": return Settings;
    default: return Bell;
  }
};

const getNotificationColor = (type: string, urgent: boolean) => {
  if (urgent) return "text-destructive";
  switch (type) {
    case "appointment": return "text-primary";
    case "reminder": return "text-warning";
    case "review": return "text-success";
    case "cancellation": return "text-muted-foreground";
    case "system": return "text-accent";
    default: return "text-muted-foreground";
  }
};

interface NotificationsProps {
  userType?: "user" | "business";
}

export default function Notifications({ userType = "user" }: NotificationsProps) {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [settings, setSettings] = useState(notificationSettings);
  const { toast } = useToast();

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    toast({
      title: "הודעות סומנו כנקראו",
      description: "כל ההודעות סומנו כנקראו"
    });
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
    toast({
      title: "הודעה נמחקה",
      description: "ההודעה הוסרה בהצלחה"
    });
  };

  const updateSetting = (key: string, value: boolean) => {
    setSettings({ ...settings, [key]: value });
    toast({
      title: "הגדרות עודכנו",
      description: `הגדרת ${key} ${value ? 'הופעלה' : 'בוטלה'}`
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header userType={userType} userName="יוסי לוי" businessName="מספרת דני" />
      
      <main className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Bell className="h-8 w-8 text-primary" />
                {unreadCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs"
                  >
                    {unreadCount}
                  </Badge>
                )}
              </div>
              <div>
                <h1 className="text-3xl font-bold">הודעות</h1>
                <p className="text-lg text-muted-foreground">
                  {unreadCount > 0 ? `${unreadCount} הודעות חדשות` : "אין הודעות חדשות"}
                </p>
              </div>
            </div>
            
            {unreadCount > 0 && (
              <Button onClick={markAllAsRead} variant="outline">
                סמן הכל כנקרא
              </Button>
            )}
          </div>

          <Tabs defaultValue="all" className="animate-slide-up">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all" className="gap-2">
                <Bell className="h-4 w-4" />
                כל ההודעות ({notifications.length})
              </TabsTrigger>
              <TabsTrigger value="unread" className="gap-2">
                <MessageSquare className="h-4 w-4" />
                לא נקראו ({unreadCount})
              </TabsTrigger>
              <TabsTrigger value="settings" className="gap-2">
                <Settings className="h-4 w-4" />
                הגדרות
              </TabsTrigger>
            </TabsList>

            {/* All Notifications */}
            <TabsContent value="all" className="space-y-4">
              {notifications.length > 0 ? (
                notifications.map((notification, index) => {
                  const IconComponent = getNotificationIcon(notification.type);
                  const iconColor = getNotificationColor(notification.type, notification.urgent);
                  
                  return (
                    <Card 
                      key={notification.id} 
                      className={`hover-lift cursor-pointer animate-fade-in ${
                        !notification.isRead ? 'border-primary/20 bg-primary/5' : ''
                      }`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className={`p-2 rounded-lg bg-muted/50`}>
                            <IconComponent className={`h-5 w-5 ${iconColor}`} />
                          </div>
                          
                          <div className="flex-1 text-right">
                            <div className="flex items-center justify-between mb-1">
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">
                                  {notification.time}
                                </span>
                                {notification.urgent && (
                                  <Badge variant="destructive" className="text-xs">
                                    דחוף
                                  </Badge>
                                )}
                                {!notification.isRead && (
                                  <div className="w-2 h-2 bg-primary rounded-full" />
                                )}
                              </div>
                              <h3 className="font-semibold">{notification.title}</h3>
                            </div>
                            <p className="text-muted-foreground text-sm">
                              {notification.message}
                            </p>
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(notification.id);
                            }}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              ) : (
                <Card className="text-center py-12">
                  <CardContent>
                    <Bell className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">אין הודעות</h3>
                    <p className="text-muted-foreground">
                      כשיהיו עדכונים חדשים, הם יופיעו כאן
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Unread Notifications */}
            <TabsContent value="unread" className="space-y-4">
              {notifications.filter(n => !n.isRead).map((notification, index) => {
                const IconComponent = getNotificationIcon(notification.type);
                const iconColor = getNotificationColor(notification.type, notification.urgent);
                
                return (
                  <Card 
                    key={notification.id} 
                    className="hover-lift cursor-pointer border-primary/20 bg-primary/5 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-lg bg-muted/50">
                          <IconComponent className={`h-5 w-5 ${iconColor}`} />
                        </div>
                        
                        <div className="flex-1 text-right">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground">
                                {notification.time}
                              </span>
                              {notification.urgent && (
                                <Badge variant="destructive" className="text-xs">
                                  דחוף
                                </Badge>
                              )}
                              <div className="w-2 h-2 bg-primary rounded-full" />
                            </div>
                            <h3 className="font-semibold">{notification.title}</h3>
                          </div>
                          <p className="text-muted-foreground text-sm">
                            {notification.message}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
              
              {notifications.filter(n => !n.isRead).length === 0 && (
                <Card className="text-center py-12">
                  <CardContent>
                    <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">אין הודעות חדשות</h3>
                    <p className="text-muted-foreground">
                      כל ההודעות נקראו
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Settings */}
            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>הגדרות התראות</CardTitle>
                  <CardDescription>התאם את סוגי ההתראות שתרצה לקבל</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium">תורים חדשים</Label>
                        <p className="text-sm text-muted-foreground">קבל התראה על תורים חדשים</p>
                      </div>
                      <Switch
                        checked={settings.appointments}
                        onCheckedChange={(checked) => updateSetting('appointments', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium">תזכורות</Label>
                        <p className="text-sm text-muted-foreground">תזכורות לתורים קרובים</p>
                      </div>
                      <Switch
                        checked={settings.reminders}
                        onCheckedChange={(checked) => updateSetting('reminders', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium">ביקורות</Label>
                        <p className="text-sm text-muted-foreground">התראות על ביקורות חדשות</p>
                      </div>
                      <Switch
                        checked={settings.reviews}
                        onCheckedChange={(checked) => updateSetting('reviews', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium">ביטולים</Label>
                        <p className="text-sm text-muted-foreground">התראות על ביטול תורים</p>
                      </div>
                      <Switch
                        checked={settings.cancellations}
                        onCheckedChange={(checked) => updateSetting('cancellations', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium">עדכוני מערכת</Label>
                        <p className="text-sm text-muted-foreground">עדכונים על תכונות חדשות</p>
                      </div>
                      <Switch
                        checked={settings.system}
                        onCheckedChange={(checked) => updateSetting('system', checked)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>אמצעי התראה</CardTitle>
                  <CardDescription>בחר איך תרצה לקבל התראות</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">התראות באפליקציה</Label>
                      <p className="text-sm text-muted-foreground">התראות בתוך האפליקציה</p>
                    </div>
                    <Switch
                      checked={settings.push}
                      onCheckedChange={(checked) => updateSetting('push', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">אימייל</Label>
                      <p className="text-sm text-muted-foreground">התראות בדואר אלקטרוני</p>
                    </div>
                    <Switch
                      checked={settings.email}
                      onCheckedChange={(checked) => updateSetting('email', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">SMS</Label>
                      <p className="text-sm text-muted-foreground">הודעות טקסט לטלפון</p>
                    </div>
                    <Switch
                      checked={settings.sms}
                      onCheckedChange={(checked) => updateSetting('sms', checked)}
                    />
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