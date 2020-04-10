function _classesOf(element: HTMLElement): string[] {
  return element.className.trim().split(/\s+/);
}

export function add(element: HTMLElement, ...args: string[]): void {
  const toAdd = Array.from(args);

  element.className = _classesOf(element)
    .filter((classname) => toAdd.indexOf(classname) === -1)
    .concat(toAdd)
    .join(" ");
}

export function remove(element: HTMLElement, ...args: string[]): void {
  const toRemove = Array.from(args);

  element.className = _classesOf(element)
    .filter((classname) => toRemove.indexOf(classname) === -1)
    .join(" ");
}

export function toggle(
  element: HTMLElement,
  classname: string,
  adding: boolean
): void {
  if (adding) {
    add(element, classname);
  } else {
    remove(element, classname);
  }
}
