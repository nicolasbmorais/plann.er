import { MapPin, X } from "lucide-react";
import { FormEvent, useState } from "react";
import { DateRange } from "react-day-picker";
import { useParams } from "react-router-dom";
import { Button } from "../../../components/button";
import { DateButtonComponent } from "../../../components/date-button";
import { ModalDatePickerComponent } from "../../../components/modal-date-picker";
import { api } from "../../../services/axios";
import { toast } from "sonner";

interface ChangeLocalAndDateModalProps {
  closeChangeLocalAndDateModal: () => void;
}
export function ChangeLocalAndDateModal({
  closeChangeLocalAndDateModal,
}: ChangeLocalAndDateModalProps) {
  const { tripId } = useParams();
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [destination, setDestination] = useState("");
  const [eventDate, setEventDates] = useState<DateRange | undefined>();

  function openDatePicker() {
    return setIsDatePickerOpen(true);
  }

  function closeDatePicker() {
    return setIsDatePickerOpen(false);
  }

  async function changeLocalAndDate(event: FormEvent<HTMLFormElement>) {
    if (!destination || !eventDate?.from || !eventDate?.to) {
      event.preventDefault();
      return;
    }

    try {
      await api.put(`/trips/${tripId}`, {
        destination: destination,
        starts_at: eventDate.from,
        ends_at: eventDate.to,
      });
    } catch (error) {
      toast.error(`${error}`);
      console.log(error);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Alterar local e data</h2>
            <button type="button" onClick={closeChangeLocalAndDateModal}>
              <X className="size-5 text-zinc-400"></X>
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Você deve preencher todas as informações
          </p>
        </div>

        <form
          name="changeLocalAndDateForm"
          className="space-y-3"
          onSubmit={changeLocalAndDate}
        >
          <div className="h-16  bg-zinc-950 px-4 rounded-xl flex items-center shadow-shape gap-3">
            <div className="flex items-center gap-2 flex-1">
              <MapPin className="size-5 text-zinc-400"></MapPin>
              <input
                onChange={(event) => setDestination(event.target.value)}
                autoComplete="address-level2"
                name="destiny"
                type="text"
                placeholder="Para onde você vai?"
                className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              />
            </div>

            <DateButtonComponent
              isDisabled={false}
              openDatePicker={openDatePicker}
              eventDate={eventDate}
            />
          </div>

          <Button variant="primary" size="full" type="submit">
            Alterar local e data
          </Button>

          {isDatePickerOpen && (
            <ModalDatePickerComponent
              closeDatePicker={closeDatePicker}
              eventDate={eventDate}
              onSelect={setEventDates}
            />
          )}
        </form>
      </div>
    </div>
  );
}
