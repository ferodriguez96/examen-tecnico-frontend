'use client';
interface invoiceItem {
    productName: string;
    unitPrice: number;
    quantity: number;
}
interface invoiceItemProps {
    invoiceItems: invoiceItem[];
    invoiceItemsChange: (invoiceItems: invoiceItem[]) => void;
}

export default function NewInvoiceList({ invoiceItems, invoiceItemsChange }: invoiceItemProps) {

    const deleteItem = (index: number) => {
        const newInvoiceItems = [...invoiceItems];
        newInvoiceItems.splice(index, 1);
        invoiceItemsChange(newInvoiceItems);
    };

    return (
        <div className="overflow-hidden rounded-lg border border-gray-700">
            {invoiceItems.length === 0 ? (
                <p className="p-4 text-center text-gray-400 bg-black">No hay productos.</p>
            ) : (
                <>
                    {/* Cabecera de la lista */}
                    <div className="grid grid-cols-[2fr_1fr_1fr_40px] bg-gray-800 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white border-b border-gray-700">
                        <div>Product Name</div>
                        <div>Price</div>
                        <div>Quantity</div>
                    </div>

                    {/* Lista de ítems */}
                    <ul className="m-0 p-0">
                        {invoiceItems.map((item, index) => {
                            const esPar = index % 2 === 0;
                            return (
                                <li
                                    key={index}
                                    className={`grid grid-cols-[2fr_1fr_1fr_40px] items-center px-4 py-2 text-sm transition-colors ${esPar
                                        ? 'bg-gray-500 text-black'
                                        : 'bg-black text-white'
                                        }`}
                                >
                                    <div className="truncate pr-2 font-medium">
                                        {item.productName}
                                    </div>
                                    <div>
                                        ${item.unitPrice.toFixed(2)}
                                    </div>
                                    <div>
                                        {item.quantity}
                                    </div>
                                    <div className="flex justify-center">
                                        <button
                                            onClick={() => deleteItem(index)}
                                            title="Eliminar ítem"
                                        >❌
                                        </button>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                    <div className="grid grid-cols-[2fr_1fr_1fr_40px] bg-gray-800 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white border-b border-gray-700">
                        <div>Total : </div>
                        <div>${invoiceItems.reduce((total, item) => total + (item.unitPrice * item.quantity), 0).toFixed(2)}</div>
                    </div>
                </>
            )}
        </div>
    );
}