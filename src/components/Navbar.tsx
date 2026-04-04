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
    <nav
      className={`fixed left-1/2 top-4 z-50 w-[calc(100vw-2rem)] max-w-4xl -translate-x-1/2 rounded-2xl border transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-border shadow-elevated"
          : "bg-background/50 backdrop-blur-md border-border/40"
      }`}
    >
      <div className="flex h-14 items-center justify-between px-5">
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <div className="gradient-primary rounded-lg p-1.5">
            <Shield className="h-4 w-4 text-primary-foreground" />
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
            <button className="gradient-primary rounded-lg px-4 py-1.5 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:scale-105 hover:shadow-lg">
              Start Checking
            </button>
          </Link>
        </div>

        <button className="text-foreground md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border/50 md:hidden"
          >
            <div className="flex flex-col gap-3 p-4">
              <Link to="/" className="text-sm font-medium text-foreground" onClick={() => setMobileOpen(false)}>
                Home
              </Link>
              <Link to="/analyze" className="text-sm font-medium text-foreground" onClick={() => setMobileOpen(false)}>
                Analyze
              </Link>
              <Link to="/analyze" onClick={() => setMobileOpen(false)}>
                <button className="gradient-primary w-full rounded-lg py-2.5 text-sm font-semibold text-primary-foreground">
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
