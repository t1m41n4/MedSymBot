export interface Prescription {
  id: number;
  patientName: string;
  doctorName: string;
  doctorLicenseNumber: string;
  hospitalName?: string;
  issueDate: string;
  expiryDate: string;
  medications: PrescribedMedication[];
  status: 'pending' | 'approved' | 'rejected';
  verificationNotes?: string;
  attachmentUrl?: string;
}

export interface PrescribedMedication {
  productId: number;
  dosage: string;
  frequency: string;
  duration: string;
  quantity: number;
  instructions?: string;
}
