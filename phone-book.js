'use strict';

/**
 * Сделано задание на звездочку
 * Реализован метод importFromCsv
 */
const isStar = false;

/**
 * Телефонная книга
 */
let phoneBook = [];

/**
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String?} name
 * @param {String?} email
 * @returns {Boolean}
 */
function add(phone, name, email) {
    if (checkArguments(phone, name)) {
        return false;
    }
    for (let i = 0; i < phoneBook.length; i++) {
        if (phoneBook[i].phone === phone) {
            return false;
        }
    }
    phoneBook.push({ phone: phone, name: name, email: email });

    return true;
}

function checkArguments(phone, name) {
    if (typeof(phone) !== 'string') {

        return true;
    }
    if (phone.search('^\\d{10}$') === -1) {

        return true;
    }
    if (typeof(name) !== 'string' || name === '') {

        return true;
    }
}

/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String?} name
 * @param {String?} email
 * @returns {Boolean}
 */
function update(phone, name, email) {
    if (checkArguments(phone, name)) {
        return false;
    }
    for (let i = 0; i < phoneBook.length; i++) {
        if (phoneBook[i].phone === phone) {
            phoneBook[i].name = name;
            phoneBook[i].email = email;

            return true;
        }
    }

    return false;
}

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 * @returns {Number}
 */
function findAndRemove(query) {
    let rez = [];
    let removed = 0;
    if (query === '*') {
        removed = phoneBook.length;
        phoneBook = rez;

        return removed;
    }
    if (checkQuery(query)) {

        return 0;
    }
    for (let i = 0; i < phoneBook.length; i++) {
        if (!(isSuitable(phoneBook[i], query))) {
            rez.push(phoneBook[i]);
        }
    }
    removed = phoneBook.length - rez.length;
    phoneBook = rez;

    return removed;
}

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 * @returns {String[]}
 */

function formatData(person) {
    let rezultString = person.name +
    ', +7 (' +
    person.phone.slice(0, 3) +
    ') ' +
    person.phone.slice(3, 6) + '-' +
    person.phone.slice(6, 8) + '-' +
    person.phone.slice(8, 10);
    if (typeof(person.email) !== 'string' ||
    person.email === '') {

        return rezultString;
    }

    return rezultString + ', ' + person.email;
}

function isSuitable(person, query) {
    if (typeof(person.email) !== 'string') {

        return person.phone.includes(query) ||
        person.name.includes(query);
    }

    return person.phone.includes(query) ||
    person.name.includes(query) ||
    person.email.includes(query);
}

function checkQuery(query) {

    return typeof(query) !== 'string' || query === '';
}

function find(query) {
    let rez = [];
    if (checkQuery(query)) {

        return rez;
    }
    if (query === '*') {
        for (let i = 0; i < phoneBook.length; i++) {
            rez.push(formatData(phoneBook[i]));
        }

        return rez.sort();
    }
    for (let i = 0; i < phoneBook.length; i++) {
        if (isSuitable(phoneBook[i], query)) {
            rez.push(formatData(phoneBook[i]));
        }
    }

    return rez.sort();
}

/**
 * Импорт записей из csv-формата
 * @star
 * @param {String} csv
 * @returns {Number} – количество добавленных и обновленных записей
 */
function importFromCsv(csv) {
    // Парсим csv
    // Добавляем в телефонную книгу
    // Либо обновляем, если запись с таким телефоном уже существует

    return csv.split('\n').length;
}

module.exports = {
    add,
    update,
    findAndRemove,
    find,
    importFromCsv,

    isStar
};
