import type { MedicationWarning, MedicationInteraction } from '@/types/product'

export async function getMedicationWarnings(medicationId: number): Promise<MedicationWarning[]> {
  // In production, this would call your backend API
  return [
    {
      type: 'contraindication',
      description: 'Do not use if you have severe kidney disease'
    },
    {
      type: 'sideEffect',
      description: 'May cause drowsiness'
    }
  ]
}

export async function checkMedicationInteractions(
  medicationId: number,
  currentMedications: number[]
): Promise<MedicationInteraction[]> {
  // In production, this would call your backend API
  return [
    {
      severity: 'high',
      description: 'Avoid combining with aspirin',
      interactingDrug: 'Aspirin'
    }
  ]
}
