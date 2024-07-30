import { X } from "lucide-react";
import {
  DateRange,
  DayPicker,
  SelectRangeEventHandler,
} from "react-day-picker";

interface ModalDatePickerComponentProps {
  closeDatePicker: () => void;
  eventDate: DateRange | undefined;
  onSelect: SelectRangeEventHandler | undefined;
}
export function ModalDatePickerComponent({
  closeDatePicker,
  onSelect,
  eventDate,
}: ModalDatePickerComponentProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Selecione a data</h2>
            <button type="button" onClick={closeDatePicker}>
              <X className="size-5 text-zinc-400"></X>
            </button>
          </div>
        </div>
        <DayPicker mode="range" selected={eventDate} onSelect={onSelect} />
      </div>
    </div>
  );
}
