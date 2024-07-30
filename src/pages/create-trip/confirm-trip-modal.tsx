import { format } from "date-fns";
import { User, X } from "lucide-react";
import { FormEvent } from "react";
import { DateRange } from "react-day-picker";
import { Button } from "../../components/button";

interface ConfirmTripModalProps {
  closeConfirmTripModal: () => void;
  setOwnerEmail: (ownerEmail: string) => void;
  setOwnerName: (ownerName: string) => void;
  createTrip: (event: FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  eventDate: DateRange | undefined;
  destination: string;
}

export function ConfirmTripModal({
  closeConfirmTripModal,
  createTrip,
  setOwnerEmail,
  setOwnerName,
  isLoading,
  eventDate,
  destination,
}: ConfirmTripModalProps) {
  const displayedDate =
    eventDate && eventDate.from && eventDate.to
      ? format(eventDate.from, "d' de 'LLL")
          .concat(" até ")
          .concat(format(eventDate.to, "d' de 'LLL"))
      : null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              Confirmar criação da viagem
            </h2>
            <button type="button" onClick={closeConfirmTripModal}>
              <X className="size-5 text-zinc-400"></X>
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Para concluir a criação da viagem para{" "}
            <span className="font-semibold text-zinc-100">
              {destination ?? "Digite o destino"}{" "}
            </span>
            nas datas de{" "}
            <span className="font-semibold text-zinc-100">
              {displayedDate}{" "}
            </span>
            preencha seus dados abaixo:
          </p>
        </div>

        <form
          name="confirmTripForm"
          onSubmit={createTrip}
          className="space-y-3"
        >
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <User className="text-zinc-400 size-5"></User>
            <input
              onChange={(event) => setOwnerName(event.target.value)}
              type="text"
              name="name"
              autoComplete="name"
              placeholder="Seu nome completo"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
          </div>

          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <User className="text-zinc-400 size-5"></User>
            <input
              onChange={(event) => setOwnerEmail(event.target.value)}
              type="email"
              name="email"
              autoComplete="email"
              placeholder="Seu email pessoal"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="full"
            isLoading={isLoading}
          >
            {isLoading ? "Convidando..." : "Confirmar criação da viagem"}
          </Button>
        </form>
      </div>
    </div>
  );
}
