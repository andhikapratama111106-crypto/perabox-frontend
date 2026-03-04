"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, Language } from '../translations';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (path: string) => string;
    currencyCode: string;
    currencySymbol: string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguageState] = useState<Language>('id');

    useEffect(() => {
        const savedLang = localStorage.getItem('app_language');
        // Check if saved language exists and is valid, otherwise fallback to 'id'
        if (savedLang && translations[savedLang as Language]) {
            setLanguageState(savedLang as Language);
        } else {
            setLanguageState('id');
            localStorage.setItem('app_language', 'id');
        }
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('app_language', lang);
    };

    const t = (path: string): string => {
        try {
            const keys = path.split('.');
            let current: any = (translations as any)[language];

            if (!current) {
                console.warn(`Translation for language "${language}" not found`);
                return path;
            }

            for (const key of keys) {
                if (current === null || typeof current !== 'object' || current[key] === undefined) {
                    console.warn(`Translation key not found: ${path}`);
                    return path;
                }
                current = current[key];
            }

            return (current as string) || path;
        } catch (error) {
            console.error(`Error translating path: ${path}`, error);
            return path;
        }
    };

    // Ensure currencyCode is a valid locale string for toLocaleDateString
    const getSafeLocale = () => {
        const rawCode = t('bookPage.currencyCode');
        // Simple regex for BCP 47 locale (e.g., en-US, id-ID)
        const localeRegex = /^[a-z]{2}(-[A-Z]{2})?$/;
        if (rawCode && typeof rawCode === 'string' && localeRegex.test(rawCode)) {
            return rawCode;
        }
        // Fallback to defaults based on language
        const fallbacks: Record<string, string> = {
            id: 'id-ID',
            en: 'en-US',
            es: 'es-ES',
            ja: 'ja-JP',
            zh: 'zh-CN'
        };
        return fallbacks[language] || 'id-ID';
    };

    const currencyCode = getSafeLocale();
    const currencySymbol = t('bookPage.currencySymbol') || 'Rp';

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, currencyCode, currencySymbol }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
