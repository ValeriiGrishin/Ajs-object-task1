import orderByProps from './js/orderByProps';

const obj = {name: 'мечник', health: 10, level: 2, attack: 80, defence: 40};
const order = ['name', 'level'];
const result = orderByProps(obj, order);

console.log('Задача: for...in - сортировка свойств объекта');
console.log('Исходный объект:', obj);
console.log('Порядок сортировки:', order);
console.log('Результат:');
result.forEach(item => {
  console.log(`  {key: "${item.key}", value: ${item.value}}`);
});