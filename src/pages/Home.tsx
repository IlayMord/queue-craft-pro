import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/layout/header";
import { Calendar, Clock, Users, Star, ArrowLeft, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-queue.jpg";
import userIcon from "@/assets/user-icon.png";
import businessIcon from "@/assets/business-icon.png";

const features = [
  {
    icon: Calendar,
    title: "קביעת תורים פשוטה",
    description: "מצא ותזמן תורים בקלות עם אשור מיידי"
  },
  {
    icon: Clock,
    title: "ניהול זמן יעיל",
    description: "עקוב אחר התורים שלך וקבל התראות בזמן"
  },
  {
    icon: Users,
    title: "ממשק מנהל מתקדם",
    description: "נהל את העסק שלך עם כלים מקצועיים"
  },
  {
    icon: Star,
    title: "חוויית משתמש מעולה",
    description: "עיצוב מודרני וקל לשימוש"
  }
];

const stats = [
  { number: "10,000+", label: "לקוחות מרוצים" },
  { number: "500+", label: "עסקים רשומים" },
  { number: "50,000+", label: "תורים נקבעו" },
  { number: "99%", label: "שביעות רצון" }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header userType="user" userName="יוסי לוי" />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary-dark/80" />
        
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              ניהול תורים
              <span className="block text-primary-light">חכם ויעיל</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
              הפלטפורמה המובילה לקביעת תורים ברגע לעסקים ולקוחות. 
              פשוט, מהיר ומהימן.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 shadow-strong"
                asChild
              >
                <Link to="/search" className="gap-2">
                  חיפוש עסקים
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-6"
                asChild
              >
                <Link to="/business">למנהלי עסקים</Link>
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="text-2xl md:text-3xl font-bold">{stat.number}</div>
                  <div className="text-sm opacity-90">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* User Type Selection */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">איך תרצה להתחיל?</h2>
            <p className="text-lg text-muted-foreground">בחר את סוג המשתמש המתאים לך</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Customer Card */}
            <Card className="hover-lift border-2 hover:border-primary/20 transition-all duration-300 animate-scale-in">
              <CardHeader className="text-center pb-6">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-primary rounded-2xl flex items-center justify-center">
                  <img src={userIcon} alt="לקוח" className="w-12 h-12" />
                </div>
                <CardTitle className="text-2xl">אני לקוח</CardTitle>
                <CardDescription className="text-base">
                  רוצה לקבוע תור לעסק
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <span>חיפוש עסקים בקרבתך</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <span>קביעת תורים מיידית</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <span>ניהול התורים שלך</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <span>התראות וזיכרונים</span>
                  </li>
                </ul>
                <Button className="w-full bg-gradient-primary hover:opacity-90" size="lg" asChild>
                  <Link to="/search">
                    התחל עכשיו
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Business Card */}
            <Card className="hover-lift border-2 hover:border-primary/20 transition-all duration-300 animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <CardHeader className="text-center pb-6">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-primary rounded-2xl flex items-center justify-center">
                  <img src={businessIcon} alt="בעל עסק" className="w-12 h-12" />
                </div>
                <CardTitle className="text-2xl">אני בעל עסק</CardTitle>
                <CardDescription className="text-base">
                  רוצה לנהל תורים בעסק שלי
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <span>ניהול לוח זמנים</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <span>אישור תורים אוטומטי</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <span>דוחות ואנליטיקות</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <span>ניהול לקוחות</span>
                  </li>
                </ul>
                <Button className="w-full bg-gradient-primary hover:opacity-90" size="lg" asChild>
                  <Link to="/business">
                    התחל עכשיו
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">למה לבחור בנו?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              אנחנו מספקים פתרון מקיף לניהול תורים עם טכנולוגיה מתקדמת וחוויית משתמש מעולה
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="hover-lift text-center animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-lg flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-3xl font-bold mb-4">מוכן להתחיל?</h2>
            <p className="text-xl mb-8 opacity-90">
              הצטרף אלינו היום וחווה ניהול תורים בצורה חדשה לגמרי
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90"
                asChild
              >
                <Link to="/search">התחל כלקוח</Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-primary"
                asChild
              >
                <Link to="/business">התחל כבעל עסק</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-muted/30 border-t">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Calendar className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">QueuePro</span>
          </div>
          <p className="text-muted-foreground">
            © 2024 QueuePro. כל הזכויות שמורות.
          </p>
        </div>
      </footer>
    </div>
  );
}