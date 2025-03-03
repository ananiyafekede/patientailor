
import { getReportById } from "@/api/reports";
import { useQuery } from "@tanstack/react-query";

function useGetReportById(id: number | string | undefined) {
  const { isLoading, data: report, error } = useQuery({
    queryKey: ["report", id],
    queryFn: () => getReportById(id as string | number),
    enabled: !!id,
  });

  return { isLoading, report, error };
}

export default useGetReportById;
