import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Direction = "up" | "left" | "right" | "scale";

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  className,
}: {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
}) {
  const { ref, isVisible } = useScrollAnimation(0.12);

  const hiddenClass = {
    up: "scroll-hidden",
    left: "scroll-hidden-left",
    right: "scroll-hidden-right",
    scale: "scroll-scale-hidden",
  }[direction];

  const visibleClass = {
    up: "scroll-visible",
    left: "scroll-visible-x",
    right: "scroll-visible-x",
    scale: "scroll-scale-visible",
  }[direction];

  return (
    <div
      ref={ref}
      className={cn(hiddenClass, isVisible && visibleClass, className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
