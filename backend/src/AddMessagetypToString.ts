export function addInfo(message: string) {
  return {
    messagetyp: "info",
    message: message,
  };
}
export function addError(message: string) {
  return {
    messagetyp: "error",
    message: message,
  };
}
export function addSuccess(message: string) {
  return {
    messagetyp: "success",
    message: message,
  };
}
