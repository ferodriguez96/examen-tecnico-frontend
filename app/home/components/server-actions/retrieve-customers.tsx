'use server'

interface Customer {
    id: number;
    name: string;
    email: string;
    address: string;
}


export default async function RetrieveCustomers() {
    try {
        const response = await fetch('http://localhost:8080/api/customers');
        const customers: Customer[] = await response.json();

        return customers;
    } catch (error) {
        console.error(error);
        return [{ id: 0, name: "Error buscando clientes... ", email: "", address: "" }];
    }
}


