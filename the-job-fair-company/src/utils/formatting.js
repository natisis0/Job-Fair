export function formatDate(dateString, locale = "en-GB") {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatTime(timeString) {
  if (!timeString) return "";
  // Assuming timeString is in HH:mm:ss format from DB
  const [hours, minutes] = timeString.split(':');
  const h = parseInt(hours);
  const ampm = h >= 12 ? 'pm' : 'am';
  const hh = h % 12 || 12;
  return `${hh}.${minutes} ${ampm}`;
}


export const calculateDaysToGo = (date) => {
    const diff = new Date(date).getTime() - new Date().getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };