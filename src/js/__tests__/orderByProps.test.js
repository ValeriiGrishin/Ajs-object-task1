import orderByProps from '../orderByProps';

describe('orderByProps function', () => {
  describe('Основная функциональность', () => {
    test('сортировка свойств согласно порядку из задания', () => {
      const obj = { name: 'мечник', health: 10, level: 2, attack: 80, defence: 40 };
      const order = ['name', 'level'];
      
      const expected = [
        { key: 'name', value: 'мечник' },
        { key: 'level', value: 2 },
        { key: 'attack', value: 80 },
        { key: 'defence', value: 40 },
        { key: 'health', value: 10 },
      ];

      expect(orderByProps(obj, order)).toEqual(expected);
    });

    test('работа с пустым объектом', () => {
      expect(orderByProps({}, [])).toEqual([]);
    });

    test('сортировка по алфавиту при пустом порядке', () => {
      const obj = { z: 3, a: 1, b: 2 };
      const expected = [
        { key: 'a', value: 1 },
        { key: 'b', value: 2 },
        { key: 'z', value: 3 },
      ];

      expect(orderByProps(obj, [])).toEqual(expected);
    });
  });

  describe('Edge cases (особые случаи)', () => {
    test('игнорирует несуществующие свойства в порядке', () => {
      const obj = { a: 1, b: 2 };
      const order = ['c', 'a', 'd'];
      const expected = [
        { key: 'a', value: 1 },
        { key: 'b', value: 2 },
      ];

      expect(orderByProps(obj, order)).toEqual(expected);
    });

    test('работает с частичным порядком', () => {
      const obj = { a: 1, b: 2, c: 3, d: 4 };
      const order = ['c', 'a'];
      const expected = [
        { key: 'c', value: 3 },
        { key: 'a', value: 1 },
        { key: 'b', value: 2 },
        { key: 'd', value: 4 },
      ];

      expect(orderByProps(obj, order)).toEqual(expected);
    });

    test('учитывает только собственные свойства (for...in)', () => {
      const parent = { inherited: 'наследованное' };
      const obj = Object.create(parent);
      obj.own = 'собственное';
      
      const expected = [{ key: 'own', value: 'собственное' }];
      expect(orderByProps(obj, [])).toEqual(expected);
    });
  });

  describe('Валидация аргументов', () => {
    describe('некорректный первый аргумент (не объект)', () => {
      const error = 'Первый аргумент должен быть объектом';
      const testCases = [
        { input: null, description: 'null' },
        { input: 'строка', description: 'строка' },
        { input: 123, description: 'число' },
        { input: [], description: 'массив' },
      ];

      testCases.forEach(({ input, description }) => {
        test(`должна выбрасывать ошибку для ${description}`, () => {
          expect(() => orderByProps(input, [])).toThrow(error);
        });
      });
    });

    describe('некорректный второй аргумент (не массив)', () => {
      const obj = { a: 1 };
      const error = 'Второй аргумент должен быть массивом';
      const testCases = [
        { input: 'строка', description: 'строка' },
        { input: 123, description: 'число' },
        { input: {}, description: 'объект' },
      ];

      testCases.forEach(({ input, description }) => {
        test(`должна выбрасывать ошибку для ${description}`, () => {
          expect(() => orderByProps(obj, input)).toThrow(error);
        });
      });
    });
  });
});