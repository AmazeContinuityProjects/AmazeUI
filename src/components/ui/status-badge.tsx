import * as React from "react"
import { cn } from "../../lib/utils"

export interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: 'pending' | 'processing' | 'success' | 'error' | 'warning' | 'info';
}

const StatusBadge = React.forwardRef<HTMLSpanElement, StatusBadgeProps>(
  ({ status, className, ...props }, ref) => {
    const styles = {
      pending: 'bg-[var(--semantic-warning)]/15 text-[var(--semantic-warning)] border-[var(--semantic-warning)]/20',
      processing: 'bg-accent/15 text-accent border-accent/20 animate-pulse',
      success: 'bg-[var(--semantic-success)]/15 text-[var(--semantic-success)] border-[var(--semantic-success)]/20',
      error: 'bg-destructive/15 text-destructive border-destructive/20',
      warning: 'bg-[var(--semantic-warning)]/15 text-[var(--semantic-warning)] border-[var(--semantic-warning)]/20',
      info: 'bg-muted text-muted-foreground border-border/50',
    };

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border",
          styles[status],
          className
        )}
        {...props}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />
        {status}
      </span>
    )
  }
)
StatusBadge.displayName = "StatusBadge"

export { StatusBadge }
