import { Link2, Tag, X } from "lucide-react";
import { FormEvent } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../../../components/button";
import { api } from "../../../services/axios";

interface RegisterModalProps {
  closeRegisterLinkModal: () => void;
}
export function RegisterLinkModal({
  closeRegisterLinkModal,
}: RegisterModalProps) {
  const { tripId } = useParams();

  async function createActivity(event: FormEvent<HTMLFormElement>) {
    const data = new FormData(event.currentTarget);
    const title = data.get("title")?.toString();
    const url = data.get("url")?.toString();

    if (!title || !url) {
      event.preventDefault();
      return;
    }

    try {
      await api.post(`/trips/${tripId}/links`, { title, url });
    } catch (error) {
      toast.error(`${error}`);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Cadastrar link</h2>
            <button type="button" onClick={closeRegisterLinkModal}>
              <X className="size-5 text-zinc-400"></X>
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Todos convidados podem visualizar os links importantes.
          </p>
        </div>

        <form
          name="registerLinkForm"
          onSubmit={createActivity}
          className="space-y-3"
        >
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Tag className="text-zinc-400 size-5"></Tag>
            <input
              name="title"
              autoComplete="off"
              placeholder="Título do link"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="h-14 flex-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
              <Link2 className="text-zinc-400 size-5" />
              <input
                type="url"
                name="url"
                autoComplete="off"
                placeholder="URL"
                className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              />
            </div>
          </div>

          <Button variant="primary" size="full">
            Salvar link
          </Button>
        </form>
      </div>
    </div>
  );
}
