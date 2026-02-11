interface StatusBadgeProps {
  level: "critical" | "warning" | "success" | "neutral" | "info";
  text: string;
}

const styles = {
  critical: "bg-critical-light text-critical",
  warning: "bg-warning-light text-amber-800",
  success: "bg-success-light text-success",
  neutral: "bg-gray-100 text-gray-600",
  info: "bg-blue-50 text-navy",
};

const dots = {
  critical: "bg-critical",
  warning: "bg-warning",
  success: "bg-success",
  neutral: "bg-gray-400",
  info: "bg-navy",
};

export default function StatusBadge({ level, text }: StatusBadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${styles[level]}`}>
      <span className={`inline-block h-1.5 w-1.5 rounded-full ${dots[level]}`} />
      {text}
    </span>
  );
}
