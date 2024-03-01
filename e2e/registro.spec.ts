import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

const firstname = faker.person.firstName();
const lastname = faker.person.lastName();
const email = faker.internet.email();
const company = faker.company.name();

// ***** SUCESSO ******

test('Fazer um registro com sucesso', async ({ page }) => {
  //DADO que acesso a página inicial
  await page.goto('https://demo.nopcommerce.com/')
  await expect(page).toHaveTitle(/nopCommerce demo store/)

  //E desejo me registrar
  const linkregistro = page.locator('.ico-register').click()

  //QUANDO preencho os dados
  const gender = page.locator('#gender-female' ).check()
  await page.fill('#FirstName',firstname)
  await page.fill('#LastName',lastname)
  const DateOfBirthDay = page.locator ('select[name=DateOfBirthDay]')
  await DateOfBirthDay.selectOption ({ value: '15' })
  const DateOfBirthMonth = page.locator ('select[name=DateOfBirthMonth]')
  await DateOfBirthMonth.selectOption ({value: '6'})
  const DateOfBirthYear = page.locator ('select[name=DateOfBirthYear]')
  await DateOfBirthYear.selectOption ({ value: '2000' })
  await page.fill('#Email',email)
  await page.fill('#Company', company)
  await page.getByRole('checkbox', { name: 'Newsletter' }).check();
  await page.fill('#Password','123456')
  await page.fill('#ConfirmPassword','123456')

  //E certifico que a data de aniversário está correta
  await expect(DateOfBirthDay).toHaveValue ('15')
  await expect(DateOfBirthMonth).toHaveValue ('6')
  await expect(DateOfBirthYear).toHaveValue ('2000')

  //ENTÃO confirmo o registro na página
  const register = page.locator('#register-button').click()
  const registration = page.locator ('div [class*=continue]')
  await expect(registration).toHaveText('Continue')
  await page.waitForTimeout(1000)
})

// ***** REQUIRED *****

test('First name não preenchido', async({page}) =>{
  //DADO que acesso a página inicial
  await page.goto('https://demo.nopcommerce.com/')
  await expect(page).toHaveTitle(/nopCommerce demo store/)

  //E desejo me cadastrar
  page.locator('.ico-register').click()

  //QUANDO não preencho o First name
  await page.fill('#LastName',lastname)
  await page.fill('#Email',email)
  await page.fill('#Password','123456')
  await page.fill('#ConfirmPassword','123456')

  //E tento confirmar o registro
  page.locator('#register-button').click()

  //ENTÃO o registro não é realizado e é exibida mensagem de falha
  const firstnamemessage = page.locator('span[id=FirstName-error]')
  await expect(firstnamemessage).toBeVisible()
  await page.waitForTimeout(1000)
})

test('Last name não preenchido', async({page}) =>{
  //DADO que acesso a página inicial
  await page.goto('https://demo.nopcommerce.com/')
  await expect(page).toHaveTitle(/nopCommerce demo store/)

  //E desejo me cadastrar
  page.locator('.ico-register').click()

  //QUANDO não preencho o Last name
  await page.fill('#FirstName',firstname)
  await page.fill('#Email',email)
  await page.fill('#Password','123456')
  await page.fill('#ConfirmPassword','123456')

  //E tento confirmar o registro
  page.locator('#register-button').click()

  //ENTÃO o registro não é realizado e é exibida mensagem de falha
  const lastnamemessage = page.locator('span[id=LastName-error]')
  await expect(lastnamemessage).toBeVisible()
  await page.waitForTimeout(1000)
})

test('Email não preenchido', async({page}) =>{
  //DADO que acesso a página inicial
  await page.goto('https://demo.nopcommerce.com/')
  await expect(page).toHaveTitle(/nopCommerce demo store/)

  //E desejo me cadastrar
  page.locator('.ico-register').click()

  //QUANDO não preencho o Email
  await page.fill('#FirstName',firstname)
  await page.fill('#LastName',lastname)
  await page.fill('#Password','123456')
  await page.fill('#ConfirmPassword','123456')

  //E tento confirmar o registro
  page.locator('#register-button').click()

  //ENTÃO o registro não é realizado e é exibida mensagem de falha
  const emailmessage = page.locator('span[id=Email-error]')
  await expect(emailmessage).toBeVisible()
  await page.waitForTimeout(1000)
})

test('Password não preenchido', async({page}) =>{
  //DADO que acesso a página inicial
  await page.goto('https://demo.nopcommerce.com/')
  await expect(page).toHaveTitle(/nopCommerce demo store/)

  //E desejo me cadastrar
  page.locator('.ico-register').click()

  //QUANDO não preencho o Password
  await page.fill('#FirstName',firstname)
  await page.fill('#LastName',lastname)
  await page.fill('#Email',email)
  await page.fill('#Password','123456')
  await page.locator('#ConfirmPassword').click()
  await page.fill('#Password','')
  await page.fill('#ConfirmPassword','123456')

  //E tento confirmar o registro
  page.locator('#register-button').click()

  //ENTÃO o registro não é realizado e é exibida mensagem de falha
  const passwordmessage = page.locator('span[id=Password-error]')
  await expect(passwordmessage).toBeVisible()
  await page.waitForTimeout(1000)
})

