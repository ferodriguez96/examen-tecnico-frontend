'use server'

interface InvoiceItem {
    productName: string;
    unitPrice: number;
    quantity: number;
}
interface Invoice {
    customerId: number;
    invoiceItems: InvoiceItem[];
}

export interface ActionResponse {
    success: boolean;
    error?: string;
}

export default async function SendInvoice(invoice: Invoice): Promise<ActionResponse> {
    try {
        const res = await fetch('http://localhost:8080/api/invoices', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(invoice),
        });

        if (!res.ok) {
            try {
                const errorData = await res.json();
                return {
                    success: false,
                    error: errorData.detail || `Error desconocido (Código: ${res.status})`
                };
            } catch {
                return {
                    success: false,
                    error: `Error del servidor sin detalles (Código: ${res.status})`
                };
            }
        }
        return { success: true };
    } catch (error) {
        return {
            success: false,
            error: "Error desconocido al crear la factura."
        };
    }
}