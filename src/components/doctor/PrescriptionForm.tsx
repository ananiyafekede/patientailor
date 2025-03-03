import { useState } from "react";
import { useCreatePrescription } from "@/hooks/doctor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { useForm } from "react-hook-form";
// import { Prescription } from "lucide-react";

interface PrescriptionFormProps {
  appointmentId: number;
  patientId: number;
}

const PrescriptionForm = ({
  appointmentId,
  patientId,
}: PrescriptionFormProps) => {
  const [open, setOpen] = useState(false);
  const [diagnosis, setDiagnosis] = useState("");
  const [medication, setMedication] = useState("");
  const [dosage, setDosage] = useState("");
  const [instructions, setInstructions] = useState("");
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const { isPending, createPrescriptionMutation } = useCreatePrescription();

  const onSubmit = (data) => {
    const prescriptionData = {
      appointment_id: appointmentId,
      patient_id: patientId,
      diagnosis: data.diagnosis,
      medication: data.medication,
      dosage: data.dosage,
      instructions: data.instructions,
    };

    createPrescriptionMutation(prescriptionData);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          {/* <Prescription className="h-4 w-4" /> */}
          Create Prescription
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Prescription</DialogTitle>
          <DialogDescription>
            Fill out the prescription details for this patient.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="diagnosis">Diagnosis</Label>
            <Input
              id="diagnosis"
              {...register("diagnosis", { required: "Diagnosis is Required" })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="medication">Medication</Label>
            <Input
              id="medication"
              {...register("medication", {
                required: "Medication is Required",
              })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dosage">Dosage</Label>
            <Input
              id="dosage"
              {...register("dosage", { required: "Dosage is Required" })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="instructions">Instructions</Label>
            <Textarea
              id="instructions"
              rows={3}
              {...register("instructions", {
                required: "Instructions is Required",
              })}
            />
          </div>

          <DialogFooter>
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <>
                  <Spinner />
                  Creating...
                </>
              ) : (
                "Create Prescription"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PrescriptionForm;
