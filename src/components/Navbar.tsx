import { Book } from "lucide-react";

const Navbar = () => {
  const handleScroll = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img src="/K.png" alt="KnowBit Logo" className="w-8 h-8" />
          <span className="text-2xl font-bold text-black">
            KnowBit.
          </span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <button 
            onClick={() => handleScroll("about")}
            className="text-slate-600 hover:text-blue-600 transition-colors duration-200"
          >
            About
          </button>
          <button 
            onClick={() => handleScroll("contact")}
            className="text-slate-600 hover:text-blue-600 transition-colors duration-200"
          >
            Contact
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
