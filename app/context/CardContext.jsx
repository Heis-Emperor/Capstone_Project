"use client";
import { createContext, useContext, useEffect, useMemo, useReducer } from "react";

const CartContext = createContext(null);

function reducer(state, action) {
    switch (action.type) {
        case "INIT":
            return action.payload ?? state;
        case "ADD": {
            const item = action.payload; // { id, title, price, image }
            const existing = state.items[item.id];
            const nextQty = (existing?.qty ?? 0) + (item.qty ?? 1);
            const nextItems = {
                ...state.items,
                [item.id]: { id: item.id, title: item.title, price: item.price, image: item.image, qty: nextQty },
            };
            return { ...state, items: nextItems };
        }
        case "REMOVE": {
            const { id } = action.payload;
            const next = { ...state.items };
            delete next[id];
            return { ...state, items: next };
        }
        case "SET_QTY": {
            const { id, qty } = action.payload;
            if (qty <= 0) {
                const next = { ...state.items };
                delete next[id];
                return { ...state, items: next };
            }
            return {
                ...state,
                items: {
                    ...state.items,
                    [id]: { ...(state.items[id] ?? {}), id, qty },
                },
            };
        }
        case "CLEAR":
            return { items: {} };
        default:
            return state;
    }
}

const initialState = { items: {} };

export function CartProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    // Load from localStorage
    useEffect(() => {
        try {
            const raw = localStorage.getItem("shopease_cart");
            if (raw) dispatch({ type: "INIT", payload: JSON.parse(raw) });
        } catch { }
    }, []);

    // Persist to localStorage
    useEffect(() => {
        try {
            localStorage.setItem("shopease_cart", JSON.stringify(state));
        } catch { }
    }, [state]);

    const api = useMemo(() => {
        const itemsArray = Object.values(state.items);
        const count = itemsArray.reduce((n, it) => n + it.qty, 0);
        const total = itemsArray.reduce((sum, it) => sum + it.qty * it.price, 0);
        return {
            state,
            items: itemsArray,
            count,
            total,
            add: (item) => dispatch({ type: "ADD", payload: item }),
            remove: (id) => dispatch({ type: "REMOVE", payload: { id } }),
            setQty: (id, qty) => dispatch({ type: "SET_QTY", payload: { id, qty } }),
            clear: () => dispatch({ type: "CLEAR" }),
        };
    }, [state]);

    return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used within CartProvider");
    return ctx;
}