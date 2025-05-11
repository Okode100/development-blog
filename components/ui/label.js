import { cx } from "@/utils/all";

export default function Label({ children, nomargin, pill, color, className }) {
  if (pill) {
    return (
      <div className={cx(
        "inline-flex items-center justify-center font-bold px-2 h-6 text-sm rounded-full shrink-0",
        "bg-primary-50 text-primary-500 dark:bg-dark-card dark:text-primary-400",
        className
      )}>
        {children}
      </div>
    );
  }

  return (
    <span
      className={cx(
        "inline-block text-xs font-medium tracking-wider uppercase",
        !nomargin && "mt-5",
        className
      )}>
      {children}
    </span>
  );
}
