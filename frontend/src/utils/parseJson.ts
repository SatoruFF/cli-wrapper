export function parseJSON(data: any) {
  if (typeof data === "string") {
    try {
      return JSON.parse(data);
    } catch (e) {
      return data; 
    }
  } else {
    return data;
  }
}
