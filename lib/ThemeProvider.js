import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useMemo, useState, } from "react";
const DEFAULT_VALUE = {
    theme: "default",
    assets: [],
    variables: {},
    toggle: (theme) => {
        console.log(`Cannot toggle to ${theme} as ThemeProvider has default settings.`);
    },
};
const ThemeContext = createContext(DEFAULT_VALUE);
export const ThemeProvider = (props) => {
    const { defaultTheme, extra, themes, assets } = props;
    const [theme, setTheme] = useState(defaultTheme || themes[0]?.theme || DEFAULT_VALUE.theme);
    const [variables, setVariables] = useState(themes[0]?.vars || DEFAULT_VALUE.variables);
    const [currentAssets, setCurrentAssets] = useState(assets || DEFAULT_VALUE.assets);
    const setupVars = (activeTheme) => {
        const exists = themes.find((el) => el.theme === activeTheme);
        if (!exists) {
            console.error("Attempt to apply variables of a non-registered theme");
            return;
        }
        for (const [key, val] of Object.entries(exists.vars)) {
            document.documentElement.style.setProperty(key, val);
        }
        setVariables(exists.vars);
    };
    const toggle = (newTheme) => {
        setTheme(newTheme);
        setupVars(newTheme);
        const assetsExists = assets?.find((o) => o.theme === newTheme);
        if (!assetsExists)
            return;
        setCurrentAssets(assetsExists.assets);
    };
    const value = useMemo(() => {
        return {
            theme,
            assets: currentAssets,
            variables,
            toggle,
            extra,
        };
    }, [theme, currentAssets, variables]);
    return (_jsx(ThemeContext.Provider, { value: value, children: props.children }));
};
export const useTheme = () => {
    useContext(ThemeContext);
};
