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
      notes?: string;
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
      splitSummary.forEach((line) => {
        if (y + 6 > PAGE_HEIGHT - MARGIN) {
          doc.addPage();
          y = MARGIN;
        }
        doc.text(line, MARGIN, y);
        y += 6;
      });
      y += 10;

      // 5-Day Plan with proper wrapping
      courseData.days.forEach((day) => {
        const sectionSpacing = 4;
        const bulletHeight = 6;

        // Day header
        if (y + 12 > PAGE_HEIGHT - MARGIN) {
          doc.addPage();
          y = MARGIN;
        }
        doc.setFont(undefined, "bold");
        doc.setFontSize(14);
        doc.setTextColor(0, 51, 102);
        doc.text(`Day ${day.day}: ${day.title}`, MARGIN, y);
        y += 8;

        // Goals
        doc.setFont(undefined, "bold");
        doc.setFontSize(12);
        doc.text("Goals:", MARGIN, y);
        y += 6;
        doc.setFont(undefined, "normal");
        doc.setFontSize(13);

        day.goals.forEach((goal) => {
          const lines = doc.splitTextToSize(goal, 190 - 2 * MARGIN - 6);
          if (y + lines.length * bulletHeight > PAGE_HEIGHT - MARGIN) {
            doc.addPage();
            y = MARGIN;
          }
          doc.circle(MARGIN + 2, y - 2, 1.5, "F");
          lines.forEach((line) => {
            doc.text(line, MARGIN + 6, y);
            y += bulletHeight;
          });
          y += 2;
        });
        y += sectionSpacing;

        // Concepts
        doc.setFont(undefined, "bold");
        doc.setFontSize(12);
        doc.text("Key Concepts:", MARGIN, y);
        y += 6;
        doc.setFont(undefined, "normal");
        doc.setFontSize(13);

        day.concepts.forEach((concept) => {
          const lines = doc.splitTextToSize(concept, 190 - 2 * MARGIN - 6);
          if (y + lines.length * bulletHeight > PAGE_HEIGHT - MARGIN) {
            doc.addPage();
            y = MARGIN;
          }
          doc.circle(MARGIN + 2, y - 2, 1.5, "F");
          lines.forEach((line) => {
            doc.text(line, MARGIN + 6, y);
            y += bulletHeight;
          });
          y += 2;
        });
        y += sectionSpacing;

        // Exercises
        doc.setFont(undefined, "bold");
        doc.setFontSize(12);
        doc.text("Exercises:", MARGIN, y);
        y += 6;
        doc.setFont(undefined, "normal");
        doc.setFontSize(13);

        day.exercises.forEach((ex) => {
          const lines = doc.splitTextToSize(ex, 190 - 2 * MARGIN - 6);
          if (y + lines.length * bulletHeight > PAGE_HEIGHT - MARGIN) {
            doc.addPage();
            y = MARGIN;
          }
          doc.circle(MARGIN + 2, y - 2, 1.5, "F");
          lines.forEach((line) => {
            doc.text(line, MARGIN + 6, y);
            y += bulletHeight;
          });
          y += 2;
        });
        y += sectionSpacing;

        // Notes
        if (day.notes) {
          doc.setFont(undefined, "bold");
          doc.setFontSize(12);
          doc.setTextColor(0, 51, 102);
          doc.text("Notes:", MARGIN, y);
          y += 6;
          doc.setFont(undefined, "normal");
          doc.setFontSize(12);
          const noteLines = doc.splitTextToSize(day.notes, 190 - 2 * MARGIN);
          noteLines.forEach((line) => {
            if (y + 6 > PAGE_HEIGHT - MARGIN) {
              doc.addPage();
              y = MARGIN;
            }
            doc.text(line, MARGIN, y);
            y += 6;
          });
          y += sectionSpacing;
        }

        // Horizontal separator
        doc.setDrawColor(180, 180, 180);
        doc.setLineWidth(0.4);
        if (y + 2 > PAGE_HEIGHT - MARGIN) {
          doc.addPage();
          y = MARGIN;
        }
        doc.line(MARGIN, y + 2, 210 - MARGIN, y + 2);
        y += 8;
      });

      // Resources
      doc.setFont(undefined, "bold");
      doc.setFontSize(14);
      doc.setTextColor(0, 102, 204);
      if (y + 20 > PAGE_HEIGHT - MARGIN) {
        doc.addPage();
        y = MARGIN;
      }
      doc.text("Resources:", MARGIN, y);
      y += 6;
      doc.setFont(undefined, "normal");
      doc.setFontSize(12);

      courseData.resources.forEach((res) => {
        const lines = doc.splitTextToSize(`${res.title} (${res.type})`, 190 - 2 * MARGIN);
        if (y + lines.length * 5 > PAGE_HEIGHT - MARGIN) {
          doc.addPage();
          y = MARGIN;
        }
        doc.setTextColor(0, 51, 153);
        doc.textWithLink(`${res.title} (${res.type})`, MARGIN, y, { url: res.url });
        y += 5;

        if (res.description) {
          const descLines = doc.splitTextToSize(res.description, 190 - 2 * MARGIN);
          doc.setTextColor(0, 0, 0);
          descLines.forEach((line) => {
            if (y + 5 > PAGE_HEIGHT - MARGIN) {
              doc.addPage();
              y = MARGIN;
            }
            doc.text(line, MARGIN + 4, y);
            y += 5;
          });
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
