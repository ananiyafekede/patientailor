
import { uploadMedicalRecords } from "@/api/patient";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useUploadMedicalRecords() {
  const { isPending, mutate: uploadRecordsMutation } = useMutation({
    mutationFn: (formData: FormData) => uploadMedicalRecords(formData),
    onError: (error: Error) => {
      toast.error(error.message || "Failed to upload medical records");
    },
    onSuccess: (data) => {
      toast.success(data.message || "Medical records uploaded successfully!");
    },
  });

  return { isPending, uploadRecordsMutation };
}

export default useUploadMedicalRecords;
