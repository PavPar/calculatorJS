var fs = require('fs');
var path = require('path');

const numpadSelector = '.calculator__numpad';
const operationsSelector = '.calculator__operations'
const buttonSelector = '.calculator__button';
const buttonClass = 'calculator__button';
const inputSelector = '.calculator__input'

const textInput = document.querySelector(inputSelector)
const numpad = document.querySelector(numpadSelector);
const operations = document.querySelector(operationsSelector)

numBtns = numpad.querySelectorAll(buttonSelector);

numpad.addEventListener('click', (event) => {
    if (event.target.classList.contains(buttonClass)) {
        textInput.textContent += event.target.textContent;
        currVal = textInput.textContent;
    }
})

try {
    require('electron-reloader')(module)
} catch (_) { }


let operation = '';

let storedVal = '';
let currVal = '';
operations.addEventListener('click', (event) => {
    storedVal = Number(storedVal);
    currVal = Number(currVal)

    if (event.target.textContent == '=') {
        calculate();
    } else {
        if (storedVal == '') {
            storedVal = currVal;
        } else {
            calculate()
        }
        currVal = '';
        textInput.textContent = '';
        operation = event.target.textContent;
    }

})


function calculate() {
    switch (operation) {
        case "=":
            break;
        case "+":
            storedVal += currVal;
            break;
        case "-":
            storedVal -= currVal;
            break;
        case "*":
            storedVal *= currVal;
            break;
        case "/":
            storedVal /= currVal;
            break;
    }
    textInput.textContent = storedVal;
    currVal = '';
}

const filepath = path.join(__dirname, 'files', 'file_1.txt')


function readFile(filepath) {
    return fs.readFileSync(filepath, (err, data) => {
        if (err) {
            return "An error ocurred reading the file :" + err.message;
        }
        return data;
    });

}

function getFileInfo(filepath) {
    return fs.statSync(filepath, (err, data) => {
        if (err) {
            return "An error ocurred reading the file :" + err.message;
        }
        return data;
    })
}

/*
4 запуска 
Файлы 
3 - основных 
4 - пустышки (в data)
2 - в documents ()

разложить файлы 
    1.Documents/Calculator 
    2.Calculator (сама папка где приложение)
    3.Games/hiddenfolder
Считать файлы
файлы 
    1- Содержит кол-во запусков  
    2- Содержит пути к файлам 
    3- Содержит кол-во запусков

При запуске происходит следующие

1.
Происходит чтение всех файлов в папке data (4+1)
из них читается только файл по признаку (backup-fonts)
В нем содержаться пути к 2 остальным файлам

2.

файл №1 в documents

содержит информацию user profile 
2-(фальшивки в которые просто заносится различная ифнормация)

3.
файл №3 в games/hiddenfolder
содержит информацию о конфигурации приложения (2 - фальшивки)

Запуск

//1 шаг
1. чтение файла в корне и проверка наличия файлов в указанных путях асинхронно каждого файла в папке data(включая файл с путями)
2. отдельно происходит чтение файла с данными о путях к файлам ()
3. получение информации о файлах и проверка их даты создания

//2 шаг 
1. чтение данных из всех файлов user 
2. асинхронно чтение всех файлов из config
3. чтение данных из user (кол-во запусков)

//3 шаг 
1. чтение данных из всех файлов config 
2. асинхронно чтение всех файлов из user
3. config (кол-во запусков)


//Алгоритмы шифровки

1 файл (запуск)
Кол-во запусков -> 
    fr - 4
    te - 3
    to - 2
    oe - 1
    zo - 0

{шум}f{шум}r{шум}
позиция первой и последней буквы должны быть равным 4 (проверка через разницу позиций)
цикл начинает смотреть
с начала с 4 и вниз

ключ (длинна/2 -1= кол-во запусков)

zo oe to te fr
01 23 45 67 89

алгоритм

считать данные

{2141}f{2фызйц$кзйцкй...}r{124}

1) получаем длину запусков

2) через цикл начинаеи посмотр букв причем смотрим на позиции в строке начиная с длинны ключа смотрим на 5,4,3,2,1,0 позции и с конца тоже самое
(длинна шума рандомная в центральной позиции но в середине должен быть символ $)

3)в цикле сравниваем буквы с понятно чем




2 файл (пути)
Шифр путей

C:/Users/documents/...



3 файл (запуск)

1 файл (запуск)
Кол-во запусков -> 
    fr - 4
    te - 3
    to - 2
    oe - 1
    zo - 0

{шум}f{шум}r{шум}
позиция первой и последней буквы должны быть равным 4 (проверка через разницу позиций)
цикл начинает смотреть
с начала с 4 и вниз

ключ (длинна/2 -1= кол-во запусков)

zo oe to te fr
01 23 45 67 89
oz eo ot et rf

алгоритм

считать данные

{2141}r{2фызйц$кзйцкй...}f{124}

1) получаем длину запусков

2) через цикл начинаеи посмотр букв причем смотрим на позиции в строке начиная с длинны ключа смотрим на 5,4,3,2,1,0 позции и с конца тоже самое
(длинна шума рандомная в центральной позиции но в середине должен быть символ $)

3)в цикле сравниваем буквы с понятно чем



//Алгоритмы проверки

1. Проверить дату изменения файла (у всех файлов она должна быть одинаковой)
2. Проверить что совпадают буквы на своих местах
*/
console.log(readFile(filepath));
console.log(getFileInfo(filepath));

