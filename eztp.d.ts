declare module "eztp" {
	import { PropsWithChildren } from "react";

	type eztpCSSVars = {
		[key: string]: string;
	};

	type ThemeCSSVars = {
		theme: string;
		vars: eztpCSSVars;
	};

	interface ThemeProviderProps {
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
	}

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
		 * Available only if set by the user
		 */
		extra?: any;

		/**
		 * Switches to the specified theme
		 * @param theme New theme name to switch to
		 */
		toggle: (theme: string) => void;
	};

	function ThemeProvider(
		props: PropsWithChildren<ThemeProviderProps>
	): JSX.Element;

    function useTheme(): ThemeContextValue;
}
