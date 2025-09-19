import { Sparkles, Book, Target } from "lucide-react";

const LoadingState = () => {
  return (
    <div className="animate-fade-in text-center py-16">
      <div className="relative mx-auto w-24 h-24 mb-8">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
        <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
          <Sparkles className="w-8 h-8 text-blue-500 animate-bounce" />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-slate-800 mb-4">
        Crafting Your Perfect Course
      </h2>
      
      <p className="text-slate-600 mb-8 max-w-md mx-auto">
        Our AI is analyzing your topic and creating a personalized learning journey just for you...
      </p>
      
      <div className="flex items-center justify-center gap-8 text-sm text-slate-500">
        <div className="flex items-center gap-2">
          <Book className="w-4 h-4" />
          <span>Structuring content</span>
        </div>
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4" />
          <span>Setting goals</span>
        </div>
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          <span>Adding resources</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingState;