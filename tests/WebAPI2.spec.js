const{test,expect,request}=require('@playwright/test')
// const path = require('path')

let webContext
const email='admin25@gmail.com'


test.beforeAll(async({browser})=>{
    const context=await browser.newContext()
    const page=await context.newPage()
    await page.goto("https://rahulshettyacademy.com/client/")
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Admin123")
    await page.locator("#login").click();
    await page.waitForLoadState('networkidle')
    await context.storageState({path:'state.json'})
    webContext=await browser.newContext({storageState:'state.json'}) 

})

test('client App login',async()=>{
    const productName= "ADIDAS ORIGINAL"
    const page= await webContext.newPage()
    const products=page.locator(".card")
    
    await page.goto("https://rahulshettyacademy.com/client/")
    
    products.first().waitFor()
    const count=await products.count()
    console.log(count)
    for (let i=0;i<count;++i){
        if(await products.nth(i).locator("b").textContent()===productName){
            await products.nth(i).locator("text= Add To Cart").click()
            break
        }

    }
    await page.locator("[routerlink*='cart']").click()
    await page.locator("div li").first().waitFor()
    const bool=await page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible()
    expect(bool).toBeTruthy()
    await page.locator("text=Checkout").click()
    await page.locator("[placeholder='Select Country']").pressSequentially("aus")
    const dropdown= page.locator("[class*=ta-results]")
    await dropdown.waitFor()
    const otpionsCount=await dropdown.locator("button").count()
    console.log(otpionsCount)
    for(let i=0;i<otpionsCount;++i){
        const text= await dropdown.locator("button").nth(i).textContent()
        if(text.trim()==="Australia"){
            await dropdown.nth(i).click()
            break;
        }
    }
    await expect(page.locator(".user__name [style*=lightgray]")).toHaveText(email)
    await page.locator(".action__submit").click()
    await expect ( page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ")
    const orderID=await page.locator(".em-spacer-1 .ng-star-inserted").textContent()
    console.log(orderID)
    await page.locator("button[routerlink*=myorders]").click()
    await page.locator("tbody").waitFor()
    const rows=await page.locator("tbody tr")
    console.log(rows)
    for (let i=0; i<await rows.count();++i){
        const rowOrderId=await rows.nth(i).locator("th").textContent()
        if(orderID.includes(rowOrderId)){
            await rows.nth(i).locator("button").first().click()
            console.log("clicked")
            break

        }
    }
    const orderIdDetails=await page.locator(".col-text").textContent()
    expect((orderID).includes(orderIdDetails)).toBeTruthy()
    await page.pause()

});
    

