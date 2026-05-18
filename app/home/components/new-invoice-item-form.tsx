'use client';

import React, { useState } from 'react';

interface InvoiceItem {
    productName: string;
    unitPrice: number;
    quantity: number;
}

interface NewInvoiceItemFormProps {
    onAgregarItem: (item: InvoiceItem) => void;
}

export default function NewInvoiceItemForm({ onAgregarItem }: NewInvoiceItemFormProps) {
    const [productName, setProductName] = useState('');
    const [unitPrice, setUnitPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);

    const cleanForm = () => {
        setProductName('');
        setUnitPrice(0);
        setQuantity(0);
    }

    return (
        <div className="w-full lg:w-1/4 p-5 bg-black border border-gray-700 rounded-lg shadow-md">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    onAgregarItem({ productName, unitPrice, quantity });
                    cleanForm();
                }}
                className="flex flex-col gap-4"
            >
                {/* Campo: Producto */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
                        Nombre del Producto
                    </label>
                    <input
                        type="text"
                        name="productName"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        placeholder="Nombre del producto..."
                        required
                        className="w-full bg-gray-800 text-white border border-gray-700 rounded px-3 py-2 text-sm focus:outline-none focus:border-gray-500 transition-colors placeholder-gray-500"
                    />
                </div>

                {/* Campo: Precio */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
                        Precio Unitario
                    </label>
                    <input
                        type="number"
                        name="unitPrice"
                        value={unitPrice || ''}
                        onChange={(e) => setUnitPrice(Number(e.target.value))}
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                        required
                        className="w-full bg-gray-800 text-white border border-gray-700 rounded px-3 py-2 text-sm focus:outline-none focus:border-gray-500 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                </div>

                {/* Campo: Cantidad */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
                        Cantidad
                    </label>
                    <input
                        type="number"
                        name="quantity"
                        value={quantity || ''}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        placeholder="1"
                        step="any"
                        min="1"
                        required
                        className="w-full bg-gray-800 text-white border border-gray-700 rounded px-3 py-2 text-sm focus:outline-none focus:border-gray-500 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                </div>

                {/* Acciones del Formulario: Botones uno al lado del otro */}
                <div className="flex items-center justify-end gap-2 pt-2 w-full">
                    <button
                        type="button"
                        onClick={cleanForm}
                        className="flex-1 px-4 py-2 text-sm font-medium text-gray-400 bg-transparent border border-gray-700 rounded hover:bg-gray-800 hover:text-white transition-colors cursor-pointer text-center"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="flex-1 px-5 py-2 text-sm font-bold text-black bg-gray-400 rounded hover:bg-gray-300 active:scale-95 transition-all cursor-pointer text-center"
                    >
                        Agregar Item
                    </button>
                </div>
            </form>
        </div>


    )
}