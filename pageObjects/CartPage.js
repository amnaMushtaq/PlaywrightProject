const { expect } = require('@playwright/test');

class CartPage{
    constructor(page){
        this.page=page
        this.checkout=page.locator("text=Checkout")
        this.cartItem=page.locator("div lie")
        
        

    }

    async verifyProductIsDisplayed(productName){
    await this.cartItem.first().waitFor()
    const productLocator=await this.getProductLocator(productName)
    //const bool=await this.getProductLocator(productName).isVisible()
    if(!productLocator){
        throw new Error(`🚨 Product Locator is undefined for: ${productName}`)
    }
    const isVisible=await productLocator.isVisible()
    console.log("is visible")
    //expect(isVisible).toBeTruthy()
    expect(isVisible).toBeTruthy()
    }

    async getProductLocator(productName){
        return await this.page.locator("h3:has-text('"+productName+"')")

    }
    

    
    async Checkout(){
        await this.checkout.click()
    }


     
    
}
module.exports={CartPage}