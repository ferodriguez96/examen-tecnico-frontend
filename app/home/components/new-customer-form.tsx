'use client';
import { useTransition } from "react";
import SendNewCustomerForm from "./server-actions/send-new-customer-form";

export default function NewCustomerForm({ setShowForm, onCustomerCreated }: { setShowForm: (show: boolean) => void; onCustomerCreated: () => void }) {

    const [isPending, startTransition] = useTransition();

    const handleSubmit = (formData: FormData) => {
        startTransition(async () => {
            await SendNewCustomerForm(formData);
            setShowForm(false);
            onCustomerCreated();
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-8 w-96">
                <form action={handleSubmit} className="space-y-4">
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold mb-1 text-black">Nombre: </label>
                        <input type="text" name="name" required className="border border-gray-300 rounded px-3 py-2 text-black" />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold mb-1 text-black">E-Mail: </label>
                        <input type="email" name="email" required className="border border-gray-300 rounded px-3 py-2 text-black" />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold mb-1 text-black">Direccion: </label>
                        <input type="text" name="address" required className="border border-gray-300 rounded px-3 py-2 text-black" />
                    </div>
                    <div className="flex gap-3 justify-end pt-4">
                        <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">Cancelar</button>
                        <button type="submit" disabled={isPending} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400">
                            {isPending ? 'Enviando...' : 'Enviar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}