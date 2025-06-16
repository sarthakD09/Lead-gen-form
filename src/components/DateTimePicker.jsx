
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const DateTimePicker = ({ value, onChange }) => {
  const [date, setDate] = useState(value?.date);
  const [time, setTime] = useState(value?.time || '');

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    onChange({
      date: selectedDate,
      time: time
    });
  };

  const handleTimeChange = (selectedTime) => {
    setTime(selectedTime);
    onChange({
      date: date,
      time: selectedTime
    });
  };

  // Generate time slots
  const timeSlots = [];
  for (let hour = 9; hour <= 17; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      const displayTime = format(new Date(2024, 0, 1, hour, minute), 'h:mm a');
      timeSlots.push({ value: timeString, label: displayTime });
    }
  }

  return (
    <div className="space-y-4">
      <Label className="text-sm font-medium text-white">
        Preferred Meeting Date
      </Label>
      
      <div className="space-y-4">
        {/* Date Picker */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full h-12 justify-start text-left font-normal rounded-xl bg-white/10 border-white/20 text-white hover:bg-white/15 hover:border-blue-400 transition-all duration-200",
                !date && "text-blue-200"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date for our consultation</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-slate-800 border-slate-600" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateChange}
              disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
              initialFocus
              className="p-3 pointer-events-auto text-white"
            />
          </PopoverContent>
        </Popover>

        {/* Time Picker - only show if date is selected */}
        {date && (
          <Select value={time} onValueChange={handleTimeChange}>
            <SelectTrigger className="h-12 rounded-xl bg-white/10 border-white/20 text-white hover:border-blue-400 transition-all duration-200">
              <SelectValue placeholder="Choose a time" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-600">
              {timeSlots.map((slot) => (
                <SelectItem key={slot.value} value={slot.value} className="text-white hover:bg-slate-700">
                  {slot.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
      
      <p className="text-xs text-blue-200">
        Available Monday-Friday, 9:00 AM - 5:30 PM (EST)
      </p>
    </div>
  );
};

export default DateTimePicker;
