import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Form schema for lead collection
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  company: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

// Quiz questions and options
const quizQuestions = [
  {
    id: 1,
    question: "What is your primary motivation for your FEC?",
    options: [
      { id: 'a', text: "Creating a memorable family experience", type: "family-focused" },
      { id: 'b', text: "Maximizing revenue and growth", type: "profit-driven" },
      { id: 'c', text: "Offering innovative entertainment options", type: "innovation-focused" },
      { id: 'd', text: "Building a community gathering space", type: "community-centered" }
    ],
    icon: "fas fa-question-circle"
  },
  {
    id: 2,
    question: "Which attraction would you prioritize in your FEC?",
    options: [
      { id: 'a', text: "Arcade games and prizes", type: "classic-arcade" },
      { id: 'b', text: "VR experiences and simulators", type: "tech-forward" },
      { id: 'c', text: "Active play (bowling, laser tag, etc.)", type: "activity-based" },
      { id: 'd', text: "Food and social spaces", type: "hospitality-focused" }
    ],
    icon: "fas fa-gamepad"
  },
  {
    id: 3,
    question: "What's your ideal guest demographic?",
    options: [
      { id: 'a', text: "Young families with children", type: "family-focused" },
      { id: 'b', text: "Teenagers and young adults", type: "teen-centered" },
      { id: 'c', text: "Adult groups and corporate events", type: "adult-oriented" },
      { id: 'd', text: "All ages and demographics", type: "broad-appeal" }
    ],
    icon: "fas fa-users"
  },
  {
    id: 4,
    question: "What's your biggest challenge with your FEC?",
    options: [
      { id: 'a', text: "Getting started and initial concept", type: "startup" },
      { id: 'b', text: "Increasing revenue from existing operations", type: "optimization" },
      { id: 'c', text: "Keeping up with industry trends", type: "innovation" },
      { id: 'd', text: "Marketing and attracting new customers", type: "marketing" }
    ],
    icon: "fas fa-mountain"
  }
];

// FEC Types with descriptions
const fecTypes = {
  "family-focused": {
    title: "Family-Centered FEC",
    description: "You're all about creating magical experiences for families. Your ideal FEC focuses on inclusive attractions that bring parents and children together.",
    icon: "fas fa-child",
    color: "primary",
    recommendations: [
      "Multi-level play structures",
      "Family-friendly dining options",
      "Birthday party packages",
      "Interactive games for all ages"
    ]
  },
  "tech-forward": {
    title: "Technology-Forward FEC",
    description: "You're driven by the latest innovations. Your ideal FEC showcases cutting-edge attractions that wow guests with immersive experiences.",
    icon: "fas fa-vr-cardboard",
    color: "secondary",
    recommendations: [
      "VR and AR experiences",
      "Interactive projection games",
      "Advanced arcade systems",
      "Digital loyalty programs"
    ]
  },
  "activity-based": {
    title: "Activity-Based FEC",
    description: "You believe in active entertainment. Your ideal FEC gets people moving with exciting physical activities and competitive fun.",
    icon: "fas fa-running",
    color: "accent",
    recommendations: [
      "Laser tag arenas",
      "Bowling lanes",
      "Climbing walls",
      "Ninja warrior courses"
    ]
  },
  "hospitality-focused": {
    title: "Hospitality-Focused FEC",
    description: "You understand that food and atmosphere create memorable experiences. Your ideal FEC combines entertainment with exceptional dining options.",
    icon: "fas fa-utensils",
    color: "primary",
    recommendations: [
      "Chef-driven menu options",
      "Adult beverage program",
      "Comfortable lounge spaces",
      "Event hosting capabilities"
    ]
  },
  // Default type if no clear pattern emerges
  "hybrid": {
    title: "Hybrid Entertainment Destination",
    description: "You have a versatile vision. Your ideal FEC combines multiple entertainment concepts to appeal to a broad audience.",
    icon: "fas fa-dice",
    color: "secondary", 
    recommendations: [
      "Mix of active and passive attractions",
      "Scalable event spaces",
      "Multiple revenue streams",
      "Flexible layout design"
    ]
  }
};

// Default type if we can't determine a specific type
const defaultType = "hybrid";

