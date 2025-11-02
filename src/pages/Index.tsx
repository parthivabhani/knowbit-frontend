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

// Dynamically choose backend URL
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

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
      const response = await fetch(`${API_BASE_URL}/generate-course`, {
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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Initial Landing View */}
        {!courseData && !isLoading && !error && (
          <>
            <div className="text-center py-16 animate-fade-in">
              <div className="mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full mb-6 shadow-lg">
                  <GraduationCap className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                  <span className="text-blue-700">Personalized</span>
                  <br />
                  Mini-Courses on Any Topic
                </h1>
                <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  Turn any subject into a structured learning plan. 
                  Get AI-powered courses tailored just for you.
                </p>
              </div>

              <InputForm onSubmit={handleGenerateCourse} isLoading={isLoading} />
            </div>

            <div className="py-16 animate-slide-up">
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: <Sparkles className="w-6 h-6 text-cyan-600" />,
                    title: "AI-Powered",
                    description: "Smartly designed courses built from your topic instantly.",
                  },
                  {
                    icon: <GraduationCap className="w-6 h-6 text-blue-600" />,
                    title: "Structured Learning",
                    description: "Clear goals, key concepts, and practice plans each day.",
                  },
                  {
                    icon: <Sparkles className="w-6 h-6 text-cyan-600" />,
                    title: "Resource Rich",
                    description: "Curated materials and links to enhance your understanding.",
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="text-center bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-slate-100 rounded-xl mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
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

      {/* About Section */}
<section id="about" className="py-16 bg-gray-50 text-center">
  <h2 className="text-3xl font-bold text-slate-800 mb-4">About Knowbit</h2>
  <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
    Knowbit is your AI-powered learning companion that transforms any topic into a structured mini-course. 
    Our goal is to make self-learning simple, efficient, and enjoyable — helping you master new skills 
    faster with daily goals, exercises, and curated resources.
  </p>
</section>

{/* Contact Section */}
<section id="contact" className="py-16 text-center">
  <h2 className="text-3xl font-bold text-slate-800 mb-4">Contact Us</h2>
  <p className="text-lg text-slate-600 mb-6">
    Have questions, feedback, or ideas? We’d love to hear from you.
  </p>
  <a
    href="mailto:team@knowbit.com"
    className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition-all duration-200"
  >
    Send us an Email
  </a>
</section>


      <Footer />
    </div>
  );
};

export default Index;
