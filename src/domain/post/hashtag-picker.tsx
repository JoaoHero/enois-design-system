import type { KeyboardEvent } from "react";
import { useEffect, useRef, useState } from "react";

import { Check } from "lucide-react";

import { toHashtag } from "../../lib/hashtag.js";
import { cn } from "../../lib/utils.js";
import type { HashtagPickerProps } from "../../types/domain/post/hashtag-picker-props.js";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover.js";

/**
 * A choice shown as a hashtag (`#Tecnologia`) instead of a bubble with a chevron.
 *
 * The composer uses one for the topic and one for the post type: the tags read as part of the
 * post and take a fraction of the room the old bubbles took. Tapping the tag opens the list;
 * focus moves into the options and the arrow keys / Home / End walk them, Enter or Space chooses.
 */
export function HashtagPicker({
  options,
  value,
  onChange,
  placeholder,
  label,
  required = false,
  className,
}: HashtagPickerProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  const current = options.find((option) => option.value === value);
  const needed = required && !current;
  const tag = toHashtag(current?.label ?? placeholder) || placeholder;

  const openList = (next: boolean) => {
    setOpen(next);
    if (next) {
      const selected = options.findIndex((option) => option.value === value);
      setActiveIndex(selected >= 0 ? selected : 0);
    }
  };

  const choose = (next: string) => {
    onChange(next);
    setOpen(false);
  };

  // The option itself carries focus (roving), so the list opens on the chosen one.
  const focusActive = () => {
    const items = listRef.current?.querySelectorAll<HTMLElement>('[role="option"]');
    items?.[activeIndex]?.focus();
  };

  useEffect(() => {
    if (open) focusActive();
    // `focusActive` only reads the ref and the index of this render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, activeIndex]);

  const onListKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const last = options.length - 1;

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setActiveIndex((index) => Math.min(index + 1, last));
        break;
      case "ArrowUp":
        event.preventDefault();
        setActiveIndex((index) => Math.max(index - 1, 0));
        break;
      case "Home":
        event.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        event.preventDefault();
        setActiveIndex(last);
        break;
      case "Enter":
      case " ": {
        event.preventDefault();
        const option = options[activeIndex];
        if (option) choose(option.value);
        break;
      }
    }
  };

  return (
    <Popover open={open} onOpenChange={openList}>
      <PopoverTrigger asChild>
        <button
          type="button"
          // The dashed underline is the only "required" signal on screen; the name carries it too.
          aria-label={needed ? `${label} (obrigatório)` : label}
          title={label}
          className={cn(
            "inline-flex min-w-0 max-w-full shrink items-center rounded-md px-1 py-0.5 text-sm font-medium transition hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            current ? "text-primary" : "text-text-subtle hover:text-primary",
            needed && "underline decoration-primary/60 decoration-dashed underline-offset-4",
            open && "bg-primary/10 text-primary",
            className,
          )}
        >
          <span className="truncate">{tag}</span>
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        collisionPadding={8}
        // Radix would focus the panel itself; the list wants focus on the option.
        onOpenAutoFocus={(event) => {
          event.preventDefault();
          focusActive();
        }}
        className="max-h-[60vh] w-[min(18rem,calc(100vw-1rem))] overflow-y-auto rounded-2xl border-border-soft p-1"
      >
        <div
          ref={listRef}
          role="listbox"
          aria-label={label}
          onKeyDown={onListKeyDown}
          className="flex flex-col gap-0.5"
        >
          {options.map((option, index) => {
            const selected = option.value === value;
            const Icon = option.icon;

            return (
              <div
                key={option.value}
                role="option"
                aria-selected={selected}
                tabIndex={-1}
                onClick={() => choose(option.value)}
                onMouseEnter={() => setActiveIndex(index)}
                className={cn(
                  "flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition outline-none focus:ring-2 focus:ring-ring",
                  selected
                    ? "bg-primary-soft text-primary-text"
                    : "text-text-subtle hover:bg-surface-2 hover:text-text-strong",
                )}
              >
                {Icon && <Icon className="h-3.5 w-3.5 shrink-0" />}

                <span className="min-w-0 flex-1 truncate">{toHashtag(option.label)}</span>

                {selected && <Check className="h-3.5 w-3.5 shrink-0" />}
              </div>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
