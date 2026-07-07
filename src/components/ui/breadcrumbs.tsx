import * as React from "react"
import { cn } from "../../lib/utils"

export interface BreadcrumbItem {
  label: string;
  href?: string;
  active?: boolean;
}

export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
}

const Breadcrumbs = React.forwardRef<HTMLElement, BreadcrumbsProps>(
  ({ items, className, ...props }, ref) => (
    <nav 
      ref={ref}
      className={cn("flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2", className)}
      {...props}
    >
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          {item.href ? (
            <a href={item.href} className={cn("hover:text-accent transition-colors", item.active && "text-accent")}>
              {item.label}
            </a>
          ) : (
            <span className={item.active ? 'text-accent' : ''}>
              {item.label}
            </span>
          )}
          {idx < items.length - 1 && <span className="opacity-40">/</span>}
        </React.Fragment>
      ))}
    </nav>
  )
)
Breadcrumbs.displayName = "Breadcrumbs"

export { Breadcrumbs }
