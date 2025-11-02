const Navbar = () => {
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Left section: Logo and Brand Name */}
        <div className="flex items-center space-x-3">
          <img
            src="/K.png"
            alt="KnowBit Logo"
            className="h-10 w-auto object-contain"
          />
          <span className="text-2xl font-bold text-black">
            KnowBit.
          </span>
        </div>

        {/* Right section: Nav links */}
        <div className="hidden md:flex items-center space-x-8">
          <a
            href="#about"
            className="text-slate-600 hover:text-blue-600 transition-colors duration-200"
          >
            About
          </a>
          <a
            href="#contact"
            className="text-slate-600 hover:text-blue-600 transition-colors duration-200"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
