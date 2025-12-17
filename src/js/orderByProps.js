export default function orderByProps(obj, order) {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
    throw new Error('Первый аргумент должен быть объектом');
  }
  
  if (!Array.isArray(order)) {
    throw new Error('Второй аргумент должен быть массивом');
  }

  const result = [];
  const sortedKeys = [];

  // Свойства из массива порядка
  for (const key of order) {
    if (key in obj) {
      result.push({ key, value: obj[key] });
    }
  }

  // Остальные свойства (for...in)
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && !order.includes(key)) {
      sortedKeys.push(key);
    }
  }

  // Сортируем по алфавиту
  sortedKeys.sort();

  // Добавляем отсортированные
  for (const key of sortedKeys) {
    result.push({ key, value: obj[key] });
  }

  return result;
}