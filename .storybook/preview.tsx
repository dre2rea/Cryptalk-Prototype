import type { Preview, Decorator } from '@storybook/nextjs-vite'
import React from 'react'
import '../src/app/globals.css'

/**
 * Global decorator that automatically applies theme based on story name.
 * - Stories with "Dark" in the name get data-theme="dark" with dark background
 * - Stories with "Light" in the name get data-theme="light" with light background
 * - Default is dark theme
 *
 * Handles both Canvas (individual story) and Docs (inline stories) views.
 */
const withTheme: Decorator = (Story, context) => {
  const storyName = context.name || ''
  const viewMode = context.viewMode // 'story' for canvas, 'docs' for docs page

  // Determine theme from story name
  const isLight = storyName.includes('Light')

  const theme = isLight ? 'light' : 'dark'
  const backgroundColor = isLight ? '#fafafa' : '#0c0e12'

  // Different styles for Canvas vs Docs view
  const isDocsView = viewMode === 'docs'

  const style: React.CSSProperties = isDocsView
    ? {
        // Docs view: inline block with appropriate sizing
        backgroundColor,
        padding: '24px',
        minHeight: '120px',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '8px',
      }
    : {
        // Canvas view: full screen
        backgroundColor,
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }

  return (
    <div data-theme={theme} style={style}>
      <Story />
    </div>
  )
}

const preview: Preview = {
  parameters: {
    // Use fullscreen layout for canvas since we handle centering in our decorator
    layout: 'fullscreen',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    },
    // Disable Storybook's default backgrounds since we handle it via decorator
    backgrounds: {
      disable: true,
    },
  },
  decorators: [withTheme],
}

export default preview
