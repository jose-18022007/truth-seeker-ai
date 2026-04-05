import { Link, useLocation } from "react-router-dom";
import { Shield, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
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
    <motion.nav
      initial={{ x: "-50%", y: -60, opacity: 0 }}
      animate={{ x: "-50%", y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed left-1/2 top-4 z-50 w-[calc(100vw-2rem)] max-w-4xl rounded-2xl transition-all duration-300 neuro-card-flat ${
        scrolled ? "!shadow-none" : ""
      }`}
      style={scrolled ? {
        boxShadow: "-10px -10px 20px hsla(0,0%,100%,0.8), 10px 10px 20px hsla(220,30%,75%,0.5)",
        background: "hsla(210,25%,94%,0.85)",
        backdropFilter: "blur(16px)",
      } : undefined}
    >
      <div className="flex h-14 items-center justify-between px-5">
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <div className="neuro-icon-raised rounded-lg p-1.5 w-8 h-8">
            <Shield className="h-4 w-4 text-primary" />
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground">
            Truth<span className="gradient-text">Weave</span>
          </span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
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
            <button className="neuro-btn-blue px-5 py-2 text-sm font-semibold">
              Start Checking
            </button>
          </Link>
        </div>

        <button className="text-foreground md:hidden neuro-btn w-9 h-9 flex items-center justify-center !rounded-lg !p-0" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden md:hidden"
          >
            <div className="neuro-divider mx-4" />
            <div className="flex flex-col gap-3 p-4">
              <Link to="/" className="text-sm font-medium text-foreground" onClick={() => setMobileOpen(false)}>
                Home
              </Link>
              <Link to="/analyze" className="text-sm font-medium text-foreground" onClick={() => setMobileOpen(false)}>
                Analyze
              </Link>
              <Link to="/analyze" onClick={() => setMobileOpen(false)}>
                <button className="neuro-btn-blue w-full py-2.5 text-sm font-semibold">
                  Start Checking
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
