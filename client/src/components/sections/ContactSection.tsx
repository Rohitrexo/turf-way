import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ScrollReveal from '@/components/ScrollReveal';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    message: ''
  });
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, projectType: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    // Simulate form submission
    setTimeout(() => {
      setFormSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        projectType: '',
        message: ''
      });
      
      // Reset form submission state after 5 seconds
      setTimeout(() => {
        setFormSubmitted(false);
      }, 5000);
    }, 800);
  };

  return (
    <section id="contact" className="py-24 bg-gray-50">
      <ScrollReveal>
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-primary font-semibold tracking-wide uppercase">Get In Touch</h2>
            <h3 className="section-heading">
              Ready to Transform Your FEC?
            </h3>
            <p className="section-subheading">
              Contact us today to discuss how we can help you create, optimize, or revitalize your Family Entertainment Center.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Form */}
            <Card className="shadow-lg">
              <CardContent className="p-8">
                {!formSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Your Name <span className="text-red-500">*</span>
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Smith"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="(123) 456-7890"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                          Company/FEC Name
                        </label>
                        <Input
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Your Entertainment Center"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-1">
                          Project Type <span className="text-red-500">*</span>
                        </label>
                        <Select required onValueChange={handleSelectChange} value={formData.projectType}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a project type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="new-fec">New FEC Development</SelectItem>
                            <SelectItem value="existing-optimization">Existing FEC Optimization</SelectItem>
                            <SelectItem value="renovations">Renovations & Updates</SelectItem>
                            <SelectItem value="feasibility">Feasibility Study</SelectItem>
                            <SelectItem value="other">Other Consultation</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                          Your Message <span className="text-red-500">*</span>
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell us about your project or specific questions"
                          className="min-h-[120px]"
                          required
                        />
                      </div>
                    </div>
                    
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                      Send Message
                    </Button>
                  </form>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-green-500 text-5xl mb-4">
                      <i className="fas fa-check-circle"></i>
                    </div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h4>
                    <p className="text-gray-600 mb-6">
                      Thank you for reaching out. Our team will contact you within 1-2 business days.
                    </p>
                    <Button variant="outline" onClick={() => setFormSubmitted(false)}>
                      Send Another Message
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="overflow-hidden">
                <div className="h-32 bg-primary"></div>
                <CardContent className="p-8 -mt-16">
                  <div className="relative z-10 bg-white p-6 rounded-lg shadow-lg">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h4>
                    
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="bg-primary/10 p-3 rounded-full mr-4">
                          <i className="fas fa-phone-alt text-primary"></i>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Phone</p>
                          <p className="font-medium">(555) 123-4567</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-primary/10 p-3 rounded-full mr-4">
                          <i className="fas fa-envelope text-primary"></i>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-medium">info@turfwayentertainment.com</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-primary/10 p-3 rounded-full mr-4">
                          <i className="fas fa-map-marker-alt text-primary"></i>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Address</p>
                          <p className="font-medium">
                            1234 Entertainment Way<br />
                            Suite 500<br />
                            Atlanta, GA 30339
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-8">
                  <h4 className="text-xl font-bold text-gray-900 mb-4">Schedule a Call</h4>
                  <p className="text-gray-600 mb-6">
                    Prefer to talk directly? Schedule a free 30-minute consultation call with one of our FEC experts.
                  </p>
                  <Button className="w-full bg-secondary hover:bg-secondary/90">
                    <i className="fas fa-calendar-alt mr-2"></i>
                    Book a Consultation
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}