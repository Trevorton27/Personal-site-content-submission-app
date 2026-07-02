// Allow CSS imports in TypeScript files
declare module "*.css" {
  const styles: { [className: string]: string };
  export default styles;
}
