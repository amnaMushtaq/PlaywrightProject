const {test,expect}=require('@playwright/test');



test('context browser Playwright test',async ({browser})=>
    {
        //chrome- pulgin & cookies
        const context=await browser.newContext();
        const page=await context.newPage();
        await page.goto("https://www.google.co.uk/")
        console.log(await page.title());
        await expect(page).toHaveTitle("Google");

});


test('page playwright test ',async ({page})=>{
    
    await page.goto("https://playwright.dev/docs/test-timeouts#test-timeout");
    console.log(await page.title());
    await expect(page).toHaveTitle("Playwright")


});
test('login page Validation',async({page})=>{
    const userName=page.locator("#username");
    const errorMessage=page.locator("[style*='block']")
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await userName.fill("rahulshttyacademy");
    await page.locator("#password").fill("learning");
    await page.locator("[name='signin']").click();
   // await errorMessage.waitFor({ state: "visible" });
    console.log(await errorMessage.textContent());
    await expect(errorMessage).toContainText("Incorrect");
    await userName.fill("rahulshettyacademy");
    await page.locator("[name='signin']").click();
    //console.log("reached here")
    // console.log(await page.locator(".card-body a").first().textContent());
    // console.log(await page.locator(".card-body a").nth(1).textContent());
    console.log(await page.locator(".card-body a").allTextContents());

    
});

test('Add items to cart',async({page})=>{
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("admin25@gmail.com");
    await page.locator("#userPassword").fill("Admin123")
    await page.locator("#login").click();
    console.log(await page.locator(".card b").first().textContent());


});



