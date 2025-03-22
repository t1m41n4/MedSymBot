export interface MedicationReminder {
  id: number;
  userId: string;
  productId: number;
  medicationName: string;
  dosage: string;
  frequency: 'daily' | 'twice_daily' | 'weekly' | 'monthly' | 'custom';
  customSchedule?: string;
  startDate: Date;
  endDate?: Date;
  notificationTime: string[];
  notes?: string;
  active: boolean;
}

export interface ReminderNotification {
  id: number;
  reminderId: number;
  scheduledTime: Date;
  sent: boolean;
  acknowledged: boolean;
}
