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

export const addReview = async (productId, data, token) => {
    const res = await fetch(`http://localhost:5000/api/reviews/${productId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });

    const text = await res.text(); // 🔥 SAFER

    try {
        const data = text ? JSON.parse(text) : {};
        if (!res.ok) throw new Error(data.message || "Failed");
        return data;
    } catch {
        throw new Error("Invalid server response");
    }
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

export const addToCartAPI = async (product) => {
    const res = await fetch("http://localhost:5000/api/cart", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(product)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data;
};
export const getCartAPI = async () => {
    const res = await fetch("http://localhost:5000/api/cart", {
        headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });
    return res.json();
};

export const updateCartAPI = async (productId, delta) => {
    const res = await fetch("http://localhost:5000/api/cart/update", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ productId, delta })
    });
    return res.json();
};

export const removeFromCartAPI = async (productId) => {
    const res = await fetch(`http://localhost:5000/api/cart/${productId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });
    return res.json();
};