test('Confirm password não preenchido', async({page}) =>{
  //DADO que acesso a página inicial
  await page.goto('https://demo.nopcommerce.com/')
  await expect(page).toHaveTitle(/nopCommerce demo store/)

  //E desejo me cadastrar
  page.locator('.ico-register').click()

  //QUANDO não preencho o Confirm password
  await page.fill('#FirstName',firstname)
  await page.fill('#LastName',lastname)
  await page.fill('#Email',email)
  await page.fill('#Password','123456')

  //E tento confirmar o registro
  page.locator('#register-button').click()

  //ENTÃO o registro não é realizado e é exibida mensagem de falha
  const confirmpasswordmessage = page.locator('span[id=ConfirmPassword-error]')
  await expect(confirmpasswordmessage).toBeVisible()
  await page.waitForTimeout(1000)
})

// ***** OUTRAS VALIDAÇÕES *****

test('Email já cadastrado', async({page}) =>{
  //DADO que acesso a página inicial
  await page.goto('https://demo.nopcommerce.com/')
  await expect(page).toHaveTitle(/nopCommerce demo store/)

  //E desejo me cadastrar
  page.locator('.ico-register').click()

  //QUANDO preencho um e-mail já cadastrado
  await page.fill('#FirstName',firstname)
  await page.fill('#LastName',lastname)
  await page.fill('#Email','juliana@email.com')
  await page.fill('#Password','123456')
  await page.fill('#ConfirmPassword','123456')

  //E tento confirmar o registro
  page.locator('#register-button').click()

  //ENTÃO o registro não é realizado e é exibida mensagem de falha
  const messageerror = page.locator('.message-error')
  await expect(messageerror).toBeVisible()
  await page.waitForTimeout(2000)
})

test('Email fora do padrão', async({page}) =>{
  //DADO que acesso a página inicial
  await page.goto('https://demo.nopcommerce.com/')
  await expect(page).toHaveTitle(/nopCommerce demo store/)

  //E desejo me cadastrar
  page.locator('.ico-register').click()

  //QUANDO preencho o Email fora do padrão
  await page.fill('#FirstName',firstname)
  await page.fill('#LastName',lastname)
  await page.fill('#Email','teste@.com')
  await page.fill('#Password','123456')
  await page.fill('#ConfirmPassword','123456')

  //E tento confirmar o registro
  page.locator('#register-button').click()

  //ENTÃO o registro não é realizado e é exibida mensagem de falha
  const emailmessage = page.locator('span[id=Email-error]')
  await expect(emailmessage).toBeVisible()
  await page.waitForTimeout(1000)
})

test('Senha menor que 6 caracteres', async({page}) =>{
  //DADO que acesso a página inicial
  await page.goto('https://demo.nopcommerce.com/')
  await expect(page).toHaveTitle(/nopCommerce demo store/)

  //E desejo me cadastrar
  page.locator('.ico-register').click()

  //QUANDO preencho uma senha menor de 6 caracteres
  await page.fill('#FirstName',firstname)
  await page.fill('#LastName',lastname)
  await page.fill('#Email',email)
  await page.fill('#Password','123')
  await page.fill('#ConfirmPassword','123')

  //E tento confirmar o registro
  page.locator('#register-button').click()

  //ENTÃO o registro não é realizado e é exibida mensagem de falha
  const emailmessage = page.locator('span[id=Password-error]')
  await expect(emailmessage).toBeVisible()
  await page.waitForTimeout(1000)
})

test('Confirmação de senha diferente', async({page}) =>{
  //DADO que acesso a página inicial
  await page.goto('https://demo.nopcommerce.com/')
  await expect(page).toHaveTitle(/nopCommerce demo store/)

  //E desejo me cadastrar
  page.locator('.ico-register').click()

  //QUANDO preencho uma senha menor de 6 caracteres
  await page.fill('#FirstName',firstname)
  await page.fill('#LastName',lastname)
  await page.fill('#Email',email)
  await page.fill('#Password','123456')
  await page.fill('#ConfirmPassword','123123')

  //E tento confirmar o registro
  page.locator('#register-button').click()

  //ENTÃO o registro não é realizado e é exibida mensagem de falha
  const emailmessage = page.locator('span[id=ConfirmPassword-error]')
  await expect(emailmessage).toBeVisible()
  await page.waitForTimeout(1000)
})