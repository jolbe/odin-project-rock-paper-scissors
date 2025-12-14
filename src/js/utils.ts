// Checks that element is in the DOM
export function getRequiredElement(selector: string): HTMLElement {
  const element = document.querySelector(selector);
  if (!(element instanceof HTMLElement)) {
    throw new Error(`Element not found: ${selector}`);
  }
  return element;
}
