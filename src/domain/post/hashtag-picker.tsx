import { useState } from "react";

import { Check } from "lucide-react";

import { toHashtag } from "../../lib/hashtag.js";
import { cn } from "../../lib/utils.js";
import type { HashtagPickerProps } from "../../types/domain/post/hashtag-picker-props.js";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover.js";

/**
 * A choice shown as a hashtag (`#Tecnologia`) instead of a bubble with a chevron.
 *
 * The composer uses one for the topic and one for the post type: the tags read as part of the
 * post and take a fraction of the room the old bubbles took. Tapping the tag opens the list.
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
  const current = options.find((option) => option.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={label}
          title={label}
          className={cn(
            "inline-flex min-w-0 max-w-full shrink items-center rounded-md px-1 py-0.5 text-sm font-medium transition hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            current ? "text-primary" : "text-text-subtle hover:text-primary",
            !current &&
              required &&
              "underline decoration-primary/60 decoration-dashed underline-offset-4",
            open && "bg-primary/10 text-primary",
            className,
          )}
        >
          <span className="truncate">{toHashtag(current?.label ?? placeholder)}</span>
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        collisionPadding={8}
        className="max-h-[60vh] w-[min(18rem,calc(100vw-1rem))] overflow-y-auto rounded-2xl border-border-soft p-1"
      >
        <div role="listbox" aria-label={label} className="flex flex-col gap-0.5">
          {options.map((option) => {
            const selected = option.value === value;
            const Icon = option.icon;

            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={selected}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition",
                  selected
                    ? "bg-primary-soft text-primary-text"
                    : "text-text-subtle hover:bg-surface-2 hover:text-text-strong",
                )}
              >
                {Icon && <Icon className="h-3.5 w-3.5 shrink-0" />}

                <span className="min-w-0 flex-1 truncate">{toHashtag(option.label)}</span>

                {selected && <Check className="h-3.5 w-3.5 shrink-0" />}
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
