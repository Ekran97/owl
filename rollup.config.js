import pkg from "./package.json";
import git from "git-rev-sync";
import typescript from 'rollup-plugin-typescript2';
import { terser } from "rollup-plugin-terser";

// const outro = `exports.__info__.version = '${pkg.version}';\nexports.__info__.date = '${new Date().toISOString()}';\nexports.__info__.hash = '${git.short()}';\nexports.__info__.url = 'https://github.com/odoo/owl';`;
const outro = ``;
const name = "owl"
const extend = true

function generateMinifiedNameFromPkgName(pkgFileName) {
  const parts = pkgFileName.split('.')
  parts.splice(parts.length - 1, 0, "min");
  return parts.join('.');
}

function getConfigForFormat(format, generatedFileName, minified = false) {
  return {
    file: minified ? generateMinifiedNameFromPkgName(generatedFileName) : generatedFileName,
    format: format,
    name: name,
    extend: extend,
    outro: outro,
    plugins: minified ? [terser()] : []
  }
}

// rollup.config.js
export default {
  input: "src/index.ts",
  output: [
    getConfigForFormat('esm', pkg.module),
    getConfigForFormat('esm', pkg.module, true),
    getConfigForFormat('cjs', pkg.main),
    getConfigForFormat('cjs', pkg.main, true),
    getConfigForFormat('iife', pkg.browser),
    getConfigForFormat('iife', pkg.browser, true),
  ],
  plugins: [
    typescript({
      useTsconfigDeclarationDir: true
    }),
  ]
};
