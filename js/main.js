/*
Функция, возвращающая случайное целое число из переданного диапазона включительно.
Пример использования функции:
имя_функции(от, до); // Результат: целое число из диапазона "от...до"
Источник: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 */

const getRandom = (from, to) => {
  if (from > to) {
    return -1;
  }

  const min = Math.ceil(from);
  const max = Math.floor(to);
  return Math.floor(Math.random() * (max - min + 1) + min);
};


getRandom(0, 100);

/*
 Функция для проверки максимальной длины строки.
*/

function maxStringLength(str, length) {
  return str.length <= length;
}

maxStringLength('12345678912345678', 20);
