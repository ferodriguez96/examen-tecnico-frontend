'use server'

export default async function SendNewCustomerForm(data: FormData) {
    const name = data.get('name') as string;
    const email = data.get('email') as string;
    const address = data.get('address') as string;

    await fetch('http://localhost:8080/api/customers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, address }),
    });
}