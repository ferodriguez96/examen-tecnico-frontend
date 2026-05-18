import { useEffect, useState } from "react";
import RetrieveCustomers from "./server-actions/retrieve-customers";

interface Customer {
    id: number;
    name: string;
    email: string;
    address: string;
}

export default function CustomersDropdown({onCustomerSelect}: {onCustomerSelect: (customerId: number) => void}) {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function loadCustomers() {
            const data = await RetrieveCustomers();
            setCustomers(data);
            setLoading(false);
        }

        loadCustomers();
    }, []);

    if (loading) return <p> Cargando clientes... </p>;

    return (
        <select defaultValue="" className="border border-gray-300 rounded px-2 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={(e) => {
            onCustomerSelect(Number(e.target.value));
        }} >  
            <option value="" disabled>
                -- Seleccione un cliente --
            </option>
            {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                    {customer.name}
                </option>
            ))}
        </select>
    )
}