import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BusinessCard } from "@/components/ui/business-card";
import { Search, MapPin, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock data - in real app this would come from a database
const mockBusinesses = [
  {
    id: "1",
    name: "מספרת דני",
    category: "מספרות",
    rating: 4.8,
    reviewCount: 124,
    address: "רחוב הרצל 15, תל אביב",
    phone: "03-1234567",
    openHours: "ראשון-חמישי 9:00-19:00",
    services: ["גזיזה", "צביעה", "עיצוב", "פן"],
    nextAvailable: "היום 14:30",
    distance: "0.8 ק״מ",
    isOpen: true
  },
  {
    id: "2", 
    name: "קליניקת שיניים ד״ר כהן",
    category: "רפואת שיניים",
    rating: 4.9,
    reviewCount: 89,
    address: "שדרות רוטשילד 22, תל אביב",
    phone: "03-7654321",
    openHours: "ראשון-רביעי 8:00-17:00",
    services: ["ניקוי", "סתימות", "כתרים", "השתלות"],
    nextAvailable: "מחר 10:00",
    distance: "1.2 ק״מ",
    isOpen: true
  },
  {
    id: "3",
    name: "מוסך אברהם",
    category: "מוסכים",
    rating: 4.6,
    reviewCount: 67,
    address: "רחוב הנביאים 8, ירושלים",
    phone: "02-9876543",
    openHours: "ראשון-חמישי 7:00-16:00",
    services: ["טיפול שוטף", "תיקונים", "צמיגים", "בדיקה"],
    nextAvailable: "מחרתיים 9:00",
    distance: "2.1 ק״מ",
    isOpen: false
  }
];

const categories = [
  "הכל",
  "מספרות",
  "רפואת שיניים", 
  "מוסכים",
  "יופי וטיפוח",
  "בריאות",
  "שירותים עסקיים"
];

export default function SearchBusinesses() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("הכל");
  const [businesses] = useState(mockBusinesses);
  const navigate = useNavigate();

  const filteredBusinesses = businesses.filter(business => {
    const matchesSearch = business.name.includes(searchQuery) || 
                         business.services.some(service => service.includes(searchQuery));
    const matchesCategory = selectedCategory === "הכל" || business.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleBookAppointment = (businessId: string) => {
    navigate(`/book/${businessId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header userType="user" userName="יוסי לוי" />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold mb-4">מצא עסקים בקרבתך</h1>
          <p className="text-lg text-muted-foreground">
            חפש ותזמן תורים בקלות עם אלפי עסקים רשומים
          </p>
        </div>

        {/* Search and Filters */}
        <div className="max-w-4xl mx-auto mb-8 animate-slide-up">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="חפש עסק או שירות..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10 text-right"
              />
            </div>
            
            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="בחר קטגוריה" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Location Filter */}
            <Button variant="outline" className="gap-2">
              <MapPin className="h-4 w-4" />
              מיקום
            </Button>
          </div>

          {/* Active Filters */}
          {(searchQuery || selectedCategory !== "הכל") && (
            <div className="flex items-center gap-2 mb-4">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">מסננים פעילים:</span>
              {searchQuery && (
                <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md">
                  "{searchQuery}"
                </span>
              )}
              {selectedCategory !== "הכל" && (
                <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md">
                  {selectedCategory}
                </span>
              )}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("הכל");
                }}
                className="text-xs h-6 px-2"
              >
                נקה הכל
              </Button>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="max-w-6xl mx-auto">
          {filteredBusinesses.length > 0 ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">
                  נמצאו {filteredBusinesses.length} עסקים
                </h2>
                <Select defaultValue="distance">
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="distance">מיון לפי מרחק</SelectItem>
                    <SelectItem value="rating">מיון לפי דירוג</SelectItem>
                    <SelectItem value="availability">מיון לפי זמינות</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBusinesses.map((business, index) => (
                  <div 
                    key={business.id} 
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <BusinessCard
                      {...business}
                      onBookAppointment={handleBookAppointment}
                    />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12 animate-fade-in">
              <div className="w-20 h-20 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">לא נמצאו תוצאות</h3>
              <p className="text-muted-foreground">
                נסה לשנות את מונחי החיפוש או המסננים
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}