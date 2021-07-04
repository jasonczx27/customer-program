export let domain="http://localhost:8000";
export const header={
    Accept: "application/json",
    "Content-Type": "application/json",
}
export async function FetchLogin(params) {
    const options={
        method: "POST",
        headers: header,
        body: JSON.stringify(params)
    };

    try {
        return await fetch(`${domain}/login`, options);
    } catch (e) {
        return e;
    }
}

export async function Fetch(params) {
    const options={
        method: "POST",
        headers: header,
        body: JSON.stringify(params)
    };

    try {
        return await fetch(`${domain}/controls`, options);
    } catch (e) {
        return e;
    }
}