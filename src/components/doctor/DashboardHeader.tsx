import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

interface DashboardHeaderProps {
  username?: string;
  specialty?: string;
  appointmentsToday: number;
}

export const DashboardHeader = ({
  username,
  specialty,
  appointmentsToday,
}: DashboardHeaderProps) => {
  if (!username) {
    return (
      <div className="flex justify-between items-center flex-wrap bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <Skeleton className="h-16 w-16 rounded-full" />
          <div>
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-24 mt-1" />
          </div>
        </div>
        <p className="">
          <Skeleton className="h-4 w-64 mt-2" />
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center bg-white flex-wrap rounded-lg p-6 shadow-sm">
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16 border-2 border-primary/10">
          <AvatarImage src="/placeholder.svg" />
          <AvatarFallback className="text-lg">{username[0]}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold text-gray-900">Dr. {username}</p>
          <p className="text-sm text-gray-600">
            {specialty || "General Practice"}
          </p>
        </div>
      </div>
      <p className="text-gray-600 mt-1">
        You have {appointmentsToday} patients remaining today
      </p>
    </div>
  );
};
