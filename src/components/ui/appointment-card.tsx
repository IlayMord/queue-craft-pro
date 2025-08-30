import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Phone, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface AppointmentCardProps {
  id: string;
  businessName: string;
  serviceName: string;
  date: string;
  time: string;
  duration: number;
  customerName?: string;
  customerPhone?: string;
  address?: string;
  status: "confirmed" | "pending" | "completed" | "cancelled";
  type: "customer" | "business";
  onAction?: (action: string, id: string) => void;
}

const statusConfig = {
  confirmed: { label: "מאושר", className: "bg-success text-success-foreground" },
  pending: { label: "ממתין", className: "bg-warning text-warning-foreground" },
  completed: { label: "הושלם", className: "bg-muted text-muted-foreground" },
  cancelled: { label: "בוטל", className: "bg-destructive text-destructive-foreground" },
};

export function AppointmentCard({
  id,
  businessName,
  serviceName,
  date,
  time,
  duration,
  customerName,
  customerPhone,
  address,
  status,
  type,
  onAction
}: AppointmentCardProps) {
  const statusInfo = statusConfig[status];

  return (
    <Card className="hover-lift animate-fade-in">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg text-right">
              {type === "customer" ? businessName : serviceName}
            </CardTitle>
            <p className="text-sm text-muted-foreground text-right">
              {type === "customer" ? serviceName : `${customerName}`}
            </p>
          </div>
          <Badge className={cn("text-xs", statusInfo.className)}>
            {statusInfo.label}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Date and Time */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            <span className="font-medium">{date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <span>{time} ({duration} דקות)</span>
          </div>
        </div>

        {/* Customer info for business view */}
        {type === "business" && customerPhone && (
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span>{customerPhone}</span>
          </div>
        )}

        {/* Address for customer view */}
        {type === "customer" && address && (
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-right">{address}</span>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          {status === "confirmed" && (
            <>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onAction?.("reschedule", id)}
                className="flex-1"
              >
                שינוי מועד
              </Button>
              {type === "customer" && (
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => onAction?.("cancel", id)}
                >
                  ביטול
                </Button>
              )}
              {type === "business" && (
                <Button
                  size="sm"
                  variant="default"
                  onClick={() => onAction?.("complete", id)}
                >
                  סמן כהושלם
                </Button>
              )}
            </>
          )}
          
          {status === "pending" && type === "business" && (
            <>
              <Button
                size="sm"
                variant="default"
                onClick={() => onAction?.("confirm", id)}
                className="flex-1"
              >
                אשר תור
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => onAction?.("reject", id)}
              >
                דחה
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}