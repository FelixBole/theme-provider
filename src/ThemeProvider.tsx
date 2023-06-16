import {
	PropsWithChildren,
	createContext,
	useContext,
	useMemo,
	useState,
} from "react";

type CSSVar = { [key: string]: string };

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

type ThemeContextValue = {
	/**
	 * The current active theme
	 */
	theme: string;

	/**
	 * CSS variables set for this theme
	 * for access via javascript
	 */
	variables: CSSVar;

	/**
	 * Any custom assets for the
	 * theme if speficied
	 */
	assets: {
		theme: string;
		assets: any;
	}[];

	/**
	 * Available only if set by the user
	 */
	extra?: any;

	/**
	 * Switches to the specified theme
	 * @param theme New theme name to switch to
	 */
	toggle: (theme: string) => void;
};

const DEFAULT_VALUE: ThemeContextValue = {
	theme: "default",
	assets: [],
	variables: {},
	toggle: (theme: string) => {
		console.log(
			`Cannot toggle to ${theme} as ThemeProvider has default settings.`
		);
	},
};

const ThemeContext = createContext(DEFAULT_VALUE);

export const ThemeProvider = (props: PropsWithChildren<ThemeProviderProps>) => {
	const { defaultTheme, extra, themes, assets } = props;

	const [theme, setTheme] = useState<string>(
		defaultTheme || themes[0]?.theme || DEFAULT_VALUE.theme
	);

	const [variables, setVariables] = useState<CSSVar>(
		themes[0]?.vars || DEFAULT_VALUE.variables
	);

	const [currentAssets, setCurrentAssets] = useState<
		{
			theme: string;
			assets: any;
		}[]
	>(assets || DEFAULT_VALUE.assets);

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
		setTheme(newTheme);
		setupVars(newTheme);

		const assetsExists = assets?.find((o) => o.theme === newTheme);
		if (!assetsExists) return;

		setCurrentAssets(assetsExists.assets);
	};

	const value: ThemeContextValue = useMemo(() => {
		return {
			theme,
			assets: currentAssets,
			variables,
			toggle,
			extra,
		};
	}, [theme, currentAssets, variables]);

	return (
		<ThemeContext.Provider value={value}>
			{props.children}
		</ThemeContext.Provider>
	);
};

export const useTheme = () => {
	useContext(ThemeContext);
};
