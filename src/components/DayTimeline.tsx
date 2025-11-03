import { CheckCircle, Circle, Target, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Day {
  day: number;
  title: string;
  goals: string[];
  concepts: string[];
  exercises: string[];
}

interface DayTimelineProps {
  days: Day[];
}

const DayTimeline = ({ days }: DayTimelineProps) => {
  return (
    <div className="animate-slide-up">
      <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">
       <br>Learning Journey
      </h2>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-600 opacity-30"></div>

        <div className="space-y-8">
          {days.map((day) => (
            <div key={day.day} className="relative flex items-start gap-6">
              {/* Timeline marker */}
              <div className="relative z-10 flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-lg">
                <span className="text-white font-bold text-lg">{day.day}</span>
              </div>

              {/* Content */}
              <Card className="flex-1 card-gradient hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-4">
                    Day {day.day}: {day.title}
                  </h3>

                  <div className="grid md:grid-cols-3 gap-4">
                    {/* Goals */}
                    <div>
                      <h4 className="font-semibold text-blue-600 mb-3 flex items-center gap-2">
                        <Target className="w-4 h-4" />
                        Learning Goals
                      </h4>
                      <ul className="space-y-2">
                        {day.goals.map((goal, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                            <Circle className="w-3 h-3 mt-1 text-blue-400 flex-shrink-0" />
                            {goal}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Concepts */}
                    <div>
                      <h4 className="font-semibold text-purple-600 mb-3 flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        Key Concepts
                      </h4>
                      <ul className="space-y-2">
                        {day.concepts.map((concept, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                            <Circle className="w-3 h-3 mt-1 text-purple-400 flex-shrink-0" />
                            {concept}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Exercises */}
                    <div>
                      <h4 className="font-semibold text-blue-600 mb-3 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Exercises
                      </h4>
                      <ul className="space-y-2">
                        {day.exercises.map((exercise, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                            <Circle className="w-3 h-3 mt-1 text-blue-400 flex-shrink-0" />
                            {exercise}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DayTimeline;
