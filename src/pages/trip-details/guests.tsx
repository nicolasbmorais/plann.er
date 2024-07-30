import { CheckCircle2, CircleDashed, UserCog } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Participants } from "../../@types/trip";
import { Button } from "../../components/button";
import { api } from "../../services/axios";
import { ManageGuestsModal } from "./modals/manage-guests-modal";

export function Guests() {
  const { tripId } = useParams();

  const [participants, setParticipants] = useState<Participants[]>([]);
  const [isManageGuestsModalOpen, setIsManageGuestsModalOpen] = useState(false);

  function openManageGuestsModal() {
    setIsManageGuestsModalOpen(true);
  }

  function closeManageGuestsModal() {
    setIsManageGuestsModalOpen(false);
  }

  useEffect(() => {
    api
      .get(`/trips/${tripId}/participants`)
      .then((response) => setParticipants(response.data.participants))
      .catch((error) => console.error(error));
  }, [tripId]);

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Convidados</h2>
      <div className="space-y-5">
        {participants.map((participant, index) => {
          return (
            <div
              key={participant.id}
              className="flex items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <span className="block font-medium text-zinc-100">
                  {participant.name ?? `Convidado ${index + 1}`}
                </span>
                <span className="block text-sm text-zinc-400 truncate">
                  {participant.email}
                </span>
              </div>
              {participant.is_confirmed ? (
                <CheckCircle2 className="size-5 shrink-0 text-green-400" />
              ) : (
                <CircleDashed className="text-zinc-400 size-5 shrink-0" />
              )}
            </div>
          );
        })}
      </div>

      <Button variant="secondary" size="full" onClick={openManageGuestsModal}>
        <UserCog className="size-5 " />
        Gerenciar convidados
      </Button>

      {isManageGuestsModalOpen && (
        <ManageGuestsModal closeManageGuestsModal={closeManageGuestsModal} />
      )}
    </div>
  );
}
