import { TranslationService } from './translation-service';
import { MedicalKnowledgeService } from './medical-knowledge-service';

interface RasaResponse {
  recipient_id: string;
  text?: string;
  custom?: any;
}

export class RasaService {
  private baseUrl: string;
  private translationService: TranslationService;
  private medicalKnowledge: MedicalKnowledgeService;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_RASA_API_URL || 'http://localhost:5005';
    this.translationService = new TranslationService();
    this.medicalKnowledge = new MedicalKnowledgeService();
  }

  async sendMessage(message: string, senderId: string): Promise<RasaResponse> {
    try {
      // Detect language
      const language = await this.translationService.detectLanguage(message);

      // Translate to English if not already in English
      const translatedMessage = language !== 'en'
        ? await this.translationService.translate(message, language, 'en')
        : message;

      // Send to Rasa
      const response = await fetch(`${this.baseUrl}/webhooks/rest/webhook`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender: senderId,
          message: translatedMessage,
          language: language
        }),
      });

      const rasaResponse = await response.json();

      // Translate response back if necessary
      if (language !== 'en') {
        rasaResponse.text = await this.translationService.translate(
          rasaResponse.text || '',
          'en',
          language
        );
      }

      // Enhance response with medical knowledge if applicable
      if (rasaResponse.custom?.type === 'medical_info') {
        const drugInfo = await this.medicalKnowledge.getDrugInfo(
          rasaResponse.custom.medication
        );
        rasaResponse.custom.additionalInfo = drugInfo;
      }

      // Enhance with Kenyan guidelines if applicable
      if (rasaResponse.custom?.type === 'treatment_inquiry') {
        const guidelines = await this.medicalKnowledge.getKenyanGuidelines(
          rasaResponse.custom.condition
        );
        if (guidelines) {
          rasaResponse.custom.guidelines = guidelines;
          rasaResponse.custom.publicHealth = guidelines.publicHealthMeasures;
        }
      }

      // Add treatment validation
      if (rasaResponse.custom?.type === 'prescription_check') {
        const validation = await this.medicalKnowledge.validateTreatmentPlan(
          rasaResponse.custom.condition,
          rasaResponse.custom.medications
        );
        rasaResponse.custom.validation = validation;
      }

      return rasaResponse;
    } catch (error) {
      console.error('Error communicating with Rasa:', error);
      throw error;
    }
  }

  async trainModel(trainingData: any): Promise<void> {
    await fetch(`${this.baseUrl}/model/train`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(trainingData),
    });
  }
}
