export function serialize(obj: any, depth: number = 0, references: any[] = []): any {
  if (obj instanceof Window) {
    return "window";
  } else if (obj instanceof Node && depth > 1) {
    return "Node (to see this value use selector)";
  } else if (typeof obj === "function") {
    return "function";
  } else if (typeof obj === "undefined") {
    return "undefined";
  } else if (typeof obj === "object" && obj) {
    if (!references.includes(obj)) {
      references.push(obj);
      const isArray = Array.isArray(obj);
      let out: any = null;
      for (const key in obj) {
        const value = obj[key];
        out = isArray
          ? [...(out || []), serialize(value, depth + 1, references)]
          : { ...(out || {}), [key]: serialize(value, depth + 1, references) };
      }
      return out;
    } else {
      return "Circular reference";
    }
  } else {
    return obj;
  }
}
