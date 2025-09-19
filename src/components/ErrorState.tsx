import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  onRetry: () => void;
}

const ErrorState = ({ onRetry }: ErrorStateProps) => {
  return (
    <div className="animate-fade-in text-center py-16">
      <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
        <AlertCircle className="w-8 h-8 text-red-500" />
      </div>
      
      <h2 className="text-2xl font-bold text-slate-800 mb-4">
        Oops! Something went wrong
      </h2>
      
      <p className="text-slate-600 mb-8 max-w-md mx-auto">
        We couldn't generate your course right now. Please try again or check your connection.
      </p>
      
      <Button
        onClick={onRetry}
        className="btn-brand px-6 py-3 rounded-xl font-semibold"
      >
        <RefreshCw className="w-5 h-5 mr-2" />
        Try Again
      </Button>
    </div>
  );
};

export default ErrorState;