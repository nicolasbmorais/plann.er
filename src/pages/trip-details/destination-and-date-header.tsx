import { format } from "date-fns";
import { Calendar, MapPin, Settings2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Trip } from "../../@types/trip";
import { Button } from "../../components/button";
import { api } from "../../services/axios";
import { ChangeLocalAndDateModal } from "./modals/change-local-modal";

export function DestinationAndHeader() {
  const { tripId } = useParams();
  const [tripDetails, setTripDetails] = useState<Trip | undefined>();
  const [isChangeLocalModalOpen, setIsChangeLocalModalOpen] = useState(false);

  useEffect(() => {
    api
      .get(`/trips/${tripId}`)
      .then((response) => setTripDetails(response.data.trip))
      .catch((error) => console.error(error));
  }, [tripId]);

  const displayedDate = tripDetails
    ? format(tripDetails.starts_at, "d' de 'LLL")
        .concat(" até ")
        .concat(format(tripDetails.ends_at, "d' de 'LLL"))
    : null;

  function openChangeLocalModal() {
    setIsChangeLocalModalOpen(true);
  }

  function closeChangeLocalModal() {
    setIsChangeLocalModalOpen(false);
  }

  return (
    <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
      <div className="flex items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />
        <span className="text-zinc-100">{tripDetails?.destination}</span>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <Calendar className="size-5 text-zinc-400" />
          <span className="text-zinc-100">{displayedDate}</span>
        </div>

        <div className="w-px h-6 bg-zinc-800"></div>

        <Button variant="secondary" onClick={openChangeLocalModal}>
          Alterar local/data
          <Settings2 className="size-5 "></Settings2>
        </Button>

        {isChangeLocalModalOpen && (
          <ChangeLocalAndDateModal
            closeChangeLocalAndDateModal={closeChangeLocalModal}
          />
        )}
      </div>
    </div>
  );
}
// Colocar aqui a chamada de Update a trip
