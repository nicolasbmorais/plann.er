import { format } from "date-fns";
import { Calendar } from "lucide-react";
import { DateRange } from "react-day-picker";

interface DateButtonComponentProps {
  openDatePicker: () => void;
  isDisabled?: boolean;
  eventDate: DateRange | undefined;
}

export function DateButtonComponent({
  openDatePicker,
  eventDate,
  isDisabled,
}: DateButtonComponentProps) {
  const displayedDate =
    eventDate && eventDate.from && eventDate.to
      ? format(eventDate.from, "d' de 'LLL")
          .concat(" até ")
          .concat(format(eventDate.to, "d' de 'LLL"))
      : null;

  return (
    <button
      onClick={openDatePicker}
      disabled={isDisabled}
      className="flex items-center gap-2 text-left W-[240px]"
    >
      <Calendar className="size-5 text-zinc-400 "></Calendar>
      <span className="text-lg text-zinc-400 w-40 flex-1">
        {displayedDate || "Quando?"}
      </span>
    </button>
  );
}
