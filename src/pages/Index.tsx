import { useState } from "react";
import { Sparkles, GraduationCap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InputForm from "@/components/InputForm";
import CourseOverview from "@/components/CourseOverview";
import DayTimeline from "@/components/DayTimeline";
import ResourceList from "@/components/ResourceList";
import PDFExport from "@/components/PDFExport";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";

interface CourseData {
  title: string;
  duration: string;
  summary: string;
  totalLessons: number;
  estimatedTime: string;
  days: Array<{
    day: number;
    title: string;
    goals: string[];
    concepts: string[];
    exercises: string[];
  }>;
  resources: Array<{
    title: string;
    type: "video" | "article" | "pdf";
    url: string;
    description: string;
  }>;
}

const Index = () => {
  const [courseData, setCourseData] = useState<CourseData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentTopic, setCurrentTopic] = useState("");

  const handleGenerateCourse = async (topic: string) => {
    setIsLoading(true);
    setError(false);
    setCurrentTopic(topic);

    try {
      const response = await fetch("http://localhost:5000/generate-course", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate course");
      }

      const data: CourseData = await response.json();
      setCourseData(data);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    if (currentTopic) handleGenerateCourse(currentTopic);
  };

  const handleReset = () => {
    setCourseData(null);
    setError(false);
    setCurrentTopic("");
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Initial Landing View */}
        {!courseData && !isLoading && !error && (
          <>
            <div className="text-center py-16 animate-fade-in">
              <div className="mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6 shadow-lg">
                  <GraduationCap className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-slate-800 mb-6">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Personalized
                  </span>
                  <br />
                  Mini-Courses on Any Topic
                </h1>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                  Transform any subject into a structured, personalized learning journey. 
                  Get AI-powered courses tailored to your learning style and pace.
                </p>
              </div>

              <InputForm onSubmit={handleGenerateCourse} isLoading={isLoading} />
            </div>

            <div className="py-16 animate-slide-up">
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: <Sparkles className="w-6 h-6 text-blue-500" />,
                    title: "AI-Powered",
                    description: "Advanced algorithms create personalized learning paths",
                  },
                  {
                    icon: <GraduationCap className="w-6 h-6 text-purple-500" />,
                    title: "Structured Learning",
                    description: "Day-by-day breakdown with clear goals and exercises",
                  },
                  {
                    icon: <Sparkles className="w-6 h-6 text-blue-500" />,
                    title: "Resource Rich",
                    description: "Curated materials from the best sources on the web",
                  },
                ].map((feature, index) => (
                  <div key={index} className="text-center card-gradient p-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-slate-100 rounded-lg mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Loading and Error States */}
        {isLoading && <LoadingState />}
        {error && <ErrorState onRetry={handleRetry} />}

        {/* Generated Course Display */}
        {courseData && (
          <div className="space-y-12">
            <div className="text-center">
              <button
                onClick={handleReset}
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
              >
                ← Generate another course
              </button>
            </div>

            {/* This section will be captured in the PDF */}
            <div id="course-content">
              <CourseOverview course={courseData} />
              <DayTimeline days={courseData.days} />
              <ResourceList resources={courseData.resources} />
            </div>

            {/* PDF Export Button */}
            <PDFExport courseData={courseData} />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Index;
