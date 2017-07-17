/**
 * Created by Mello on 14.07.2017.
 */

let dataKey = require('./sortPhone');
const KEY = dataKey.key,
        getData = dataKey.getData;

/**
 *  проверка вводимых данных и их добавление
 */

function addName() {

    /**
     * проверка полей ФИО и Телефон
     * @returns {boolean}
     */
    const checkField = function () {
        const fieldFio = $('#FIO').val(),
            fieldPhone = $('#phone').val();
        return fieldFio !== '' && fieldPhone !== '' ? true : false;
    }

    /**
     * проверка поля Email
     * @returns {boolean}
     */
    const checkEmail = function () {
        const fieldEmail = $('#email').val();
        const pattern = /^[a-z0-9_-]+@[a-z0-9-]+\.[a-z]{2,6}$/i;
        return fieldEmail.search(pattern) === 0 || fieldEmail === '' ? true : false;
    }

    if (checkField()) {
        if (($('#email').val() !== '' && checkEmail()) || $('#email').val() === '') {

            let enteredData = {
                FIO: $('#FIO').val(),
                phone: $('#phone').val(),
                email: $('#email').val()
            };

            const arr = getData(KEY);
            enteredData.id = arr.length + 1;
            arr.push(enteredData);
            localStorage.setItem('key', JSON.stringify(arr));

            $('#FIO').val('');
            $('#phone').val('');
            $('#email').val('');

            return getData(KEY);
        } else {
            alert('Не корректный Email');
            $('#email').attr('class', 'alertField');
            $('#email').focus(function () {
                $(this).removeClass('alertField');
            });
        }
    } else {
        alert('Поля ФИО и Телефон обязательны к заполнению');
        if ($('#FIO').val() === '') {
            $('#FIO').attr('class', 'alertField');
            $('#FIO').focus(function () {
                $(this).removeClass('alertField');
            });
        }
        if ($('#phone').val() === '') {
            $('#phone').attr('class', 'alertField');
            $('#phone').focus(function () {
                $(this).removeClass('alertField');
            });
        }
    }

};

module.exports = addName;