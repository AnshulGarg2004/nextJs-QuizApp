"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface InlineDropdownOption {
  value: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
}

export interface InlineDropdownProps {
  value: string;
  options: InlineDropdownOption[];
  onChange: (value: string) => void;
  className?: string;
  menuClassName?: string;
}

export function InlineDropdown({
  value,
  options,
  onChange,
  className,
  menuClassName,
}: InlineDropdownProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const selected = useMemo(() => {
    return options.find((option) => option.value === value) ?? options[0];
  }, [options, value]);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (
        open &&
        triggerRef.current &&
        menuRef.current &&
        !triggerRef.current.contains(event.target as Node) &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div className={cn("relative", className)}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "dropdown-trigger flex w-full items-center justify-between text-left text-white focus:outline-none",
        )}
      >
        <span className="flex items-center gap-3">
          {selected?.icon && (
            <span className="text-lg text-white/80" aria-hidden>
              {selected.icon}
            </span>
          )}
          <span className="flex flex-col leading-tight">
            <span className="text-base font-semibold">{selected?.label}</span>
            {selected?.description ? (
              <span className="text-xs text-white/60">{selected.description}</span>
            ) : null}
          </span>
        </span>

        <svg
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          className={cn(
            "h-5 w-5 text-white/70 transition duration-200",
            open ? "rotate-180" : "rotate-0",
          )}
        >
          <path
            d="M5 7.5L10 12.5L15 7.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className={cn(
              "dropdown-menu absolute left-0 right-0 top-[calc(100%+0.5rem)] z-20 overflow-hidden",
              menuClassName,
            )}
          >
            {options.map((option) => {
              const active = option.value === selected?.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className={cn(
                    "dropdown-option flex w-full items-center gap-3 text-left text-sm text-white/75",
                    active && "active text-white font-semibold",
                  )}
                >
                  {option.icon && (
                    <span className="text-base text-white/70" aria-hidden>
                      {option.icon}
                    </span>
                  )}
                  <span className="flex flex-col">
                    <span>{option.label}</span>
                    {option.description ? (
                      <span className="text-[0.7rem] font-normal text-white/60">
                        {option.description}
                      </span>
                    ) : null}
                  </span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export const Component = InlineDropdown;

