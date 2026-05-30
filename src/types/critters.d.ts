declare module 'critters' {
  interface CrittersOptions {
    path?: string
    reduceInlineStyles?: boolean
    pruneSource?: boolean
    logLevel?: string
  }

  class Critters {
    constructor(options?: CrittersOptions)
    process(html: string): Promise<string>
  }

  export default Critters
}
