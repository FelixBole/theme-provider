# Simple Theme Provider

![Version](https://img.shields.io/npm/v/@fb/theme-provider)

A simple React ThemeProvider component to easily manage the assets and css variables used per theme.

This was made for a side project initially but there are plans to make this more extensive such as :

- Adding an optional ThemeSwitcher component that can be overriden
- Adding an option to pass in custom methods

## Usage

This a pretty straightforward component to use. Set it up as :

```jsx
import { ThemeProvider } from "@fb/theme-provider";

const MyComponent = () => {
	return (
		<ThemeProvider
			themes={[{ theme: "light", vars: { "--color-primary": "white" } }]}
		>
			//... Your code
		</ThemeProvider>
	);
};
```

### Props

| Property | Required | Description |
| --- | --- | --- |
| themes | true | An array of theme <> CSS Variables configurations. |
| defaultTheme | false | The theme to start with. If not set, will use the first theme set in `themes` |
| assets | false | An array of theme <> assets configurations. Allows to switch between assets when switching theme |
| extra | false | Any extra information you want to make available through the useTheme hook |

## The useTheme hook

This hook is useful to grab information on the theme from within your components such as the current theme, or potential assets you would have configured for the theme.

```jsx
import { useTheme } from '@fb/theme-provider';

const MyComponent = () => {
    const theme = useTheme();

    // You now have access to theme properties
    // assets / variables / theme etc
}
```
