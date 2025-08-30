import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Star, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

interface BusinessCardProps {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
  address: string;
  phone: string;
  openHours: string;
  services: string[];
  nextAvailable: string;
  distance?: string;
  imageUrl?: string;
  isOpen: boolean;
  onBookAppointment: (businessId: string) => void;
}

export function BusinessCard({
  id,
  name,
  category,
  rating,
  reviewCount,
  address,
  phone,
  openHours,
  services,
  nextAvailable,
  distance,
  imageUrl,
  isOpen,
  onBookAppointment
}: BusinessCardProps) {
  return (
    <Card className="hover-lift animate-fade-in overflow-hidden">
      {/* Business Image */}
      {imageUrl && (
        <div className="h-48 bg-muted bg-cover bg-center" 
             style={{ backgroundImage: `url(${imageUrl})` }} />
      )}
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg text-right mb-1">{name}</CardTitle>
            <p className="text-sm text-muted-foreground text-right">{category}</p>
          </div>
          <Badge 
            variant="secondary" 
            className={cn(
              "text-xs",
              isOpen ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
            )}
          >
            {isOpen ? "פתוח" : "סגור"}
          </Badge>
        </div>
        
        {/* Rating */}
        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{rating}</span>
            <span className="text-sm text-muted-foreground">({reviewCount})</span>
          </div>
          {distance && (
            <span className="text-sm text-muted-foreground">• {distance}</span>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Contact Info */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-right flex-1">{address}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span>{phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{openHours}</span>
          </div>
        </div>

        {/* Services */}
        <div>
          <p className="text-sm font-medium mb-2 text-right">שירותים:</p>
          <div className="flex flex-wrap gap-1">
            {services.slice(0, 3).map((service, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {service}
              </Badge>
            ))}
            {services.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{services.length - 3} נוספים
              </Badge>
            )}
          </div>
        </div>

        {/* Next Available */}
        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
          <div className="text-right">
            <p className="text-sm font-medium">תור הקרוב:</p>
            <p className="text-xs text-muted-foreground">{nextAvailable}</p>
          </div>
          <Button 
            onClick={() => onBookAppointment(id)}
            size="sm"
            className="bg-gradient-primary hover:opacity-90"
            disabled={!isOpen}
          >
            קביעת תור
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}