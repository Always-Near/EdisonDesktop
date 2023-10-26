declare module '*.svg' {
  export const id: string
  export const viewBox: string
}

declare module '*.png' {
  const content: string
  export default content
}
