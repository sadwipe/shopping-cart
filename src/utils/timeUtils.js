// bottom right timer
export function getTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  return currentTime;
}
