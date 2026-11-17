"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Aparece suavemente al llegar a la vista (una sola vez).
 * Respeta «reducir movimiento» del sistema.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "section";
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </Tag>
  );
}

/** Contenedor que hace aparecer a sus hijos uno tras otro (usar con RevealItem). */
export function RevealGroup({
  children,
  className,
  stagger = 0.09,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  as?: "div" | "ul";
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  const variants: Variants = { hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : stagger } } };
  return (
    <Tag className={className} variants={variants} initial={reduce ? false : "hidden"} whileInView="show" viewport={{ once: true, margin: "0px 0px -60px 0px" }}>
      {children}
    </Tag>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li";
}) {
  const Tag = motion[as];
  const variants: Variants = {
    hidden: { opacity: 0, y: 24, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE } },
  };
  return (
    <Tag className={className} variants={variants}>
      {children}
    </Tag>
  );
}
