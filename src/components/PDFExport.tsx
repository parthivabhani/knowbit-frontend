import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface PDFExportProps {
  courseTitle: string;
}

const PDFExport = ({ courseTitle }: PDFExportProps) => {
  const { toast } = useToast();

  const handleExport = () => {
    // Placeholder: integrate with a PDF generation library later
    toast({
      title: "PDF Export",
      description: "PDF export feature will be available soon!",
    });
  };

  return (
    <div className="animate-fade-in text-center">
      <Button
        onClick={handleExport}
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
