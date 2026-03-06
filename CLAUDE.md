# Crypto Dashboard Practice

## Purpose
Throwaway project to practice the Figma MCP → Cursor → Storybook workflow. Not meant to be shipped.

## Tech
- Next.js (App Router), React 19, TypeScript, Tailwind CSS v3, Storybook 10.2, pnpm

## Color tokens
- Semantic color tokens are defined as CSS variables in the global CSS file
- Dark and light themes are supported via class
- Tailwind config references these CSS variables — do NOT use hardcoded color values in components
- Token names in code must match Figma variable names exactly

## Components
- Built from Figma designs via Figma MCP
- Flat structure in `components/` folder
- Each component should have a corresponding Storybook story showing all variants and states