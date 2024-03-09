export function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts: Array<string> = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";")?.shift();
}

export function existsCookie() {
  const cookies = document.cookie.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    if (cookies[i].startsWith("username")) {
      const username = cookies[i].split("=")[1];
      return username;
    }
  }
}
