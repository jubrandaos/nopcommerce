import { Page, expect } from '@playwright/test';

export class VisitPage{
    
    readonly page: Page

    constructor (page: Page){
        this.page = page
    }

    async go(){
        await this.page.goto('https://demo.nopcommerce.com/')
        await expect(this.page).toHaveTitle(/nopCommerce demo store/)
        const linkregistro = this.page.locator('.ico-register').click()
    }
}