interface MedicalCondition {
  name: string;
  symptoms: string[];
  commonMedications: string[];
  precautions: string[];
}

interface DrugInformation {
  name: string;
  category: string;
  interactions: string[];
  contraindications: string[];
  sideEffects: string[];
  usage: string;
}

interface KenyanGuideline {
  condition: string;
  recommendedTreatments: string[];
  referralCriteria: string[];
  publicHealthMeasures: string[];
}

export class MedicalKnowledgeService {
  private medicalDatabase: Record<string, MedicalCondition> = {
    'headache': {
      name: 'Headache',
      symptoms: ['pain in head', 'pressure', 'tension'],
      commonMedications: ['Paracetamol', 'Ibuprofen', 'Aspirin'],
      precautions: ['Rest in quiet place', 'Stay hydrated']
    },
    // Add more conditions
  };

  private drugDatabase: Record<string, DrugInformation> = {
    'paracetamol': {
      name: 'Paracetamol',
      category: 'Analgesic',
      interactions: ['Warfarin'],
      contraindications: ['Liver disease'],
      sideEffects: ['Rare allergic reactions'],
      usage: 'Take 1-2 tablets every 4-6 hours'
    },
    // Add more medications
  };

  private kenyanGuidelines: Record<string, KenyanGuideline> = {
    'malaria': {
      condition: 'Malaria',
      recommendedTreatments: ['Artemether/Lumefantrine', 'Dihydroartemisinin/Piperaquine'],
      referralCriteria: ['Severe symptoms', 'Pregnancy', 'Children under 5'],
      publicHealthMeasures: ['Use of treated nets', 'Environmental management']
    },
    'tuberculosis': {
      condition: 'Tuberculosis',
      recommendedTreatments: ['RHZE combination therapy'],
      referralCriteria: ['All cases must be reported', 'Drug-resistant cases'],
      publicHealthMeasures: ['Contact tracing', 'DOT therapy']
    }
  };

  async getConditionInfo(condition: string): Promise<MedicalCondition | null> {
    return this.medicalDatabase[condition.toLowerCase()] || null;
  }

  async getDrugInfo(drugName: string): Promise<DrugInformation | null> {
    return this.drugDatabase[drugName.toLowerCase()] || null;
  }

  async checkInteractions(medications: string[]): Promise<string[]> {
    // Implementation for checking drug interactions
    return [];
  }

  async getKenyanGuidelines(condition: string): Promise<KenyanGuideline | null> {
    return this.kenyanGuidelines[condition.toLowerCase()] || null;
  }

  async validateTreatmentPlan(condition: string, medications: string[]): Promise<{
    isValid: boolean;
    recommendations: string[];
  }> {
    const guideline = await this.getKenyanGuidelines(condition);
    if (!guideline) return { isValid: true, recommendations: [] };

    const isValid = medications.some(med =>
      guideline.recommendedTreatments.includes(med)
    );

    return {
      isValid,
      recommendations: isValid ? [] : guideline.recommendedTreatments
    };
  }
}
