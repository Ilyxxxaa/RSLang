export function createElement(elem: string, className: string) {
  const htmlElem: HTMLElement = document.createElement(elem);
  htmlElem.classList.add(className);
  return htmlElem;
}

export const levelColors = ['#0012ff', '#0095ff', '#09E35C', '#e6e930', '#FFAD00', '#DD0FC6', '#ff00aa'];
export const levelsName = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
export const backgrounds = ['bg1', 'bg2', 'bg3', 'bg4', 'bg5', 'bg6'];
