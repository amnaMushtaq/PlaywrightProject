const { expect } = require('@playwright/test');

class OrderReviewPage{
    constructor(page){
        this.selectCOuntry=page.locator("[placeholder='Select Country']")
        this.dropdown=page.locator("[class*=ta-results]")
        this.placeOrder=page.locator(".action__submit")
        this.emailId=page.locator(".user__name [style*=lightgray]")
        this.heroTitle=page.locator(".hero-primary")
        this.orderId=page.locator(".em-spacer-1 .ng-star-inserted")
        

    }
    async searchCountryAndSelect(countryCode,countryName){

    await this.selectCOuntry.pressSequentially(countryCode)
    
    await this.dropdown.waitFor()
    const otpionsCount=await this.dropdown.locator("button").count()
    console.log(otpionsCount)
    for(let i=0;i<otpionsCount;++i){
        const text= await this.dropdown.locator("button").nth(i).textContent()
        if(text.trim()===countryName){
            await this.dropdown.locator("button").nth(i).click()
            break;
        }
    }
    //await expect(page.locator(".user__name [style*=lightgray]")).toHaveText(userEmail)
    // await this.placeOrder.click()
}

async verifyEmailId(userEmail){
    await expect(this.emailId).toHaveText(userEmail)
}



async SubmitAndGetOrderId(){

    
        await  this.placeOrder.click()
        await expect ( this.heroTitle).toHaveText(" Thankyou for the order. ")
        return await this.orderId.textContent()
        
    }
    

}
module.exports={OrderReviewPage}
