
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
  DialogTrigger
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { Prescription } from "lucide-react";

interface PrescriptionFormProps {
  appointmentId: number;
  patientId: number;
}

const PrescriptionForm = ({ appointmentId, patientId }: PrescriptionFormProps) => {
  const [open, setOpen] = useState(false);
  const [diagnosis, setDiagnosis] = useState("");
  const [medication, setMedication] = useState("");
  const [dosage, setDosage] = useState("");
  const [instructions, setInstructions] = useState("");
  
  const { 
    isPending, 
    createPrescriptionMutation 
  } = useCreatePrescription();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const prescriptionData = {
      appointment_id: appointmentId,
      patient_id: patientId,
      report_type: "prescription",
      report_content: {
        diagnosis,
        medication,
        dosage,
        instructions,
        created_at: new Date().toISOString(),
      }
    };
    
    createPrescriptionMutation(prescriptionData, {
      onSuccess: () => {
        // Reset form and close dialog
        setDiagnosis("");
        setMedication("");
        setDosage("");
        setInstructions("");
        setOpen(false);
      }
    });
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Prescription className="h-4 w-4" />
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
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="diagnosis">Diagnosis</Label>
            <Input
              id="diagnosis"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="medication">Medication</Label>
            <Input
              id="medication"
              value={medication}
              onChange={(e) => setMedication(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="dosage">Dosage</Label>
            <Input
              id="dosage"
              value={dosage}
              onChange={(e) => setDosage(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="instructions">Instructions</Label>
            <Textarea
              id="instructions"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              required
              rows={3}
            />
          </div>
          
          <DialogFooter>
            <Button 
              type="submit" 
              className="w-full"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Spinner className="mr-2 h-4 w-4" />
                  Creating...
                </>
              ) : "Create Prescription"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PrescriptionForm;
