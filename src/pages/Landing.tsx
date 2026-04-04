import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Search, Brain, FileCheck, ArrowRight, Zap, Globe, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroBackground from "@/components/HeroBackground";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const features = [
  { icon: Brain, title: "AI-Powered Analysis", desc: "Leverages Google Gemini to evaluate claims against real-world evidence." },
  { icon: Globe, title: "Web Evidence Search", desc: "Automatically searches trusted sources like WHO, Reuters, and CDC." },
  { icon: Lock, title: "Source Verification", desc: "Prioritizes 13+ authoritative domains for reliable fact-checking." },
  { icon: Zap, title: "Instant Results", desc: "Get detailed verdicts with confidence scores in seconds." },
];

const steps = [
  { num: "01", title: "Submit a Claim", desc: "Enter text or upload an image containing a claim to fact-check." },
  { num: "02", title: "AI Investigates", desc: "Our engine searches trusted sources and analyzes evidence." },
  { num: "03", title: "Get Your Verdict", desc: "Receive a detailed verdict with sources and confidence scoring." },
];

const Landing = () => {
  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center">
        <HeroBackground />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            animate="visible"
          >
            <motion.div custom={0} variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-sm text-primary font-medium mb-8">
              <Shield className="h-4 w-4" />
              AI-Powered Fact Checking
            </motion.div>

            <motion.h1 custom={1} variants={fadeUp} className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 text-foreground">
              Unravel the truth,{" "}
              <span className="gradient-text">one claim at a time</span>
            </motion.h1>

            <motion.p custom={2} variants={fadeUp} className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              TruthWeave uses advanced AI to analyze claims against trusted sources, delivering clear verdicts with transparent evidence.
            </motion.p>

            <motion.div custom={3} variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/analyze">
                <Button variant="hero" size="lg" className="text-base px-8 py-6 rounded-xl">
                  Start Fact-Checking
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <a href="#how-it-works">
                <Button variant="outline" size="lg" className="text-base px-8 py-6 rounded-xl">
                  How It Works
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.h2 custom={0} variants={fadeUp} className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Powered by Intelligence
            </motion.h2>
            <motion.p custom={1} variants={fadeUp} className="text-muted-foreground text-lg max-w-xl mx-auto">
              A multi-layered approach to separating fact from fiction.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="p-6 rounded-2xl border border-border bg-background hover:shadow-elevated hover:border-primary/20 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <f.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.h2 custom={0} variants={fadeUp} className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </motion.h2>
            <motion.p custom={1} variants={fadeUp} className="text-muted-foreground text-lg">
              Three simple steps to verify any claim.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((s, i) => (
              <motion.div
                key={s.num}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative text-center"
              >
                <div className="text-6xl font-extrabold gradient-text opacity-20 mb-4">{s.num}</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
                {i < steps.length - 1 && (
                  <ArrowRight className="hidden md:block absolute top-10 -right-6 text-border h-6 w-6" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-2xl mx-auto text-center gradient-primary rounded-3xl p-12 md:p-16 shadow-elevated"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <FileCheck className="h-12 w-12 text-primary-foreground mx-auto mb-6 opacity-90" />
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to verify the truth?
            </h2>
            <p className="text-primary-foreground/80 mb-8 text-lg">
              Start analyzing claims now — it's fast, free, and backed by trusted sources.
            </p>
            <Link to="/analyze">
              <Button size="lg" className="bg-background text-foreground hover:bg-background/90 text-base px-8 py-6 rounded-xl font-semibold">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            <span className="font-semibold text-foreground">TruthWeave</span>
          </div>
          <p>AI-powered misinformation detection. Built for truth.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
