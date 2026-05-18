'use client';
import { startTransition, useState } from "react";
import NewInvoiceItemForm from "./new-invoice-item-form";
import NewInvoiceList from "./new-invoice-list";
import NewCustomerButton from "./new-customer-button";
import CustomersDropdown from "./customers-dropdown";
import SendInvoice from "./server-actions/send-invoice";
import MyToast from "./toast";


interface invoiceItem {
    productName: string;
    unitPrice: number;
    quantity: number;
}


interface invoice {
    customerId: number;
    invoiceItems: invoiceItem[];
}

export default function InvoiceElements() {
    const [invoiceItems, setInvoiceItems] = useState<invoiceItem[]>([]);
    const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null);

    const [refreshDropdown, setRefreshDropdown] = useState(0);

    const [toastConfig, setToastConfig] = useState<{ message: string; type: 'success' | 'error' } | null>(null);


    const invoiceRequest: invoice = {
        customerId: selectedCustomerId!,
        invoiceItems: invoiceItems,
    }

    const clean = () => {
        setInvoiceItems([]);
    }

    const refreshCustomers = () => {
        setToastConfig({ message: 'Cliente creado exitosamente', type: 'success' });
        setRefreshDropdown(prev => prev + 1); // Cambia el estado para forzar la recarga del dropdown
    }

    return (
        <div className="m-4 bg-black border border-gray-700 rounded-lg shadow-md">
            <div className="flex gap-2 items-center px-4 py-2 rounded-t-lg border-b-0">
                <CustomersDropdown key={refreshDropdown} onCustomerSelect={setSelectedCustomerId} />
                <NewCustomerButton onCustomerCreated={refreshCustomers} />
            </div>
            <div className="flex flex-col lg:flex-row gap-6 w-full items-start p-4  rounded-b-lg border-t-0">
                <div className="w-full lg:w-3/4">
                    <NewInvoiceList invoiceItems={invoiceItems} invoiceItemsChange={setInvoiceItems} />
                    <div className="flex justify-end mt-6">

                        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded" onClick={
                            () => {
                                if (!selectedCustomerId) {
                                    setToastConfig({ message: 'Por favor, selecciona un cliente antes de enviar la factura', type: 'error' });
                                    return;
                                }
                                if (invoiceItems.length === 0) {
                                    setToastConfig({ message: 'Agrega al menos un producto a la factura antes de enviarla', type: 'error' });
                                    return;
                                }
                                else {
                                    startTransition(() => {
                                        SendInvoice(invoiceRequest).then((res) => {
                                            if (res.success) {
                                                setToastConfig({ message: 'Factura enviada exitosamente', type: 'success' });
                                                clean();
                                            } else {
                                                setToastConfig({ message: res.error || 'Error al crear la factura', type: 'error' });
                                            }
                                        });
                                    })
                                }
                            }
                        }>
                            Guardar Factura
                        </button>
                    </div>

                </div>

                <NewInvoiceItemForm onAgregarItem={(item) => {
                    if (item.productName && item.quantity && item.unitPrice) {
                        const exists = invoiceItems.some(i => i.productName.toLowerCase() === item.productName.toLowerCase());
                        if (exists) {
                            setToastConfig({ message: `Ya existe el item "${item.productName}" en la factura`, type: 'error' });
                        } else {
                            setInvoiceItems([...invoiceItems, item]);
                        }
                    }
                }} />
            </div>
            {toastConfig && (
                <MyToast
                    message={toastConfig.message}
                    type={toastConfig.type}
                    onClose={() => setToastConfig(null)} // Al cerrarse, limpiamos el estado
                />
            )}
        </div>
    )
}