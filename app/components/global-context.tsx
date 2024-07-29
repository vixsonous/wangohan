'use client';
import { createContext } from "react";

interface GlobalValueContext {
    value: string
}

export const GlobalValueContext = createContext<GlobalValueContext | undefined>(undefined);