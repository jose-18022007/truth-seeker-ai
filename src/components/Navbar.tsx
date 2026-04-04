import { Link, useLocation } from "react-router-dom";
import { Shield, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4">
      <nav
        className={`w-full max-w-4xl rounded-2xl border transition-all duration-300 ${
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-border shadow-elevated"
            : "bg-background/50 backdrop-blur-md border-border/40"
        }`}
      >
        <div className="flex items-center justify-between h-14 px-5">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="gradient-primary p-1.5 rounded-lg">
              <Shield className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold tracking-tight text-foreground">
              Truth<span className="gradient-text">Weave</span>
            </span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-6 shrink-0">
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
              <button className="gradient-primary text-primary-foreground px-4 py-1.5 rounded-lg text-sm font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200">
                Start Checking
              </button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden border-t border-border/50"
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
    </header>
  );
};

export default Navbar;
