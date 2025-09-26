export  function DateFormat(isoDate = '2024-06-10T06:24:42.489Z') {
  const date = new Date(isoDate);
    
  const year = date.toLocaleDateString('en-US', { year: 'numeric' });
  const month = date.toLocaleDateString('en-US', { month: 'short' });
  const day = date.toLocaleDateString('en-US', { day: '2-digit' });
  const hours24 = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const hours12 = (date.getHours() % 12 || 12).toString().padStart(2, '0');
  const ampm = date.getHours() < 12 ? 'AM' : 'PM';
  const time24 = `${hours24}:${minutes}`;
  const time12 = `${hours12}:${minutes} ${ampm}`;

  return { year, month, day, time24, time12 };
}

  // export async function convertDateTime(isoDate) {

  // }
  