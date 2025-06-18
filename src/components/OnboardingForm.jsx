
import React, { useState } from 'react';
import { Calendar, User, Mail, Phone, Building, MessageSquare, Clock, ChevronRight, Zap, Settings, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import DateTimePicker from './DateTimePicker';

const OnboardingForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    businessName: '',
    businessDescription: '',
    currentChallenge: '',
    meetingDateTime: null
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };


const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
    const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

    // Convert meetingDateTime to Date if it's a string
   let meetingDateTime = formData.meetingDateTime;
let meetingDateTimeISO = null;

  if (meetingDateTime) {
  // If it's a string, try to convert to Date
  if (typeof meetingDateTime === "string") {
    const dateObj = new Date(meetingDateTime);
    // Check if dateObj is a valid date
    if (!isNaN(dateObj.getTime())) {
      meetingDateTimeISO = dateObj.toISOString();
    }
  } else if (meetingDateTime instanceof Date && !isNaN(meetingDateTime.getTime())) {
    meetingDateTimeISO = meetingDateTime.toISOString();
  }
}
    const payload = {
      client_name: formData.fullName,
      email_address: formData.email,
      contacts: { phone: formData.phone }, // as JSONB
      business: formData.businessName,
      key_challenges: formData.currentChallenge,
      onboarding_details: formData.businessDescription,
      lead_handlings: { meetingDateTime: meetingDateTimeISO  }, // JSONB
      status: 'new', // optional: add default status
    };

    const response = await fetch(`${SUPABASE_URL}/rest/v1/clients`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error('Failed to submit form');
    }

    alert('Form submitted successfully!');
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      businessName: '',
      businessDescription: '',
      currentChallenge: '',
      meetingDateTime: null
    });

  } catch (error) {
    console.error('Submission error:', error.message);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">E</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">
            Evolvyn
          </h1>
          <p className="text-blue-200 text-lg leading-relaxed max-w-lg mx-auto mb-8">
            Scaling Businesses with AI | Eliminating Repetitive Tasks through Smart Automation
          </p>
          
          {/* Feature highlights */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="flex items-center gap-2 text-blue-200">
              <Zap className="w-4 h-4 text-blue-400" />
              <span className="text-sm">AI-Powered Solutions</span>
            </div>
            <div className="flex items-center gap-2 text-blue-200">
              <Settings className="w-4 h-4 text-purple-400" />
              <span className="text-sm">Custom Automation</span>
            </div>
            <div className="flex items-center gap-2 text-blue-200">
              <Shield className="w-4 h-4 text-green-400" />
              <span className="text-sm">24/7 Support</span>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <Card className="border-0 bg-white/10 backdrop-blur-md shadow-2xl rounded-3xl overflow-hidden">
          <CardContent className="p-8 md:p-12">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-white mb-3">
                Ready to Transform Your Business?
              </h2>
              <p className="text-blue-200 text-lg">
                Tell us about your challenges and let's build your AI-powered solution together.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-sm font-medium text-white">
                    Full Name *
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="h-12 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-white">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="h-12 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200"
                    placeholder="your.email@company.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium text-white">
                    Contact Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="h-12 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessName" className="text-sm font-medium text-white">
                    Business/Brand Name or Website *
                  </Label>
                  <Input
                    id="businessName"
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => handleInputChange('businessName', e.target.value)}
                    className="h-12 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200"
                    placeholder="Your Company Ltd. or www.yoursite.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessDescription" className="text-sm font-medium text-white">
                    What does your business sell or provide?
                  </Label>
                  <Textarea
                    id="businessDescription"
                    value={formData.businessDescription}
                    onChange={(e) => handleInputChange('businessDescription', e.target.value)}
                    className="min-h-24 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200 resize-none"
                    placeholder="Briefly describe your products, services, or solutions..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currentChallenge" className="text-sm font-medium text-white">
                    What's your biggest operational challenge right now?
                  </Label>
                  <Textarea
                    id="currentChallenge"
                    value={formData.currentChallenge}
                    onChange={(e) => handleInputChange('currentChallenge', e.target.value)}
                    className="min-h-32 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200 resize-none"
                    placeholder="E.g., Manual data entry, customer service bottlenecks, repetitive admin tasks..."
                  />
                </div>
              </div>

              {/* Meeting Scheduling */}
              <div className="space-y-6">
                <DateTimePicker
                  value={formData.meetingDateTime}
                  onChange={(date) => handleInputChange('meetingDateTime', date)}
                />
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button
                  type="submit"
                  className="w-full h-14 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border-0"
                >
                  <span className="flex items-center justify-center gap-2">
                    <Zap className="w-5 h-5" />
                    Start My AI Transformation
                  </span>
                </Button>
                
                <div className="text-center mt-4">
                  <p className="text-xs text-blue-200 flex items-center justify-center gap-1">
                    <Shield className="w-3 h-3" />
                    Your information is secure and will only be used to contact you about AI automation solutions.
                  </p>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-12 text-blue-300">
          <p className="text-sm">
            © 2024 Evolvyn. Transforming businesses through intelligent automation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OnboardingForm;
