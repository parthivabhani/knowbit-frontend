// Dynamic API service that returns hardcoded course data with relevant links
export interface CourseData {
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

export const generateCourse = async (topic: string): Promise<CourseData> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  return {
    title: `Master ${topic}`,
    duration: "5 Days",
    summary: `A comprehensive mini-course designed to take you from beginner to confident in ${topic}. This structured learning path combines theory with practical exercises to ensure you gain real-world applicable skills.`,
    totalLessons: 15,
    estimatedTime: "2-3 hours/day",
    days: [
      {
        day: 1,
        title: "Foundation & Setup",
        goals: [
          "Understand the basics and core concepts",
          "Set up your learning environment",
          "Complete your first practical exercise"
        ],
        concepts: [
          "Core terminology and definitions",
          "Historical context and importance",
          "Basic principles and frameworks"
        ],
        exercises: [
          "Environment setup checklist",
          "Basic terminology quiz",
          "First hands-on project"
        ]
      },
      {
        day: 2,
        title: "Building Fundamentals",
        goals: [
          "Master the essential building blocks",
          "Practice core techniques",
          "Build confidence through repetition"
        ],
        concepts: [
          "Essential tools and techniques",
          "Best practices and conventions",
          "Common patterns and approaches"
        ],
        exercises: [
          "Guided practice exercises",
          "Tool familiarization",
          "Mini project implementation"
        ]
      },
      {
        day: 3,
        title: "Intermediate Concepts",
        goals: [
          "Explore advanced features",
          "Understand complex relationships",
          "Apply knowledge to real scenarios"
        ],
        concepts: [
          "Advanced techniques and methods",
          "Integration with other systems",
          "Performance and optimization"
        ],
        exercises: [
          "Complex problem solving",
          "Integration challenges",
          "Performance optimization tasks"
        ]
      },
      {
        day: 4,
        title: "Practical Application",
        goals: [
          "Build a complete project",
          "Apply all learned concepts",
          "Troubleshoot common issues"
        ],
        concepts: [
          "Project architecture and planning",
          "Testing and validation methods",
          "Debugging and troubleshooting"
        ],
        exercises: [
          "Complete project build",
          "Testing and validation",
          "Code review and improvement"
        ]
      },
      {
        day: 5,
        title: "Mastery & Next Steps",
        goals: [
          "Solidify your understanding",
          "Explore advanced topics",
          "Plan your continued learning"
        ],
        concepts: [
          "Advanced patterns and architectures",
          "Industry best practices",
          "Future trends and developments"
        ],
        exercises: [
          "Final capstone project",
          "Peer review and feedback",
          "Learning roadmap creation"
        ]
      }
    ],
    resources: [
      {
        title: `${topic} Complete Guide - YouTube`,
        type: "video",
        url: `https://www.youtube.com/results?search_query=${encodeURIComponent(topic)}`,
        description: `Comprehensive video series covering all aspects of ${topic}`
      },
      {
        title: `Ultimate ${topic} Handbook`,
        type: "pdf",
        url: `https://www.pdfdrive.com/search?q=${encodeURIComponent(topic)}`,
        description: `Detailed reference guide with step-by-step instructions and best practices`
      },
      {
        title: `${topic} Community Blog`,
        type: "article",
        url: `https://medium.com/search?q=${encodeURIComponent(topic)}`,
        description: `Latest insights, tutorials, and community discussions about ${topic}`
      },
      {
        title: `Interactive ${topic} Tutorial`,
        type: "article",
        url: `https://www.w3schools.com/${topic.replace(/\s+/g, "-").toLowerCase()}/`,
        description: `Hands-on interactive exercises to practice your skills in a guided environment`
      }
    ]
  };
};
