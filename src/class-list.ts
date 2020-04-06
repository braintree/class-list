function _classesOf(element): string[] {
  return element.className.trim().split(/\s+/);
}

export function add(element, ...args): void {
  const toAdd = Array.from(args);
  const className = _classesOf(element)
    .filter(function (classname) {
      return toAdd.indexOf(classname) === -1;
    })
    .concat(toAdd)
    .join(" ");

  element.className = className;
}

export function remove(element, ...args): void {
  const toRemove = Array.from(args);
  const className = _classesOf(element)
    .filter(function (classname) {
      return toRemove.indexOf(classname) === -1;
    })
    .join(" ");

  element.className = className;
}

export function toggle(element, classname, adding): void {
  if (adding) {
    add(element, classname);
  } else {
    remove(element, classname);
  }
}
