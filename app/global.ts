import polyfill from "extended-dom"
import "xrray"


export default async function() {
  await polyfill()
  //@ts-ignore
  global.log = console.log
  //@ts-ignore
  global.ce = document.createElement.bind(document)
}


declare function log(...msg: any[]): void
declare const ce: {
	<K extends keyof HTMLElementTagNameMap>(tagName: K, options?: ElementCreationOptions) : HTMLElementTagNameMap[K];
	(name: string) : HTMLElement;
};

