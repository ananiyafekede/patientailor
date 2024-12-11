import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const DashboardHeader = () => {
  // Static data for development
  const doctorData = {
    firstName: "John",
    lastName: "Doe",
    specialty: "Cardiologist",
    appointmentsToday: 8
  };

  return (
    <div className="flex justify-between items-center bg-white rounded-lg p-6 shadow-sm">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome Dr. {doctorData.firstName} {doctorData.lastName}!
          </h1>
          <img src="/lovable-uploads/728d6069-1895-45af-970a-b134d785a700.png" alt="Stethoscope" className="w-12 h-12 object-contain" />
        </div>
        <p className="text-gray-600 mt-1">
          You have {doctorData.appointmentsToday} patients remaining today
        </p>
      </div>
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16 border-2 border-primary/10">
          <AvatarImage src="/placeholder.svg" />
          <AvatarFallback className="text-lg">
            {doctorData.firstName[0]}{doctorData.lastName[0]}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold text-gray-900">Dr. {doctorData.firstName} {doctorData.lastName}</p>
          <p className="text-sm text-gray-600">{doctorData.specialty}</p>
        </div>
      </div>
    </div>
  );
};