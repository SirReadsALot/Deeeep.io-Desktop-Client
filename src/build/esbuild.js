import * as esbuild from "esbuild";

import { sassPlugin } from "esbuild-sass-plugin";
import postcss from "postcss";
import tailwindcss from "tailwindcss";
import tailwindConfig from "./tailwind.config.js";
import cssnano from "cssnano";

await esbuild.build({
	entryPoints: ["main/script.tsx"],
	bundle: true,
	outfile: "dist/script.js",
	target: "esnext",
	minify: true,
	treeShaking: true,
	plugins: [
		sassPlugin({
			type: "style",
			async transform(source) {
				const { css } = await postcss([
					tailwindcss({
						config: tailwindConfig,
					}),
					cssnano(),
				]).process(source, { from: undefined });
				return css;
			},
		}),
	],
});

await esbuild.build({
	entryPoints: ["main/preload.ts"],
	bundle: true,
	outfile: "dist/preload.js",
	target: "esnext",
	minify: true,
	treeShaking: true,
});
