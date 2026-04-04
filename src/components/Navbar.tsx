import { Link, useLocation } from "react-router-dom";
import { Shield, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isHome = location.pathname === "/";

  return (
    <nav className="sticky top-0 z-50 glass-card">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="gradient-primary p-2 rounded-lg">
            <Shield className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">
            Truth<span className="gradient-text">Weave</span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors ${isHome ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
          >
            Home
          </Link>
          <Link
            to="/analyze"
            className={`text-sm font-medium transition-colors ${location.pathname === "/analyze" ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
          >
            Analyze
          </Link>
          <Link to="/analyze">
            <button className="gradient-primary text-primary-foreground px-5 py-2 rounded-lg text-sm font-semibold hover:shadow-lg transition-all duration-200">
              Start Checking
            </button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-border"
          >
            <div className="flex flex-col gap-3 p-4">
              <Link to="/" className="text-sm font-medium text-foreground" onClick={() => setMobileOpen(false)}>Home</Link>
              <Link to="/analyze" className="text-sm font-medium text-foreground" onClick={() => setMobileOpen(false)}>Analyze</Link>
              <Link to="/analyze" onClick={() => setMobileOpen(false)}>
                <button className="gradient-primary text-primary-foreground w-full py-2.5 rounded-lg text-sm font-semibold">
                  Start Checking
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
