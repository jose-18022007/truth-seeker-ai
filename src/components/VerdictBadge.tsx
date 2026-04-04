import { CheckCircle, XCircle, AlertTriangle, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type Verdict = "TRUE" | "FALSE" | "MISLEADING" | "UNVERIFIABLE";

const config: Record<Verdict, { icon: typeof CheckCircle; bg: string; text: string; label: string }> = {
  TRUE: { icon: CheckCircle, bg: "bg-emerald/10", text: "text-emerald", label: "Verified True" },
  FALSE: { icon: XCircle, bg: "bg-destructive/10", text: "text-destructive", label: "False" },
  MISLEADING: { icon: AlertTriangle, bg: "bg-amber/10", text: "text-amber", label: "Misleading" },
  UNVERIFIABLE: { icon: HelpCircle, bg: "bg-muted", text: "text-muted-foreground", label: "Unverifiable" },
};

const VerdictBadge = ({ verdict, size = "md" }: { verdict: Verdict; size?: "sm" | "md" | "lg" }) => {
  const c = config[verdict] || config.UNVERIFIABLE;
  const Icon = c.icon;
  const sizes = {
    sm: "px-3 py-1 text-xs gap-1.5",
    md: "px-4 py-2 text-sm gap-2",
    lg: "px-6 py-3 text-base gap-2.5",
  };

  return (
    <span className={cn("inline-flex items-center font-semibold rounded-full", c.bg, c.text, sizes[size])}>
      <Icon className={size === "lg" ? "h-5 w-5" : "h-4 w-4"} />
      {c.label}
    </span>
  );
};

export default VerdictBadge;
