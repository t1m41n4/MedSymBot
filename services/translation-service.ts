export class TranslationService {
  private translations: Record<string, Record<string, string>> = {
    'en': {
      'search_prompt': 'What medication are you looking for?',
      'greeting': 'Hello! How can I help you today?',
      // Add more translations
    },
    'sw': {
      'search_prompt': 'Unatafuta dawa gani?',
      'greeting': 'Habari! Naweza kukusaidia vipi leo?',
      // Add more translations
    }
  };

  async translate(text: string, fromLang: string, toLang: string): Promise<string> {
    // In production, use a translation API like Google Translate
    return this.translations[toLang][text] || text;
  }

  async detectLanguage(text: string): Promise<string> {
    // In production, use a language detection API
    const swahiliKeywords = ['habari', 'dawa', 'maumivu', 'homa', 'tafadhali'];
    return swahiliKeywords.some(word => text.toLowerCase().includes(word)) ? 'sw' : 'en';
  }
}
