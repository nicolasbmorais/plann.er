import { ArrowRight, MapPin, Settings2 } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Button } from "../../../components/button";
import { DateButtonComponent } from "../../../components/date-button";
import { ModalDatePickerComponent } from "../../../components/modal-date-picker";
interface DestinationAndDateStepProps {
  isGuestsInputOpen: boolean;
  eventDate: DateRange | undefined;
  closeGuestsInput: () => void;
  openGuestsInput: () => void;
  setDestination: (destination: string) => void;
  setEventDates: (dates: DateRange | undefined) => void;
}

export function DestinationAndDateStep({
  isGuestsInputOpen,
  eventDate,
  closeGuestsInput,
  openGuestsInput,
  setDestination,
  setEventDates,
}: DestinationAndDateStepProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  function openDatePicker() {
    return setIsDatePickerOpen(true);
  }

  function closeDatePicker() {
    return setIsDatePickerOpen(false);
  }

  return (
    <div className="h-16  bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
      <div className="flex items-center gap-2 flex-1">
        <MapPin className="size-5 text-zinc-400"></MapPin>
        <input
          onChange={(event) => setDestination(event.target.value)}
          autoComplete="address-level2"
          disabled={isGuestsInputOpen}
          name="destiny"
          type="text"
          placeholder="Para onde você vai?"
          className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
        />
      </div>

      <DateButtonComponent
        isDisabled={isGuestsInputOpen}
        openDatePicker={openDatePicker}
        eventDate={eventDate}
      />

      {/* Divider */}
      <div className="w-px h-6 bg-zinc-800"></div>

      {isGuestsInputOpen ? (
        <Button onClick={closeGuestsInput} variant="secondary">
          Alterar local/data
          <Settings2 className="size-5 "></Settings2>
        </Button>
      ) : (
        <Button onClick={openGuestsInput} variant="primary">
          Continuar
          <ArrowRight className="size-5 "></ArrowRight>
        </Button>
      )}

      {isDatePickerOpen && (
        <ModalDatePickerComponent
          closeDatePicker={closeDatePicker}
          eventDate={eventDate}
          onSelect={setEventDates}
        />
      )}
    </div>
  );
}
