const { program } = require('commander');
const { Builder, By, Key, until } = require('selenium-webdriver');
require('dotenv').config();

const username = process.env.ORT_USERNAME;
const password = process.env.ORT_PASSWORD;

const materias = {
    nt2: '52980',
    tp2: '52334'
};

async function darpresente(codmateria) {
    console.log('BUeeeeeeeeeeeeeeeeeenass');
    let idmateria = materias[codmateria];
    if (!idmateria) return console.error('La materia que ingresaste no existe capo, fijate en la linea 8 de presente.js');

    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('https://aulavirtual.instituto.ort.edu.ar/login/index.php');

        await driver.findElement(By.id('username')).sendKeys(username);
        await driver.findElement(By.id('password')).sendKeys(password);
        await driver.findElement(By.id("loginbtn")).click();

        await driver.get(`https://aulavirtual.instituto.ort.edu.ar/mod/attendance/view.php?id=${idmateria}`)

        await driver.findElement(By.linkText('Enviar asistencia')).click();
        await driver.findElement(By.xpath('//span[@class="statusdesc" and contains(.,"Present")]')).click();
        await driver.findElement(By.name('submitbutton')).click();
        await driver.sleep(1000);

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