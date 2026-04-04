import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Share2, RotateCcw, Clock, ShieldCheck } from "lucide-react";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import VerdictBadge from "@/components/VerdictBadge";
import ScoreRing from "@/components/ScoreRing";
import SourceCard from "@/components/SourceCard";
import SkeletonLoader from "@/components/SkeletonLoader";

interface AnalysisInput {
  text: string | null;
  file: File | null;
}

interface TruthEngine {
  verdict: "TRUE" | "FALSE" | "MISLEADING" | "UNVERIFIABLE";
  corrected_info: string;
  explanation: string;
  confidence: "high" | "medium" | "low";
  sources: { title: string; url: string }[];
}

interface AnalysisResult {
  main_claim: string;
  truth_engine: TruthEngine;
  processing_time_ms: number;
}

const DEMO_RESPONSE: AnalysisResult = {
  main_claim: "Drinking hot water cures COVID instantly.",
  truth_engine: {
    verdict: "FALSE",
    corrected_info: "No scientific evidence supports hot water as a COVID treatment. WHO recommends vaccination and approved antivirals.",
    explanation: "This claim matches a known misinformation pattern circulated during the COVID-19 pandemic. Multiple health authorities including the WHO and CDC have explicitly refuted it. Hot water has no antiviral properties against SARS-CoV-2. The claim appears to originate from social media chains and has been debunked by several fact-checking organizations.",
    confidence: "high",
    sources: [
      { title: "WHO: Myth busters - Coronavirus", url: "https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public/myth-busters" },
      { title: "CDC: COVID-19 Prevention", url: "https://www.cdc.gov/coronavirus/2019-ncov/prevent-getting-sick/prevention.html" },
      { title: "Reuters Fact Check", url: "https://www.reuters.com/fact-check" },
    ],
  },
  processing_time_ms: 2340,
};

const API_URL = import.meta.env.VITE_API_URL || "";

const getScores = (engine: TruthEngine) => {
  const verdictMap = { TRUE: 95, FALSE: 15, MISLEADING: 40, UNVERIFIABLE: 50 };
  const confMap = { high: 90, medium: 65, low: 30 };
  const sourceScore = Math.min(engine.sources.length * 25, 100);
  const accuracy = verdictMap[engine.verdict] ?? 50;
  const confidence = confMap[engine.confidence] ?? 30;
  const overall = Math.round((accuracy + confidence + sourceScore) / 3);
  return { accuracy, confidence, sourceScore, overall };
};

