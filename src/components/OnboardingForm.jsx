
import React, { useState } from 'react';
import { Calendar, User, Mail, Phone, Building, MessageSquare, Clock, ChevronRight } from 'lucide-react';
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">E</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-3">
            Evolvyn
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed max-w-lg mx-auto">
            Scaling Businesses with AI | Eliminating Repetitive Tasks through Smart Automation
          </p>
        </div>

        {/* Form Card */}
        <Card className="border-0 shadow-2xl shadow-blue-100/50 rounded-3xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-blue-600/5 p-1">
            <CardContent className="bg-white rounded-3xl p-8 md:p-12">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  Let's Get Started
                </h2>
                <p className="text-gray-600 text-lg">
                  Tell us about your business and we'll show you how AI can transform your operations.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-600" />
                    Personal Information
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                        Full Name *
                      </Label>
                      <Input
                        id="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        className="h-12 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                        Contact Number *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="h-12 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                        placeholder="+1 (555) 123-4567"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="h-12 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                      placeholder="john@company.com"
                      required
                    />
                  </div>
                </div>

                {/* Business Information */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    <Building className="w-5 h-5 text-purple-600" />
                    Business Information
                  </h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="businessName" className="text-sm font-medium text-gray-700">
                      Business/Brand Name or Website *
                    </Label>
                    <Input
                      id="businessName"
                      type="text"
                      value={formData.businessName}
                      onChange={(e) => handleInputChange('businessName', e.target.value)}
                      className="h-12 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                      placeholder="Company Name or www.company.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="businessDescription" className="text-sm font-medium text-gray-700">
                      What does your business sell or provide? *
                    </Label>
                    <Textarea
                      id="businessDescription"
                      value={formData.businessDescription}
                      onChange={(e) => handleInputChange('businessDescription', e.target.value)}
                      className="min-h-24 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 resize-none"
                      placeholder="Describe your products, services, or solutions..."
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currentChallenge" className="text-sm font-medium text-gray-700">
                      Current Challenge You're Facing *
                    </Label>
                    <Textarea
                      id="currentChallenge"
                      value={formData.currentChallenge}
                      onChange={(e) => handleInputChange('currentChallenge', e.target.value)}
                      className="min-h-32 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 resize-none"
                      placeholder="Tell us about repetitive tasks, manual processes, or areas where you think AI could help..."
                      required
                    />
                  </div>
                </div>

                {/* Meeting Scheduling */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-green-500" />
                    Schedule Your Meeting
                  </h3>
                  
                  <DateTimePicker
                    value={formData.meetingDateTime}
                    onChange={(date) => handleInputChange('meetingDateTime', date)}
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <Button
                    type="submit"
                    className="w-full h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    <span className="flex items-center justify-center gap-2">
                      Start Your AI Transformation
                      <ChevronRight className="w-5 h-5" />
                    </span>
                  </Button>
                  
                  <p className="text-center text-sm text-gray-500 mt-4">
                    We'll review your information and get back to you within 24 hours
                  </p>
                </div>
              </form>
            </CardContent>
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500">
          <p className="text-sm">
            © 2024 Evolvyn. Empowering businesses through intelligent automation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OnboardingForm;
