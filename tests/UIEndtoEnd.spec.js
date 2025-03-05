const {test, expect}=require('@playwright/test')
test.only('Add Item to cart',async({page})=>{

    const productName= "ADIDAS ORIGINAL"
    await page.route('**/*.{jpg,png,jpeg}',route=>route.abort())
    const products=page.locator(".card")
    const email="admin25@gmail.com"
    await page.goto("https://rahulshettyacademy.com/client/")
    await page.locator("#userEmail").fill(email)
    await page.locator("#userPassword").fill("Admin123")
    await page.locator("#login").click()
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

test('Playwright getByLabel locator',async({page})=>{
    await page.goto("https://rahulshettyacademy.com/angularpractice/")
    await page.getByLabel("Check me out if you Love IceCreams!").check()
    await page.getByLabel("Gender").selectOption("Female")
    await page.getByPlaceholder("Password").fill("test")
    await page.getByRole("button",{name:'Submit'}).click()
    await page.getByText(" The Form has been submitted successfully!.").isVisible()
    await page.getByRole("link",{name:'Shop'}).click()
    await page.locator("app-card").filter({hasText:'Blackberry'}).getByRole("button").click()
    await page.pause()

});