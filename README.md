# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Techs List

- ⚛️ [React](https://reactjs.org/): libreria para interfaces
- 🟦 [TypeScript](https://www.typescriptlang.org/): tipado de datos
- ⚡️ [Chakra UI](https://chakra-ui.com/): framewwork css
- 🐜 [react-hook-form](https://react-hook-form.com/get-started): control/validacion de formularios 🕵🏻
- ⚛️ [@tanstack/react-query](https://tanstack.com/query/latest/docs/framework/react/installation): manejo de estado del servidor
- 🗒 [@tanstack/react-table](https://tanstack.com/table/latest/docs/installation): renderizado de datos en tablas(dinamicas)
- ↔ [Axios](https://github.com/axios/axios): libreria para peticiones http

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

# frontend-hospital
