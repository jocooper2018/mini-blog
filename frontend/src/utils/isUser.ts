export default function isUser(obj: any): boolean {
  if (!obj) {
    return false;
  }

  const isValidDate = (value: any): boolean => {
    if (value instanceof Date && !isNaN(value.getTime())) {
      return true;
    }
    if (typeof value === 'string') {
      return !isNaN(new Date(value).getTime());
    }
    return false;
  };

  return typeof obj?.id === 'number' &&
    typeof obj?.email === 'string' &&
    typeof obj?.username === 'string' &&
    isValidDate(obj?.createdAt)
}
