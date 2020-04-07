function _classesOf(element: HTMLElement): string[] {
  return element.className.trim().split(/\s+/);
}

export function add(element: HTMLElement, ...args: string[]): void {
  const toAdd = Array.from(args);
  const className = _classesOf(element)
    .filter(function (classname) {
      return toAdd.indexOf(classname) === -1;
    })
    .concat(toAdd)
    .join(" ");

  element.className = className;
}

export function remove(element: HTMLElement, ...args: string[]): void {
  const toRemove = Array.from(args);
  const className = _classesOf(element)
    .filter(function (classname) {
      return toRemove.indexOf(classname) === -1;
    })
    .join(" ");

  element.className = className;
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
