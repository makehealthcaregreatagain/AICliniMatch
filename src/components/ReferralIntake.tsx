import { useState } from 'react';
import { Search, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import type { ConversationMessage, ExtractedReferralData, SpecialistMatch } from '../types';
import { simulateAIResponse, generateMatches } from '../utils/aiSimulator';

interface Props {
  onSubmit: (data: ExtractedReferralData, matches: SpecialistMatch[]) => void;
}

export default function ReferralIntake({ onSubmit }: Props) {
  const [input, setInput] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState<ExtractedReferralData>({});
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  // Hardcoded questions
  const questions = [
    "Great! What's the patient's location (city or ZIP code)?",
    "Got it. What's the urgency level? (routine, urgent, or stat)",
    "Perfect. What insurance does the patient have?"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    const currentInput = input.trim();
    setInput('');
    setIsProcessing(true);

    if (!hasStarted) {
      // First message - extract condition
      setHasStarted(true);
      setTimeout(() => {
        const { data } = simulateAIResponse(currentInput, extractedData);
        setExtractedData({ ...extractedData, ...data });
        setCurrentQuestion(questions[0]);
        setQuestionIndex(0);
        setIsProcessing(false);
      }, 800);
    } else {
      // Subsequent questions
      setTimeout(() => {
        const { data } = simulateAIResponse(currentInput, extractedData);
        setExtractedData({ ...extractedData, ...data });
        
        if (questionIndex < questions.length - 1) {
          // More questions
          setQuestionIndex(questionIndex + 1);
          setCurrentQuestion(questions[questionIndex + 1]);
          setIsProcessing(false);
        } else {
          // Done!
          setIsComplete(true);
          setIsProcessing(false);
        }
      }, 800);
    }
  };

  const handleFindMatches = () => {
    console.log('Extracted Data:', extractedData);
    const matches = generateMatches(extractedData);
    console.log('Generated Matches:', matches.length, matches);
    onSubmit(extractedData, matches);
  };

  return (
    <div className="animate-fade-in max-w-5xl mx-auto">
      {/* Header - disappears after first message */}
      {!hasStarted && (
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Find the right specialist for your patient</h2>
          <p className="text-lg text-gray-600">
            Describe your patient's condition and I'll help you find the best match
          </p>
        </div>
      )}

      {/* Current AI Question - appears ABOVE search bar after first message */}
      {hasStarted && !isComplete && (
        <div className="max-w-3xl mx-auto mb-6">
          {/* Show current question */}
          {currentQuestion && !isProcessing && (
            <div className="animate-slide-up">
              <div className="bg-gray-100 rounded-2xl px-6 py-5 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-semibold text-blue-600">AI Assistant</span>
                </div>
                <p className="text-base text-gray-900 leading-relaxed">
                  {currentQuestion}
                </p>
              </div>
            </div>
          )}
          
          {/* Processing indicator */}
          {isProcessing && (
            <div className="bg-gray-100 rounded-2xl px-6 py-5 border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="flex space-x-1">
                  <div className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
                <span className="text-sm text-gray-600">Thinking...</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Search Bar - always visible */}
      <form onSubmit={handleSubmit} className="relative mb-6">
        <div className="flex items-center bg-white rounded-2xl shadow-lg border-2 border-gray-200 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100 transition-all">
          <Search className="w-6 h-6 text-gray-400 ml-6" />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={hasStarted ? 'Type your response...' : 'e.g., "28-year-old with cystic fibrosis, needs urgent consultation"'}
            className="flex-1 px-6 py-5 text-lg rounded-2xl focus:outline-none"
            autoFocus
            disabled={isProcessing}
          />
          <button
            type="submit"
            disabled={!input.trim() || isProcessing}
            className="m-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg"
          >
            <Sparkles className="w-5 h-5" />
            {hasStarted ? 'Send' : 'Search'}
          </button>
        </div>
      </form>

      {/* Example buttons - only show before first message */}
      {!hasStarted && (
        <div className="text-center mb-8">
          <p className="text-sm text-gray-500 mb-3">Try these examples:</p>
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setInput("Patient with cystic fibrosis, urgent, Blue Cross insurance")}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-700 transition-colors"
            >
              Cystic fibrosis referral
            </button>
            <button
              onClick={() => setInput("Huntington's disease patient needs genetic counseling")}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-700 transition-colors"
            >
              Huntington's disease
            </button>
            <button
              onClick={() => setInput("67yo with osteoradionecrosis after radiation therapy")}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-700 transition-colors"
            >
              Post-radiation complication
            </button>
          </div>
        </div>
      )}

      {/* Show "Find Matching Specialists" button when complete */}
      {isComplete && (
        <div className="max-w-3xl mx-auto text-center mt-8">
          <div className="bg-green-50 border border-green-200 rounded-2xl px-6 py-5 mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
              <span className="text-lg font-semibold text-green-900">All set!</span>
            </div>
            <p className="text-gray-700">I have all the information needed to find the best specialists.</p>
          </div>
          <button
            onClick={handleFindMatches}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 mx-auto text-lg"
          >
            <Sparkles className="w-5 h-5" />
            Find Matching Specialists
          </button>
        </div>
      )}
    </div>
  );
}

function DataField({ label, value, icon }: { label: string; value?: string; icon: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <p className="text-xs font-medium text-gray-500">{label}</p>
        <p className={`text-sm font-medium mt-0.5 ${value ? 'text-gray-900' : 'text-gray-400'}`}>
          {value || 'Not specified'}
        </p>
      </div>
      {icon}
    </div>
  );
}

