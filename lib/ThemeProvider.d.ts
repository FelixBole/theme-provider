import { PropsWithChildren } from "react";
type CSSVar = {
    [key: string]: string;
};
type ThemeCSSVars = {
    /**
     * The theme name
     */
    theme: string;
    /**
     * The variables associated to this theme
     */
    vars: CSSVar;
};
type ThemeProviderProps = {
    /**
     * All the different themes that should
     * be available.
     */
    themes: ThemeCSSVars[];
    /**
     * Any potential other logos / images
     * that should be replaced according to
     * the theme
     */
    assets?: {
        /**
         * The theme name. Should match
         * the theme name specified in the
         * "themes" field
         */
        theme: string;
        assets: any;
    }[];
    /**
     * If not specified will use themes[0].theme
     * as default
     */
    defaultTheme?: string;
    /**
     * Any extra information to add to the
     * provider context
     */
    extra?: any;
};
export declare const ThemeProvider: (props: PropsWithChildren<ThemeProviderProps>) => import("react/jsx-runtime").JSX.Element;
export declare const useTheme: () => void;
export {};
