"use client";
import { createContext, useContext, useEffect, useMemo, useReducer } from "react";

const WishlistContext = createContext(null);

function reducer(state, action) {
  switch (action.type) {
    case "INIT":
      return action.payload ?? state;
    case "TOGGLE": {
      const id = action.payload.id;
      const exists = state.ids.has(id);
      const next = new Set(state.ids);
      if (exists) next.delete(id);
      else next.add(id);
      return { ids: next };
    }
    case "CLEAR":
      return { ids: new Set() };
    default:
      return state;
  }
}

const initialState = { ids: new Set() };

export function WishlistProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("shopease_wishlist");
      if (raw) {
        const data = JSON.parse(raw);
        dispatch({ type: "INIT", payload: { ids: new Set(data.ids ?? []) } });
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      const arr = Array.from(state.ids);
      localStorage.setItem("shopease_wishlist", JSON.stringify({ ids: arr }));
    } catch {}
  }, [state]);

  const api = useMemo(() => {
    const count = state.ids.size;
    return {
      state,
      ids: state.ids,
      count,
      has: (id) => state.ids.has(id),
      toggle: (id) => dispatch({ type: "TOGGLE", payload: { id } }),
      clear: () => dispatch({ type: "CLEAR" }),
    };
  }, [state]);

  return <WishlistContext.Provider value={api}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}