import { Book } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
            <Book className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Knowbit
          </span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="#about" className="text-slate-600 hover:text-blue-600 transition-colors duration-200">
            About
          </a>
          <a href="#contact" className="text-slate-600 hover:text-blue-600 transition-colors duration-200">
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;