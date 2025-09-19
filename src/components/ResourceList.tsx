import { ExternalLink, Youtube, FileText, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Resource {
  title: string;
  type: "video" | "article" | "pdf";
  url: string;
  description: string;
}

interface ResourceListProps {
  resources: Resource[];
}

const ResourceList = ({ resources }: ResourceListProps) => {
  const getIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Youtube className="w-5 h-5 text-red-500" />;
      case "pdf":
        return <FileText className="w-5 h-5 text-blue-500" />;
      default:
        return <Globe className="w-5 h-5 text-green-500" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "video":
        return "Video";
      case "pdf":
        return "PDF";
      default:
        return "Article";
    }
  };

  return (
    <Card className="card-gradient animate-slide-up">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <ExternalLink className="w-6 h-6 text-blue-500" />
          Recommended Resources
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid gap-4">
          {resources.map((resource, index) => (
            <a
              key={index}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 bg-white/60 rounded-xl border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-blue-50 transition-colors duration-200">
                  {getIcon(resource.type)}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors duration-200">
                      {resource.title}
                    </h3>
                    <span className="px-2 py-1 text-xs font-medium bg-slate-100 text-slate-600 rounded-full">
                      {getTypeLabel(resource.type)}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {resource.description}
                  </p>
                </div>

                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors duration-200" />
              </div>
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ResourceList;
