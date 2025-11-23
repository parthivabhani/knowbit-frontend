import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-100 py-8 mt-16">
      <div className="container mx-auto px-4 text-center">
        <p className="text-slate-600 flex items-center justify-center gap-2">
          Made with <Heart className="w-4 h-4 text-red-500" /> by the KnowBit Team
        </p>
        <p className="text-sm text-slate-500 mt-2">
          © {new Date().getFullYear()} KnowBit. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
