const API = "http://localhost:5000/api";

export const signupUser = (data) =>
    fetch(`${API}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    }).then(res => res.json());

export const loginUser = (data) =>
    fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    }).then(res => res.json());

export const getProducts = () =>
    fetch(`${API}/products`).then(res => res.json());

export const getProduct = (id) =>
    fetch(`${API}/products/${id}`).then(res => res.json());

export const placeOrder = (data, token) =>
    fetch(`${API}/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    }).then(res => res.json());

export const getReviews = (productId) =>
    fetch(`http://localhost:5000/api/reviews/${productId}`)
        .then(res => res.json());

export const addReview = async (id, data, token) => {
    const res = await fetch(`/api/reviews/${id}`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });

    const result = await res.json();

    if (!res.ok) {
        throw new Error(result.message || "Failed to add review");
    }

    return result;
};
const getToken = () => localStorage.getItem("token");

export const getMe = async () => {
    const res = await fetch(`http://localhost:5000/api/auth/me`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch user");
    return data;
};

export const getMyOrders = async () => {
    const res = await fetch(`http://localhost:5000/api/orders/my`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch orders");
    return data;
};