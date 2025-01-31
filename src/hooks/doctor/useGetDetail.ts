import { getDoctorDetail as getDoctorDetailApi } from "@/api/doctor";
import { useQuery } from "@tanstack/react-query";
import { Doctor } from "@/types/index";
// <
//   {
//     isLoading: boolean;
//     doctorDetail: Doctor;
//   }
// >

function useGetDetail(id: string) {
  const { isLoading, data: doctorDetail } = useQuery({
    queryKey: ["doctor", id],
    queryFn: () => getDoctorDetailApi(id),
  });

  return { isLoading, doctorDetail };
}

export default useGetDetail;
