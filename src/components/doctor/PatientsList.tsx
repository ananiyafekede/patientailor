/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from "react";
import { useGetDoctorPatients } from "@/hooks/doctor";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { Search, User } from "lucide-react";

const PatientsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPatients, setFilteredPatients] = useState<any[]>([]);

  const { patients = [], isLoading, error } = useGetDoctorPatients();

  useEffect(() => {
    if (patients?.length) {
      if (searchTerm) {
        const filtered = patients.filter((patient) => {
          const fullName =
            `${patient.first_name} ${patient.last_name}`.toLowerCase();
          return fullName.includes(searchTerm.toLowerCase());
        });
        setFilteredPatients(filtered);
      } else {
        setFilteredPatients(patients);
      }
    }
  }, [patients, searchTerm]);

  useEffect(() => {
    if (error) {
      toast.error("Failed to load patients");
      console.error(error);
    }
  }, [error]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner />
      </div>
    );
  }

  if (!patients?.length) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-sm">
        <p className="text-muted-foreground">No patients found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search patients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPatients.map((patient) => (
          <Card key={patient.user_id} className="overflow-hidden">
            <CardHeader className="bg-primary/5 pb-2">
              <CardTitle className="text-lg flex items-center">
                <User className="h-5 w-5 mr-2 text-primary" />
                {patient.first_name} {patient.last_name}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-1">
                  <div className="text-sm text-muted-foreground">
                    Date of Birth:
                  </div>
                  <div className="text-sm">
                    {patient.date_of_birth
                      ? format(new Date(patient.date_of_birth), "PPP")
                      : "N/A"}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <div className="text-sm text-muted-foreground">Address:</div>
                  <div className="text-sm">{patient.address || "N/A"}</div>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <div className="text-sm text-muted-foreground">Email:</div>
                  <div className="text-sm">{patient.email || "N/A"}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PatientsList;
