/** @type {import('@ladle/react').UserConfig} */
export default {
  stories: 'src/stories/**/*.stories.tsx',
  outDir: 'build',
  addons: { theme: { enabled: false }, rtl: { enabled: false }, width: { enabled: true, options: { mobile320: 320, mobile360: 360, tablet: 768, desktop: 1280 }, defaultState: 0 }, a11y: { enabled: true } },
  defaultStory: 'signature--composition',
};
