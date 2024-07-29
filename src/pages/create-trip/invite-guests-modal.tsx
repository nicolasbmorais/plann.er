import { AtSign, Plus, X } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "../../components/button";

interface InviteGuestsModalProps {
    closeGuestsModal: () => void;
    addEmailToInvite: (event: FormEvent<HTMLFormElement>) => void;
    removeEmailsFromInvite: (email: string) => void;
    emailsToInvite: string[];
}

export function InviteGuestsModal({
    closeGuestsModal,
    addEmailToInvite,
    removeEmailsFromInvite,
    emailsToInvite
}: InviteGuestsModalProps) {
    return (
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
            <div className='w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
                <div className='space-y-2'>
                    <div className='flex items-center justify-between'>
                        <h2 className='text-lg font-semibold'>Selecionar convidados</h2>
                        <button type='button' onClick={closeGuestsModal}>
                            <X className='size-5 text-zinc-400'></X>
                        </button>
                    </div>
                    <p className='text-sm text-zinc-400'>
                        Os convidados irão receber e-mails para confirmar a participação na viagem.
                    </p>
                </div>

                {/* Emails */}
                <div className='flex flex-wrap gap-2'>
                    {emailsToInvite.map((email) => {
                        return (
                            <div key={email} className='py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2'>
                                <span className='text-zinc-300'>{email}</span>
                                <button type="button">
                                    <X onClick={() => removeEmailsFromInvite(email)} className='size-4 text-zinc-400'></X>
                                </button>
                            </div>
                        )
                    })}
                </div>

                {/* Divider */}
                <div className='w-full h-px bg-zinc-800'></div>

                {/* Invite Form */}
                <form name="inviteGuestsForm" onSubmit={addEmailToInvite} className='p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
                    <div className='px-2 flex items-center flex-1 gap-2'>
                        <AtSign className='text-zinc-400 size-5'></AtSign>
                        <input
                            type="email"
                            name='email'
                            autoComplete="email"
                            placeholder="Digite o email do convidado"
                            className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" />
                    </div>

                    <Button type='submit' variant='primary'>
                        Convidar
                        <Plus className='size-5 '></Plus>
                    </Button>
                </form>

            </div>
        </div>
    )
}