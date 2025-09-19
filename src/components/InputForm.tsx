import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles } from "lucide-react";

interface InputFormProps {
  onSubmit: (topic: string) => void;
  isLoading: boolean;
}

const InputForm = ({ onSubmit, isLoading }: InputFormProps) => {
  const [topic, setTopic] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim() && !isLoading) {
      onSubmit(topic.trim());
    }
  };

  return (
    <div className="animate-fade-in">
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
        <div className="relative">
          <Input
            type="text"
            placeholder="Enter any topic (e.g., 'Basics of Python' or 'Digital Marketing')"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="text-lg py-6 pl-6 pr-32 rounded-2xl border-2 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-300"
            disabled={isLoading}
          />
          <Button
            type="submit"
            disabled={!topic.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 btn-brand px-6 py-3 rounded-xl font-semibold"
          >
            {isLoading ? (
              <div className="spinner" />
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Generate My Course
              </>
            )}
          </Button>
        </div>
        
        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          {["Python Basics", "Digital Marketing", "Web Design", "Data Science"].map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => setTopic(suggestion)}
              disabled={isLoading}
              className="px-4 py-2 text-sm bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-600 rounded-full transition-all duration-200 hover:scale-105"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </form>
    </div>
  );
};

export default InputForm;