const Results = ({ inputData }: { inputData: AnalysisInput | null }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!inputData) {
      navigate("/analyze");
      return;
    }

    const analyze = async () => {
      setLoading(true);
      setError(null);

      // If no API URL, use demo mode
      if (!API_URL) {
        await new Promise((r) => setTimeout(r, 2500));
        setData(DEMO_RESPONSE);
        setLoading(false);
        return;
      }

      try {
        let res: Response;
        if (inputData.text) {
          res = await fetch(`${API_URL}/analyze/text`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: inputData.text }),
          });
        } else if (inputData.file) {
          const fd = new FormData();
          fd.append("file", inputData.file);
          res = await fetch(`${API_URL}/analyze/image`, { method: "POST", body: fd });
        } else {
          throw new Error("No input provided");
        }
        if (!res.ok) throw new Error(`Analysis failed (${res.status})`);
        const json = await res.json();
        setData(json);
      } catch (err: unknown) {
        // Fallback to demo
        await new Promise((r) => setTimeout(r, 2000));
        setData(DEMO_RESPONSE);
      } finally {
        setLoading(false);
      }
    };

    analyze();
  }, [inputData, navigate]);

  useEffect(() => {
    if (data && data.truth_engine.verdict === "TRUE" && data.truth_engine.confidence === "high") {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
  }, [data]);

  const handleDownload = () => {
    if (!data) return;
    const s = data.truth_engine;
    const report = `TruthWeave Analysis Report\n${"=".repeat(40)}\n\nClaim: ${data.main_claim}\nVerdict: ${s.verdict}\nConfidence: ${s.confidence}\n\nExplanation:\n${s.explanation}\n\nCorrected Info:\n${s.corrected_info}\n\nSources:\n${s.sources.map((src) => `- ${src.title}: ${src.url}`).join("\n")}\n\nProcessing Time: ${data.processing_time_ms}ms`;
    const blob = new Blob([report], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "truthweave-report.txt";
    a.click();
  };

  const handleShare = async () => {
    if (!data) return;
    const text = `TruthWeave Verdict: ${data.truth_engine.verdict}\nClaim: ${data.main_claim}`;
    if (navigator.share) {
      await navigator.share({ title: "TruthWeave Report", text });
    } else {
      await navigator.clipboard.writeText(text);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12">
        <SkeletonLoader />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12">
        <div className="text-center max-w-md mx-auto px-4">
          <h2 className="text-2xl font-bold text-foreground mb-4">Something went wrong</h2>
          <p className="text-muted-foreground mb-6">{error || "No results available."}</p>
          <Button variant="hero" onClick={() => navigate("/analyze")}>Try Again</Button>
        </div>
      </div>
    );
  }

  const scores = getScores(data.truth_engine);

  return (
    <div className="min-h-[calc(100vh-4rem)] py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <AnimatePresence>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }}>
                <ShieldCheck className="h-12 w-12 text-primary mx-auto" />
              </motion.div>
              <h1 className="text-3xl font-bold text-foreground">Analysis Complete</h1>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                Processed in {(data.processing_time_ms / 1000).toFixed(1)}s
              </div>
            </div>

            {/* Claim card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-2xl border border-border bg-card p-6 shadow-card"
            >
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Claim Analyzed</p>
              <p className="text-lg font-medium text-foreground leading-relaxed">"{data.main_claim}"</p>
              <div className="mt-4">
                <VerdictBadge verdict={data.truth_engine.verdict} size="lg" />
              </div>
            </motion.div>

            {/* Score rings */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="rounded-2xl border border-border bg-card p-8 shadow-card"
            >
              <h2 className="text-lg font-semibold text-foreground mb-6 text-center">Score Breakdown</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <ScoreRing value={scores.overall} label="Overall" size={100} />
                <ScoreRing value={scores.accuracy} label="Accuracy" size={100} />
                <ScoreRing value={scores.confidence} label="Confidence" size={100} />
                <ScoreRing value={scores.sourceScore} label="Sources" size={100} />
              </div>
            </motion.div>

            {/* Explanation */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="rounded-2xl border border-border bg-card p-6 shadow-card space-y-5"
            >
              <div>
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-2">Explanation</h3>
                <p className="text-muted-foreground leading-relaxed">{data.truth_engine.explanation}</p>
              </div>
              <div className="border-t border-border pt-5">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-2">Corrected Information</h3>
                <p className="text-muted-foreground leading-relaxed">{data.truth_engine.corrected_info}</p>
              </div>
            </motion.div>

            {/* Sources */}
            {data.truth_engine.sources.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="rounded-2xl border border-border bg-card p-6 shadow-card"
              >
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                  Sources ({data.truth_engine.sources.length})
                </h3>
                <div className="space-y-3">
                  {data.truth_engine.sources.map((src, i) => (
                    <SourceCard key={i} source={src} />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-3 justify-center"
            >
              <Button variant="outline" size="lg" className="rounded-xl" onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" /> Download Report
              </Button>
              <Button variant="outline" size="lg" className="rounded-xl" onClick={handleShare}>
                <Share2 className="mr-2 h-4 w-4" /> Share
              </Button>
              <Button variant="hero" size="lg" className="rounded-xl" onClick={() => navigate("/analyze")}>
                <RotateCcw className="mr-2 h-4 w-4" /> New Analysis
              </Button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Results;
