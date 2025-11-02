import { jsPDF } from "jspdf";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PDFExportProps {
  courseData: {
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
  };
}

const PDFExport = ({ courseData }: PDFExportProps) => {
  const { toast } = useToast();

  const PAGE_HEIGHT = 297; // A4 vertical
  const MARGIN = 10;

  const generatePDF = () => {
    try {
      const doc = new jsPDF("p", "mm", "a4");
      let y = MARGIN;

      // Title
      doc.setFontSize(22);
      doc.setFont(undefined, "bold");
      doc.setTextColor(0, 51, 102);
      doc.text(courseData.title, 105, y, { align: "center" });
      y += 6;
      doc.setDrawColor(0, 51, 102);
      doc.setLineWidth(1.5);
      doc.line(MARGIN, y, 210 - MARGIN, y);
      y += 12;

      // Summary & info
      doc.setFontSize(12);
      doc.setFont(undefined, "normal");
      doc.setTextColor(0, 0, 0);
      doc.text(`Duration: ${courseData.duration}`, MARGIN, y);
      y += 6;
      doc.text(`Estimated Time: ${courseData.estimatedTime}`, MARGIN, y);
      y += 6;
      doc.text(`Total Lessons: ${courseData.totalLessons}`, MARGIN, y);
      y += 8;

      doc.setFont(undefined, "bold");
      doc.text("Course Summary:", MARGIN, y);
      doc.setFont(undefined, "normal");
      y += 5;
      const splitSummary = doc.splitTextToSize(courseData.summary, 190 - 2 * MARGIN);
      doc.text(splitSummary, MARGIN, y);
      y += splitSummary.length * 6 + 10;

      // 5-Day Plan
      courseData.days.forEach((day, index) => {
        const lineHeight = 6;
        const sectionSpacing = 4;
        const bulletHeight = 7;
        const paddingBottom = 4; // reduced to give breathing room
        const extraGoalSpacing = 4; // space between day header and goals

        const goalsHeight = day.goals.length * bulletHeight + lineHeight + sectionSpacing;
        const conceptsHeight = day.concepts.length * bulletHeight + lineHeight + sectionSpacing;
        const exercisesHeight = day.exercises.length * bulletHeight + lineHeight + sectionSpacing;
        const dayHeaderHeight = 12;

        const totalDayHeight = dayHeaderHeight + goalsHeight + conceptsHeight + exercisesHeight + paddingBottom + extraGoalSpacing;

        if (y + totalDayHeight > PAGE_HEIGHT - MARGIN) {
          doc.addPage();
          y = MARGIN;
        }

        // Alternating background
        doc.setFillColor(index % 2 === 0 ? 240 : 255, index % 2 === 0 ? 240 : 255, index % 2 === 0 ? 240 : 255);
        doc.rect(MARGIN, y - 2, 210 - 2 * MARGIN, totalDayHeight, "F");

        // Day header
        doc.setFillColor(0, 102, 204);
        doc.rect(MARGIN + 4, y, 202 - 2 * MARGIN, 8, "F");
        doc.setFont(undefined, "bold");
        doc.setFontSize(14);
        doc.setTextColor(255, 255, 255);
        doc.text(`Day ${day.day}: ${day.title}`, MARGIN + 6, y + 6);
        y += dayHeaderHeight + extraGoalSpacing;

        // Goals
        doc.setFont(undefined, "bold");
        doc.setFontSize(12);
        doc.setTextColor(0, 51, 102);
        doc.text("Goals:", MARGIN + 4, y);
        doc.setFont(undefined, "normal");
        doc.setFontSize(13);
        y += 6;
        day.goals.forEach((goal) => {
          doc.circle(MARGIN + 6, y - 2, 1.5, "F");
          doc.text(goal, MARGIN + 10, y);
          y += bulletHeight;
        });
        y += 4;

        // Concepts
        doc.setFont(undefined, "bold");
        doc.setFontSize(12);
        doc.text("Key Concepts:", MARGIN + 4, y);
        doc.setFont(undefined, "normal");
        doc.setFontSize(13);
        y += 6;
        day.concepts.forEach((concept) => {
          doc.circle(MARGIN + 6, y - 2, 1.5, "F");
          doc.text(concept, MARGIN + 10, y);
          y += bulletHeight;
        });
        y += 4;

        // Exercises
        doc.setFont(undefined, "bold");
        doc.setFontSize(12);
        doc.text("Exercises:", MARGIN + 4, y);
        doc.setFont(undefined, "normal");
        doc.setFontSize(13);
        y += 6;
        day.exercises.forEach((ex) => {
          if (y + bulletHeight > PAGE_HEIGHT - MARGIN) {
            doc.addPage();
            y = MARGIN + 6;
          }
          doc.circle(MARGIN + 6, y - 2, 1.5, "F");
          doc.text(ex, MARGIN + 10, y);
          y += bulletHeight;
        });

        y += paddingBottom;

        // Horizontal separator outside the gray box
        doc.setDrawColor(180, 180, 180); // slightly darker for better visibility
        doc.setLineWidth(0.4);
        doc.line(MARGIN, y + 2, 210 - MARGIN, y + 2);

        y += 8; // extra space after separator before next day
      });

      // Add breathing space before resources
      y += 6;

      // Resources
      doc.setFont(undefined, "bold");
      doc.setFontSize(14);
      doc.setTextColor(0, 102, 204);
      if (y + 20 > PAGE_HEIGHT - MARGIN) {
        doc.addPage();
        y = MARGIN;
      }
      doc.text("Resources:", MARGIN + 4, y);
      doc.setFont(undefined, "normal");
      doc.setFontSize(12);
      y += 6;

      courseData.resources.forEach((res) => {
        if (y + 10 > PAGE_HEIGHT - MARGIN) {
          doc.addPage();
          y = MARGIN;
        }
        doc.setTextColor(0, 51, 153);
        doc.textWithLink(`${res.title} (${res.type})`, MARGIN + 4, y, { url: res.url });
        y += 5;
        if (res.description) {
          doc.setTextColor(0, 0, 0);
          const splitDesc = doc.splitTextToSize(res.description, 190 - 2 * MARGIN);
          doc.text(splitDesc, MARGIN + 8, y);
          y += splitDesc.length * 5;
        }
        y += 5;
      });

      doc.save(`${courseData.title}.pdf`);
      toast({
        title: "PDF Exported",
        description: "Your course PDF has been generated successfully!",
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "PDF Export Failed",
        description: "Something went wrong while generating the PDF.",
      });
    }
  };

  return (
    <div className="text-center animate-fade-in mt-6">
      <Button
        onClick={generatePDF}
        className="btn-outline-brand px-8 py-4 text-lg font-semibold rounded-2xl"
      >
        <Download className="w-5 h-5 mr-2" />
        Download as PDF
      </Button>
      <p className="text-sm text-slate-500 mt-3">
        Export your personalized mini-course for offline learning
      </p>
    </div>
  );
};

export default PDFExport;
