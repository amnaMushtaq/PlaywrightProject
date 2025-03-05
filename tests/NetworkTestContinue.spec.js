const {test,expect}=require('@playwright/test')

test('Security Test request intercept',async({page})=>{

    
    const email="admin25@gmail.com"
    await page.goto("https://rahulshettyacademy.com/client/")
    await page.locator("#userEmail").fill(email)
    await page.locator("#userPassword").fill("Admin123")
    await page.locator("#login").click()
    await page.waitForLoadState('networkidle')
    await page.locator(".card-body b").first().waitFor()
    await page.locator("button[routerlink*=myorders]").click()
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route=>route.continue({url:'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6'})
    )
    await page.locator("button:has-text('View')").first().click()
    //await page.pause()
    await expect(page.locator(".blink_me")).toHaveText("You are not authorize to view this order");

    

} )