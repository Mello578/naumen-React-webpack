/**
 * Created by Mello on 13.07.2017.
 */

/**
 * проверка входных данных
 * @param inputData
 */

function testInputData(inputData) {
    try {
        const data = JSON.parse(inputData);
        for (let key in data) {
            for (let key2 in data[key]) {
                if (typeof(data[key][key2]) !== 'String') {
                    String(data[key][key2]);
                }
            }
        }
    } catch (e) {
        alert('Не верный фармат данных');
    }
}

/**
 * Проверка данных
 * @type {phoneReference}
 */
function phoneReference(reference) {

    if (!localStorage.getItem('key')) {
        let xhr = new XMLHttpRequest();

        xhr.open('GET', './build/arrayNames.json', true);
        xhr.onloadend = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                testInputData(xhr.responseText);
                localStorage.setItem('key', xhr.responseText);
                reference();
            } //   else {
            //     alert('Failed to load resource. \nStatus of ' + xhr.status);
            // }
        };
        xhr.send(null);
    } else {
        reference();
    }
}

module.exports = phoneReference;