export default function QuizLeadMagnet() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{[key: number]: string}>({});
  const [quizComplete, setQuizComplete] = useState(false);
  const [resultType, setResultType] = useState<keyof typeof fecTypes>(defaultType);
  const [showForm, setShowForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const quizRef = useRef<HTMLDivElement>(null);
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  });

  // Handle quiz toggle
  const toggleQuiz = () => {
    if (!isOpen) {
      setIsOpen(true);
    } else if (!quizComplete) {
      if (confirm("Are you sure you want to close the quiz? Your progress will be lost.")) {
        resetQuiz();
      }
    } else {
      resetQuiz();
    }
  };

  // Reset quiz state
  const resetQuiz = () => {
    setIsOpen(false);
    setCurrentQuestion(0);
    setAnswers({});
    setQuizComplete(false);
    setShowForm(false);
    setFormSubmitted(false);
  };

  // Handle answer selection
  const selectAnswer = (questionId: number, answerType: string) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    // Create updated answers
    const updatedAnswers = { ...answers, [questionId]: answerType };
    setAnswers(updatedAnswers);
    
    // Animate transition
    setTimeout(() => {
      // If this is the last question, calculate result
      if (currentQuestion >= quizQuestions.length - 1) {
        calculateResult(updatedAnswers);
        setQuizComplete(true);
      } else {
        setCurrentQuestion(currentQuestion + 1);
      }
      setIsAnimating(false);
    }, 500);
  };

  // Calculate FEC type based on answers
  const calculateResult = (finalAnswers: {[key: number]: string}) => {
    // Count occurrence of each type
    const typeCounts: {[key: string]: number} = {};
    
    Object.values(finalAnswers).forEach(type => {
      typeCounts[type] = (typeCounts[type] || 0) + 1;
    });
    
    // Find most common type
    let maxCount = 0;
    let resultFecType = defaultType;
    
    Object.entries(typeCounts).forEach(([type, count]) => {
      if (count > maxCount) {
        maxCount = count;
        resultFecType = type as keyof typeof fecTypes;
      }
    });
    
    // Set the result type
    setResultType(fecTypes[resultFecType as keyof typeof fecTypes] ? 
      resultFecType as keyof typeof fecTypes : 
      defaultType);
  };

  // Handle form submission
  const onSubmit = (data: FormData) => {
    // Here you would typically send this data to your CRM or email service
    console.log("Lead captured:", data, "FEC Type:", resultType);
    
    // Show confetti animation
    setConfetti(true);
    setTimeout(() => setConfetti(false), 3000);
    
    // Show thank you message
    setFormSubmitted(true);
  };

  // Click counter for easter egg
  const [clickCount, setClickCount] = useState(0);
  
  const handleIconClick = () => {
    setClickCount(prevCount => {
      const newCount = prevCount + 1;
      // Easter egg: if clicked 3 times, show confetti
      if (newCount === 3) {
        setConfetti(true);
        setTimeout(() => {
          setConfetti(false);
          return 0;
        }, 3000);
      }
      return newCount;
    });
  };

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        toggleQuiz();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, quizComplete]);

  // When quiz is completed, show lead form after a delay
  useEffect(() => {
    if (quizComplete && !showForm) {
      const timer = setTimeout(() => {
        setShowForm(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [quizComplete, showForm]);

  return (
    <div className="quiz-container">
      {/* Quiz toggle button */}
      <button 
        onClick={toggleQuiz}
        className="quiz-toggle bg-gradient-to-r from-primary to-accent text-white px-6 py-3 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center"
      >
        <i className={`fas fa-question-circle mr-2 text-xl ${clickCount > 0 ? 'animate-bounce' : ''}`} 
           onClick={(e) => { e.stopPropagation(); handleIconClick(); }}></i>
        {isOpen ? 'Close Quiz' : 'Discover Your FEC Type!'}
      </button>
      
      {/* Quiz modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div 
            ref={quizRef}
            className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative"
          >
            {/* Close button */}
            <button 
              onClick={toggleQuiz}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              aria-label="Close quiz"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
            
            <div className="p-6 md:p-8">
              {!quizComplete ? (
                /* Quiz questions */
                <div className="quiz-questions">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                      Which Type of FEC Are You?
                    </h3>
                    <p className="text-gray-600 mt-2">
                      Discover your ideal Family Entertainment Center concept
                    </p>
                    
                    {/* Progress indicator */}
                    <div className="w-full bg-gray-200 h-2 rounded-full mt-6 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
                        style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      Question {currentQuestion + 1} of {quizQuestions.length}
                    </div>
                  </div>
                  
                  <div className={`transition-all duration-500 ${isAnimating ? 'opacity-0 transform translate-x-10' : 'opacity-100'}`}>
                    {/* Current question */}
                    <div className="mb-6 flex items-center">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                        <i className={`${quizQuestions[currentQuestion].icon} text-primary text-xl`}></i>
                      </div>
                      <h4 className="text-xl font-semibold text-gray-800">
                        {quizQuestions[currentQuestion].question}
                      </h4>
                    </div>
                    
                    {/* Answer options */}
                    <div className="grid grid-cols-1 gap-4">
                      {quizQuestions[currentQuestion].options.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => selectAnswer(quizQuestions[currentQuestion].id, option.type)}
                          className={`text-left p-4 border-2 rounded-lg transition-all duration-300
                            ${answers[quizQuestions[currentQuestion].id] === option.type
                              ? 'border-primary bg-primary/5 shadow-md' 
                              : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'
                            }`}
                        >
                          <div className="flex items-center">
                            <div className={`h-6 w-6 rounded-full flex items-center justify-center mr-3 border transition-all
                              ${answers[quizQuestions[currentQuestion].id] === option.type
                                ? 'border-primary bg-primary text-white' 
                                : 'border-gray-300'
                              }`}
                            >
                              {answers[quizQuestions[currentQuestion].id] === option.type && (
                                <i className="fas fa-check text-xs"></i>
                              )}
                            </div>
                            <span className="text-gray-800">{option.text}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* Quiz results */
                <div className={`quiz-results ${showForm ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}>
                  {!formSubmitted ? (
                    <>
                      <div className="text-center">
                        <div className="inline-block p-4 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 mb-4">
                          <div className="h-20 w-20 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                            <i className={`${fecTypes[resultType].icon} text-white text-3xl`}></i>
                          </div>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                          You're a {fecTypes[resultType].title}!
                        </h3>
                        <p className="text-gray-600 mb-6 max-w-lg mx-auto">
                          {fecTypes[resultType].description}
                        </p>
                      </div>
                      
                      {/* Recommendations */}
                      <div className="bg-gray-50 rounded-lg p-6 mb-8">
                        <h4 className="font-bold text-lg mb-4">Our Recommendations for You:</h4>
                        <ul className="space-y-2">
                          {fecTypes[resultType].recommendations.map((rec, index) => (
                            <li key={index} className="flex items-start">
                              <i className="fas fa-check-circle text-primary mt-1 mr-2"></i>
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Lead generation form */}
                      {showForm && (
                        <div className="border-t pt-8">
                          <h4 className="text-xl font-bold text-gray-900 mb-4">
                            Get Your Personalized FEC Strategy:
                          </h4>
                          <p className="text-gray-600 mb-6">
                            Enter your info below to receive a custom report with detailed recommendations for your {fecTypes[resultType].title.toLowerCase()}.
                          </p>
                          
                          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                Your Name
                              </label>
                              <input
                                id="name"
                                type="text"
                                className={`w-full px-4 py-2 border rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="John Smith"
                                {...register('name')}
                              />
                              {errors.name && (
                                <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                              )}
                            </div>
                            
                            <div>
                              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address
                              </label>
                              <input
                                id="email"
                                type="email"
                                className={`w-full px-4 py-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="your@email.com"
                                {...register('email')}
                              />
                              {errors.email && (
                                <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                              )}
                            </div>
                            
                            <div>
                              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                                Company/FEC Name (Optional)
                              </label>
                              <input
                                id="company"
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                placeholder="Your Entertainment Center"
                                {...register('company')}
                              />
                            </div>
                            
                            <div className="pt-2">
                              <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-primary to-accent text-white py-3 rounded-md font-semibold hover:shadow-lg transition-all duration-300"
                              >
                                Get My Free FEC Strategy
                              </button>
                            </div>
                          </form>
                        </div>
                      )}
                    </>
                  ) : (
                    /* Thank you message */
                    <div className="text-center py-8">
                      <div className="inline-block p-6 rounded-full bg-green-100 mb-6">
                        <i className="fas fa-check-circle text-green-500 text-5xl"></i>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                        Thank You!
                      </h3>
                      <p className="text-gray-600 mb-8 max-w-md mx-auto">
                        Your personalized FEC strategy is on its way to your inbox. One of our consultants will reach out to discuss your results in detail.
                      </p>
                      <button
                        onClick={resetQuiz}
                        className="bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-50 transition-all"
                      >
                        Close
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Confetti effect */}
      {confetti && (
        <div className="confetti-container fixed inset-0 pointer-events-none z-[9999]">
          {[...Array(50)].map((_, i) => {
            const size = Math.random() * 10 + 5;
            const left = Math.random() * 100;
            const animationDelay = Math.random() * 2;
            const color = [
              'bg-primary', 'bg-secondary', 'bg-accent', 
              'bg-yellow-400', 'bg-blue-400', 'bg-pink-400'
            ][Math.floor(Math.random() * 6)];
            
            return (
              <div
                key={i}
                className={`confetti absolute ${color}`}
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  left: `${left}%`,
                  top: '-5%',
                  animationDelay: `${animationDelay}s`,
                }}
              ></div>
            );
          })}
        </div>
      )}
    </div>
  );
}