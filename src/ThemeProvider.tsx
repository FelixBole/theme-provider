import {
	PropsWithChildren,
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";

type eztpCSSVars = {
	[key: string]: string;
};

type ThemeConfig = {
	/**
	 * Name of the theme
	 */
	theme: string;

	/**
	 * CSS Variables associated
	 * to the theme
	 */
	vars: eztpCSSVars;

	/**
	 * Assets for the theme such as
	 * images or any other information
	 * you want to access per theme
	 */
	assets?: any;
};

type ThemeProviderProps = {
	/**
	 * All the different themes that should
	 * be available.
	 */
	themes: ThemeConfig[];

	/**
	 * If not specified will use themes[0].theme
	 * as default
	 */
	defaultTheme?: string;
};

type ThemeContextValue = {
	/**
	 * The current active theme
	 */
	theme: string;

	/**
	 * CSS variables set for this theme
	 * for access via javascript
	 */
	variables: eztpCSSVars;

	/**
	 * Any custom assets for the
	 * theme if speficied
	 */
	assets: any;

	/**
	 * Switches to the specified theme
	 * @param theme New theme name to switch to
	 */
	toggle: (theme: string) => void;
};

const DEFAULT_VALUE: ThemeContextValue = {
	theme: "default",
	assets: {},
	variables: {},
	toggle: (theme: string) => {
		console.log(
			`Cannot toggle to ${theme} as ThemeProvider has default settings.`
		);
	},
};

const ThemeContext = createContext(DEFAULT_VALUE);

export const ThemeProvider = (props: PropsWithChildren<ThemeProviderProps>) => {
	const { defaultTheme, themes } = props;

	const starterTheme = defaultTheme || themes[0]?.theme || DEFAULT_VALUE.theme;

	const [theme, setTheme] = useState<string>(starterTheme);

	const [variables, setVariables] = useState<eztpCSSVars>(
		themes[0]?.vars || DEFAULT_VALUE.variables
	);

	const [currentAssets, setCurrentAssets] = useState<any>(
		themes?.find((o) => o?.theme === starterTheme)?.assets ||
			DEFAULT_VALUE.assets
	);

	const setupVars = (activeTheme: string) => {
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

	const toggle = (newTheme: string) => {
		if (newTheme === theme) return;

		setTheme(newTheme);
		setupVars(newTheme);

		const assetsExists = themes?.find((o) => o.theme === newTheme);
		if (!assetsExists) return;

		setCurrentAssets(assetsExists.assets);
	};

	useEffect(() => {
		setupVars(starterTheme);
	}, []);

	const value: ThemeContextValue = useMemo(() => {
		return {
			theme,
			assets: currentAssets,
			variables,
			toggle,
		};
	}, [theme, currentAssets, variables]);

	return (
		<ThemeContext.Provider value={value}>
			{props.children}
		</ThemeContext.Provider>
	);
};

export const useTheme = () => {
	return useContext(ThemeContext);
};