// const key = 'zooetotefr'
const key = 'qppwetpwet'//ключ может быть рандомным

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
function makeid(length) {
    var result = '';
    var characters = chars;
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function encr(key, amount) {
    if (amount < 0) { amount = 0 }
    return makeid(amount) + key[amount * 2] + makeid(Math.floor(Math.random() * 1000)) + key[amount * 2 + 1] + makeid(amount);
}

function decr(key, text) {
    // console.log(text)
    for (i = key.length / 2; i >= 0; i--) {
        if (key.includes(text[i] + text[text.length - i - 1])) {
            return i;
        }
    }
    return false;
}

/*
C:/Users/Pasha/AppData

Users -> <32>u<12>s<33>e<12>r<44>s 
Pasha
AppData


<32>$<12>#<33>
u    s     e 


*/

function encrPath(filePath, key) {
    res = ""
    filePath = filePath.trim()
    filePath.split('/').forEach((dir) => {
        dir.split('').forEach((letter) => {
            res += makeid(letter.charCodeAt(0));
            res += key[1]
        })
        res += key[0]
    })
    return res;
}

function decrPath(data, key) {
    res = []
    data.split(key[0]).forEach(segment => {
        word = "";
        segment.split(key[1]).forEach(code => {
            word += String.fromCharCode(code.length);
        })
        res.push(word);
    });
    return res;
}

console.log(decr(key, (encr(key, 4))));

const encrPathRes = encrPath(path.join(__dirname, 'aa'), '$#');
const decrPathRes = decrPath(encrPathRes, '$#')
// console.log(encrPathRes);
// console.log(path.join.apply(null, decrPathRes))

/*
fileHeader?

*/
function createFile(isReal, path, data) {

}


//Heart

/*

Как проверить что запуск 1-ый ?

файл в app-data?



Процедура 1-го запуска

1. Посмореть data в корне приложения
2. Если в data отсутствует файл с путями - блок
3. Если в data не хватает других файлов - блок
4. Дата первого запуска шифруется и размещается в рандомных файлах (?) 
5. Чтение тех 2-ух файлов и сравнение их значений
6. Запуск


Процедура закрытия
1. Изменение данных тех 2-ух файлов уменьшение кол-ва запусков на 1
2. 

Процедура обыного запуска

1-3,5 шаги 
6. Проверка изменения файлов
7. Проверка числов запуска

//1 шаг
1. чтение файла в корне и проверка наличия файлов в указанных путях асинхронно каждого файла в папке data
(включая файл с путями)

2. отдельно происходит чтение файла с данными о путях к файлам ()
3. получение информации о файлах и проверка их даты создания

//2 шаг 
1. чтение данных из всех файлов user 
2. асинхронно чтение всех файлов из config
3. чтение данных из user (кол-во запусков)

//3 шаг 
1. чтение данных из всех файлов config 
2. асинхронно чтение всех файлов из user
3. config (кол-во запусков)



Алгоритм 
1. Считать файлы con-
2. Считать данные файлов с кол-вами запусков
3. 

*/

// console.log(encrPath(path.join(__dirname, 'ext', 'hidden'), '$%'));

const stateFile = '$w3uVPhEv0bb5e2oBYlclHEDFkdZ1CoTt1mTqsOiOH36pm8bh296EhP6wFYbs7eo4YWhMefk9W66K8JpTzmf68TnNdsR3T1etc7nt00qf%mOALoMOUDprWDr1EbXW9oPZIWl3ZNJVtmZmC0Pugl0qpjEv3L2bmRYDOjm0ntwIsGOfN3W8ATIGYHaFRHbsfm8B00PBKQAU3Kwp1y8eKJjw4Ovk%nC8fUuOz7HfysZysW9Zt7EFFVp207XqSyprxSKgi3CbcJKcPRWs4u2iJFQ9e5Y1Wwr0CqJf5Jgr20CcA3ZTprZgGQuMQTAMRHlFcxmYLs7Jfo%ss6bpL7NVfAV27QlQRjGArNjLA1e8riMpewstHyM9YYD8PLQqeAB1Aooy48nH74lqrD1w2BcQyV02AnlUdzxkB3SdXzkkiCW3QfEY%$q0TBApkCHemHSmNjnW0RJ1Xp3bAXPlQ5tFQyY8Dcly6fNutDT4eZO2ssHQvcYQjo6R6zON5ZQmB6QPqCQoedzw0yoRbJL5qH6%xhtQNxoPdbFi9HCmxuzemZJQPNLOhy3jUzrVDbjJVYlMEV8pz1mzFyN0t6Xqu5eBVeKPH2ZwcAa0y6SJad0opC7mCsUYqojB0CfczubNv0o6pvBmH0e%GwgL8TBjgjbhmYiEfRdT6HhIBbRHPSPwvUxFfH4aUuHzmQDkHPe4CSRvmW6c5EyQTlxSPQxZRAGfuDtISyKPBejvjvIJPGWlFMNsbAwF%slEznqmMUR2i6z6v5HmlLCRsZ3aWD6dSlulOhqmRSBxy5eqTmUHFG91w5fyq4Ux6050rD4m9RRsqvEGGQLCQhvJApO0TWjKOh%$aNLwUNF63VeBewVOld9BhlSATIv1chwxy4SkhTg5zc9YeE6Qql9qvajeA8VyOUZhQZQT%zNTYooVRo5pkdF0g0FcYnboAIBiumXhpbi8rv47x1NWUG0xwt4guLX88LiBG2Ghk8EVFmDdCdVHG26WcLjtvEqNAbBcpKxdjmIBFx%iH0932LFnWGQEy6jxmG8gY1xcyU1Xd4lK4X3FQL8dXeleqvUVioXxDJc3gAL0qVtlVtxH0TLQHVVSSptTpz3gS9N0W8nvQM3GIhDdr0HUjldc3n35Tw%MllX0QLTUOde9WYmqlfhTJSQ2CHL1BZOyEKegyM9JpXuQYNLpXquDZSJ6p5nuJqkT2mwKh76Pi3gOSEXtnH2tTNC0GSnmKhvqZ5X3Q6UxMh%yzEA6umiLu8YBuVDnIK1giR22MEBv6uSNzLgRWlhBwWnKjBtC2JC5K3qr2SA8cu9KMzto6A1tJy9njBPx2a0XIMl5G7q4lVCmnf9zdeqo2BjaIfPBCCS%gEb5lceLgth83SpU21H85qUgvGWx09sFFohAIUdgsq1cJqoJJ922Ny1gEG39p0g0VzP4gwjTBu7NeqSSduOJUxSBCuFVbC5nd6x0Yf04JeRhmy3%AupSgZND5SoZz5kh65c9uWSRMunXZxHxi2Ttk2OESEn7RGDd1x4vrJ5O0twbZcITIeLwMEh8Q4RpNSrzJciXtdrTwuWnEWFEOSo1TAuBA68jstzY%$ktbab63vDAnDvsHp3xunozf6PFXYroVx3tYIQWIS5vgeyYPg6ioCNyORVKPMje0pCpT8%yP8DXKspCOUrkuwiOza0nJX0SaMdLordUh2uLDWyQ0KSTg7IAdLBJXmarIxqnIqKOziVO%PsU0HWFgb5FYGOyAx0gncpLV5bdxwErLGuSoC5HrUkzNM3K4BXU0roZe1oz6flZPhMMtm5oaMRjVzhzXigDusP%$AXE8oAxHutA3eXtjsGMzfvFHp9H2piRiIEOrvoMEGyqTaGWKGzF6lXiWHxDLDXlz07cEhKqmC%3PfCiOx5swHCCzGgceWAnxY1DSGcqFD7NOHBLRS3dYYwj6wg4mCoCeVh0RuABKX6o3AiraGWIGMHrS5REEu%$m6ptzMgdoU2Plu4sILDRmxQQ5vklo6050FAlvEW6C3kDO0YiAnRzCfA7jd2GmIjjpovGEnsvj9nVlJuDqFz4mVHlITcU0MGevkedcUQfHKHB%GEG2375QBKXpbVShkASSGfVE9OGQccXUR7BnO6orh8n2yV92edSUFw5kIX2GOxZkJbuRereaQ5vxTrGUnIXF6eE4zDBUBRvjG%OryxxJNWvbW1SwAahkI4k2MoSmZDUMdmj757uvArOguf9EfXvBQMDpxwvggdU2mVQrNebDA0cOC3RGYWxESbGt0s9gjK4zYoin%8418nF1aT70S2nguLiyjoE1o8tzx5f5cEFs9LJMGqo3S3eEatEd03gHjyULPlU9NVILOem3XKFyFW7DVewaRtTPSU1XL0YV%xhq3QfijEMCYzFqWFMB4wHwph9RsxKbx5T2bAJw73AgpVp7QU%$QgJzegQp97xAEQs6Mmew4DAQRyKtpiVgSq83a9rLUMIXbZnv3Ld6C1Ng9S2HZU619D1WE1BsfCX8Go28ualPV9HGFlQQbEOEttgAlE3t7YywTgIwowd%slZ56CE5FWEW8QSFMmyuWO6yhSpr0QEky5dbO1rsn3tlLWFCJ5dNAQbTAf4SohAfU2nd0VFUuo4f3VQUYDqRJCB43HF1qRChDqcvanyFThbcndcPCO%Bqb5nBe3jSa4Z1BbfcT4I2CcNuwLjodQMY9bySzLk3ul2LGNTSwhQCcDOysFpSeTOIvMTiiEYGRbgn8fB1BXg4sGmdSYIuFqXSd%$9qG385dl7cGx5DHKz0G4d4SXakx1sxzisdjEDeQ0R6k5hlxvqmAqlQuJuJh9rxMODfccTjk59qOpSNisEHMywlYtgsvasHzL3oblt%12F5cii4S1Z3bK0o4RVxMxgyw9gSn6e7wgbzjgWklzjnx0uyyRP0bENbhXYgHuSKPPpnRtf5lDsKnAAPx8TNEAugsBC9dm5KheHGGzj1vjMKaGrZg59r2AEJ%1XFx4LRyzei8x8Yv8SHoq8T2R25JixeSmkeOfRvqOPcimJ72WUScTSWgFn0xoIaBme0UlMfOlx0xTACvsDqW5jkYkrXyBmwvZ2UuLWhTUQTmv6YbPiFi%$YSVUCRwAddGWtzYMtYDduyK4bS9OEQ2rEmD01Lo2ZirSQaZanUza6fS5XKJ6CPaVyzVH97bGauPVtCE4wwY0C5mFojrcM7rBGrDqcKY0%gBTHldcJeZbzpXhXgjvigQHCX89qre71Cdam167cKyrGuTcL3zK1b5bTHqLkFAm4b31Q8zGD2ztM5WclpwagDEHXKiwHStMxixpAl2DkA%y7a0KsGNSbIxufyhNl8Izq2oTVh2NNOzhcV4ijccMh1GLxctwOwzsGdA5JqH8yzccmN8KJps4XGJwsAj4wu1NDVvTbmOskFtLDLQ%DMQlpiuit6HgpEcf9zRoURKh8jyi7lgfhAjXuXCfnB6XhNSHhxkBYi6LML6fa3jyN9ZCAXYvJf31CZZNgEZt7HeBXqQlX8W8q2do%g3gIQ40IAbH2mc6lmVdmuj7wwUOCp8XPkGPYiTOPif7wECM8PEIgaTMmYGM9RNPnY0JDy5y0HeEDNLkJ9hTBh7o6e2yn65ch6C3bX%vQvQBIm5KsLGZ6FtoosGU6UcnANmE87sV0XpmeTLNwtMx7YYt32hRYQcfVvK8KY6j8JJ9x9x4llJ6QhLU5LYMolinFaWhrRP8wKYC4RvSwg8XS%$'

const folderPathA = path.join(__dirname, 'ext', 'folder 1');
const folderPathB = path.join(__dirname, 'ext', 'folder 2');
const configFile = path.join(__dirname, 'ext', 'hidden', 'secret.dat');

function checkIntegrity() {
    return fs.existsSync(folderPathA) && fs.existsSync(folderPathB)
}

function checkExistence() {
    return fs.existsSync(folderPathA) || fs.existsSync(folderPathB)
}

//Проверяем дату создания всех документов 
function checkDate() {

}

function writeFileSyncRecursive(filename, content, charset = 'utf-8') {
    // -- normalize path separator to '/' instead of path.sep, 
    // -- as / works in node for Windows as well, and mixed \\ and / can appear in the path
    let filepath = filename.replace(/\\/g, '/');

    // -- preparation to all w absolute paths as well
    let root = '';
    if (filepath[0] === '/') {
        root = '/';
        filepath = filepath.slice(1);
    }
    else if (filepath[1] === ':') {
        root = filepath.slice(0, 3);   // c:\
        filepath = filepath.slice(3);
    }

    // -- create folders all the way down
    const folders = filepath.split('/').slice(0, -1);  // remove last item, file
    folders.reduce(
        (acc, folder) => {
            const folderPath = acc + folder + '/';
            if (!fs.existsSync(folderPath)) {
                fs.mkdirSync(folderPath);
            }
            return folderPath
        },
        root // first 'acc', important
    );

    // -- write file
    fs.writeFileSync(root + filepath, content, charset);
}

function readFolder(folderPath) {
    const files = fs.readdirSync(folderPath);
    const res = []
    files.forEach((file) => {
        if (file.includes('con')) {
            res.push(decr(fs.readFileSync(configFile, { encoding: 'utf-8' }), fs.readFileSync(path.join(folderPath, file), { encoding: 'utf-8' })));
        } else {
            // fs.readFile(filePath)
        }
    })
    return res[0];
}

function compareFiles(){
    return getFileInfo(path.join(folderPathA, 'config.dat')).mtimeMs == getFileInfo(path.join(folderPathB, 'config.dat')).mtimeMs
}

function validate() {
    if (!checkIntegrity()) {
        if (fs.existsSync(configFile)) {
            console.log('lock - cofigfile exists folder doesnt')
        } else {
            if (checkExistence()) {
                console.log('lock - config folder is missing')
            } else {
                const state = makeid(8);
                writeFileSyncRecursive(path.join(folderPathA, 'config.dat'), encr(state, state.length / 2 - 1))
                writeFileSyncRecursive(path.join(folderPathB, 'config.dat'), encr(state, state.length / 2 - 1))
                writeFileSyncRecursive(configFile, state)
            }
        }
    }

    if (readFolder(folderPathA) != readFolder(folderPathB)) {
        console.log('lock - integrity fail')
    }

    if( !compareFiles()){
        console.log('lock - modified')
    }

    if (!readFolder(folderPathA)) {
        console.log('lock - expired')
    }

    const state = fs.readFileSync(configFile, { encoding: 'utf-8' })

    writeFileSyncRecursive(path.join(folderPathA, 'config.dat'), encr(state, readFolder(folderPathA) - 1))
    writeFileSyncRecursive(path.join(folderPathB, 'config.dat'), encr(state, readFolder(folderPathB) - 1))


    return true;
}


validate()


// console.log(encrPath(path.join(__dirname, 'ext', 'hidden', 'secret.dat'), '$%'))
            // let filePath = path.join(path.join.apply(null, decrPath(stateFile, '$%')),'state.dat')


            // console.log(decrPath(stateFile, '$%'))
            // // fs.writeFileSync(,)
            // fs.writeFileSync(path.join(__dirname, 'ext', 'folder 2','file.dat'),encr(state,state.length/2))
            // fs.writeFileSync(path.join(decrPath(state,'$%')),key)