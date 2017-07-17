/**
 * Created by Mello on 13.07.2017.
 */

//название ключа под которым хранятся данные
const KEY = 'key';
let glyph,
    sortMas = [];

// создаем переменную в localStorage для сортировки списков по возрастанию и убыванию
localStorage.setItem('orderSort', '1');

const fields = [
    {
        id: 'FIO',
        name: 'ФИО'
    },
    {
        id: 'phone',
        name: 'Телефон'
    },
    {
        id: 'email',
        name: 'Email'
    },
];

const getData = function (storageKey) {
    return JSON.parse(localStorage.getItem(storageKey));
}
/**
 * функция сортировки
 * @param colName наименование колонки
 */
function sortPhone(colName) {

    let order = localStorage.getItem('orderSort');
    const arr = sortMas.length === 0 ? getData('key') : sortMas;

    arr.sort((item1, item2) => {
        const first = item1[fields[colName].id];
        const second = item2[fields[colName].id];
        let variableOne, variableTwo;

        //проверяем четность для сортировки в ту или иную сторону
        if (order % 2 === 0) {
            variableOne = -1;
            variableTwo = 1;
            glyph = 'glyphicon glyphicon-triangle-bottom';
        } else {
            variableOne = 1;
            variableTwo = -1;
            glyph = 'glyphicon glyphicon-triangle-top';
        }
        return first < second ? variableOne : variableTwo;
        return 0;
    });

    //создание и удаление glyphicon
    for (let i = 0; i < 3; i++) {
        colName === i ? $('#glyph' + i).attr('class', glyph) : $('#glyph' + i).removeClass();
    }
    order++;
    localStorage.setItem('orderSort', order);
    localStorage.setItem('key', JSON.stringify(arr));

    return arr;
}


module.exports = {
    sortPhone : sortPhone,
    getData : getData,
    key : KEY,
    fields : fields
};