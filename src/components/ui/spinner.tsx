import { Loader2 } from "lucide-react";

export const Spinner = () => {
  return (
    <div className="flex items-center justify-center w-full min-h-[200px]">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
};