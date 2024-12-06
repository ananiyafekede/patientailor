import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface DashboardHeaderProps {
  firstName?: string;
  lastName?: string;
  specialty?: string;
  appointmentsToday: number;
}

export const DashboardHeader = ({ firstName, lastName, specialty, appointmentsToday }: DashboardHeaderProps) => {
  return (
    <div className="flex justify-between items-center bg-white rounded-lg p-6 shadow-sm">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome Dr. {firstName} {lastName}!
          </h1>
          <img src="/lovable-uploads/728d6069-1895-45af-970a-b134d785a700.png" alt="Stethoscope" className="w-12 h-12 object-contain" />
        </div>
        <p className="text-gray-600 mt-1">
          You have {appointmentsToday} patients remaining today
        </p>
      </div>
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16 border-2 border-primary/10">
          <AvatarImage src="/placeholder.svg" />
          <AvatarFallback className="text-lg">
            {firstName?.[0]}{lastName?.[0]}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold text-gray-900">Dr. {firstName} {lastName}</p>
          <p className="text-sm text-gray-600">{specialty}</p>
        </div>
      </div>
    </div>
  );
};