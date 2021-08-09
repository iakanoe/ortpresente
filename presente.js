const { program } = require('commander');
const { Builder, By, Key, until } = require('selenium-webdriver');
require('dotenv').config();

const username = process.env.ORT_USERNAME;
const password = process.env.ORT_PASSWORD;

const materias = {
    nt1: '52980'
};

async function darpresente(codmateria) {
    console.log('BUeeeeeeeeeeeeeeeeeenass');
    let idmateria = materias[codmateria];
    if (!idmateria) return console.error('La materia que ingresaste no existe capo, fijate en la linea 8 de presente.js');

    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Navigate to Url
        await driver.get('https://aulavirtual.instituto.ort.edu.ar/login/index.php');

        // Enter text "cheese" and perform keyboard action "Enter"
        await driver.findElement(By.id('username')).sendKeys(username);
        await driver.findElement(By.id('password')).sendKeys(password);
        await driver.findElement(By.id("loginbtn")).click();

        await driver.get(`https://aulavirtual.instituto.ort.edu.ar/mod/attendance/view.php?id=${idmateria}`)

        console.log('Listo che, nnv');
    } finally {
        driver.quit();
    }
}



program.version('0.0.1');
program
    .argument('<materia>')
    .description('Dar presente en la materia ingresada. Se ingresa en minúscula como aparece en el AV (ejemplo "nt1").')
    .action(darpresente);
program.parse();