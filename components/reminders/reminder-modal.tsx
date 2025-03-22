"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { MedicationReminder } from "@/types/reminder"

interface ReminderModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: Partial<MedicationReminder>) => void
  medicationName: string
}

export function ReminderModal({ open, onOpenChange, onSubmit, medicationName }: ReminderModalProps) {
  const [frequency, setFrequency] = useState<MedicationReminder['frequency']>('daily')
  const [time, setTime] = useState('09:00')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      frequency,
      notificationTime: [time],
      startDate: new Date(),
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set Medication Reminder</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Medication</label>
            <Input value={medicationName} disabled />
          </div>
          <div>
            <label className="text-sm font-medium">Frequency</label>
            <Select value={frequency} onValueChange={(v: any) => setFrequency(v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="twice_daily">Twice Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium">Time</label>
            <Input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">Set Reminder</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
