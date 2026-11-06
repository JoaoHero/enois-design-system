import type { HashtagOption } from "./hashtag-option.js";

export type HashtagPickerProps = {
  options: HashtagOption[];
  value: string | null | undefined;
  onChange: (value: string) => void;
  /** Words shown after the "#" while nothing is chosen (e.g. "tópico"). */
  placeholder: string;
  /** Accessible name of the tag and of its list (e.g. "Tópico da publicação"). */
  label: string;
  /** Empty and required: the tag gets a dashed underline asking to be chosen. */
  required?: boolean;
  className?: string;
};
