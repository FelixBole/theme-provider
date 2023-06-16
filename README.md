# Easy Theme Provider

![Version](https://img.shields.io/npm/v/eztp)

An easy to use and customizable React Theme Provider component to easily manage the assets and css variables used per theme.

## Installation

```bash
npm i eztp
```

## Usage

This a pretty straightforward component to use. Set it up as :

```jsx
import { ThemeProvider } from "eztp";

const MyComponent = () => {
	return (
		<ThemeProvider
			themes={[
				{
					theme: "light",
					vars: { "--color-primary": "white" },
					assets: { foo: "bar" },
				},
			]}
		>
			//... Your code
		</ThemeProvider>
	);
};
```

### Props

| Property | Required | Description |
| --- | --- | --- |
| themes | true | An array of theme configurations with the theme name, the css variables and any extra asset you wish to use. |
| defaultTheme | false | The theme to start with. If not set, will use the first theme set in `themes` |

## The useTheme hook

This hook is useful to grab information on the theme from within your components such as the current theme, or potential assets you would have configured for the theme.

```jsx
import { useTheme } from "eztp";

const MyComponent = () => {
	const { theme, assets, variables, toggle } = useTheme();

	// You now have access to theme properties
	// and the toggle method allowing you to change
	// to another theme (assuming you configured it)

	return (
		<button
			onClick={() => {
				toggle("light");
			}}
		>
			Switch to light theme
		</button>
	);
};
```

## Typescript

Types are bundled with the library, no need for an external @types dependency.

The library allows you to type your assets if you configure any for your themes. The way to do so is to specify the type when using the useTheme hook.

```jsx
type MyType = {
	foo: "bar",
};

const MyComponent = () => {
  const { assets } = useTheme<MyType>();

  // assets will be recognized as being of type MyType
}
```
