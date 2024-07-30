import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TripLinks } from "../../@types/trip";
import { Button } from "../../components/button";
import { DetailsLinkListTile } from "../../components/details-link-list-tile";
import { api } from "../../services/axios";
import { RegisterLinkModal } from "./modals/register-link-modal";

export function ImportantLinks() {
  const { tripId } = useParams();
  const [tripLinks, setTripLinks] = useState<TripLinks[]>([]);
  const [isRegisterLinkModalOpen, setIsRegisterLinkModalOpen] = useState(false);

  function openRegisterLinkModal() {
    setIsRegisterLinkModalOpen(true);
  }

  function closeRegisterLinkModal() {
    setIsRegisterLinkModalOpen(false);
  }

  useEffect(() => {
    api
      .get(`/trips/${tripId}/links`)
      .then((response) => setTripLinks(response.data.links))
      .catch((error) => console.error(error));
  }, [tripId]);

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Links importantes</h2>
      {tripLinks.length > 0 ? (
        tripLinks.map((link) => (
          <DetailsLinkListTile
            key={link.id}
            title={link.title}
            url={link.url}
          />
        ))
      ) : (
        <p className="text-sm text-zinc-500">Nenhum link cadastrado</p>
      )}

      <Button variant="secondary" size="full" onClick={openRegisterLinkModal}>
        <Plus className="size-5 "></Plus>
        Cadastrar novo link
      </Button>

      {isRegisterLinkModalOpen && (
        <RegisterLinkModal closeRegisterLinkModal={closeRegisterLinkModal} />
      )}
    </div>
  );
}
