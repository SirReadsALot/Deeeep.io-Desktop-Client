import React from "react";

interface IconProps {
	width?: number | string;
	height?: number | string;
}

export const Icon = {
	Close: ({ width, height }: IconProps) => (
		<svg viewBox="0 0 24 24" fill="currentColor" width={width} height={height}>
			<path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" data-v-35f7fcad=""></path>
		</svg>
	),
	Wrench: ({ width, height }: IconProps) => (
		<svg viewBox="0 0 24 24" fill="currentColor" width={width} height={height}>
			<path d="M22.7,19L13.6,9.9C14.5,7.6 14,4.9 12.1,3C10.1,1 7.1,0.6 4.7,1.7L9,6L6,9L1.6,4.7C0.4,7.1 0.9,10.1 2.9,12.1C4.8,14 7.5,14.5 9.8,13.6L18.9,22.7C19.3,23.1 19.9,23.1 20.3,22.7L22.6,20.4C23.1,20 23.1,19.3 22.7,19Z" />
		</svg>
	),
};
