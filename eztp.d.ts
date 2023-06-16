declare module "eztp" {
	import { PropsWithChildren } from "react";

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

		/**
		 * Any extra information to add to the
		 * provider context
		 */
		extra?: any;
	};

	type ThemeContextValue<T> = {
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
		assets: T;

		/**
		 * Switches to the specified theme
		 * @param theme New theme name to switch to
		 */
		toggle: (theme: string) => void;
	};

	/**
	 * A simple Theme Provider component that gives full
	 * control on all assets and variables that should
	 * be changed when switching themes
	 */
	function ThemeProvider(
		props: PropsWithChildren<ThemeProviderProps>
	): JSX.Element;

	/**
	 * Hook to access theme information within the
	 * ThemeProvider.
	 *
	 * For typescript users, you can specify a type T
	 * for your assets to avoid having it set as any
	 */
	function useTheme<T = any>(): ThemeContextValue<T>;
}
