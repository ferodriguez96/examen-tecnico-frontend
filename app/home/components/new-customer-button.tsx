import { useState } from "react";
import NewCustomerForm from "./new-customer-form"


export default function NewCustomerButton({onCustomerCreated }: {onCustomerCreated: () => void}) {
    const [showForm, setShowForm] = useState(false);


    return (
        <div>
            <button onClick={() => setShowForm(!showForm)} className="px-4 py-2 bg-blue-500 text-white rounded text-sm font-semibold hover:bg-blue-600 transition">
                Nuevo Cliente
            </button>
            {showForm && <NewCustomerForm setShowForm={setShowForm} onCustomerCreated={onCustomerCreated} />}
        </div>
    )
}