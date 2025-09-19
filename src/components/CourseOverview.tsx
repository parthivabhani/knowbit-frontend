import { Clock, BookOpen, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CourseOverviewProps {
  course: {
    title: string;
    duration: string;
    summary: string;
    totalLessons: number;
    estimatedTime: string;
  };
}

const CourseOverview = ({ course }: CourseOverviewProps) => {
  return (
    <Card className="card-brand animate-bounce-in">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-slate-800 mb-2">
          {course.title}
        </CardTitle>
        <div className="flex items-center justify-center gap-6 text-slate-600">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-500" />
            <span className="font-medium">{course.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-purple-500" />
            <span className="font-medium">{course.totalLessons} Lessons</span>
          </div>
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-500" />
            <span className="font-medium">{course.estimatedTime}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="bg-white/60 rounded-xl p-6 border border-blue-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-500" />
            Course Overview
          </h3>
          <p className="text-slate-600 leading-relaxed">
            {course.summary}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseOverview;
