
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
      <Label className="text-sm font-medium text-gray-700">
        Preferred Meeting Date & Time *
      </Label>
      
      <div className="grid md:grid-cols-2 gap-4">
        {/* Date Picker */}
        <div className="space-y-2">
          <Label className="text-xs text-gray-600">Select Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full h-12 justify-start text-left font-normal rounded-xl border-gray-200 hover:border-blue-500 transition-all duration-200",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateChange}
                disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Time Picker */}
        <div className="space-y-2">
          <Label className="text-xs text-gray-600">Select Time</Label>
          <Select value={time} onValueChange={handleTimeChange}>
            <SelectTrigger className="h-12 rounded-xl border-gray-200 hover:border-blue-500 transition-all duration-200">
              <SelectValue placeholder="Choose time" />
            </SelectTrigger>
            <SelectContent>
              {timeSlots.map((slot) => (
                <SelectItem key={slot.value} value={slot.value}>
                  {slot.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <p className="text-xs text-gray-500">
        Available Monday-Friday, 9:00 AM - 5:30 PM (EST)
      </p>
    </div>
  );
};

export default DateTimePicker;
