const {test,expect}=require('@playwright/test');



test('Add items to cart',async({page})=>{
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("admin25@gmail.com");
    await page.locator("#userPassword").fill("Admin123")
    await page.locator("#login").click();
    //await page.waitForLoadState('networkidle')
    await page.locator(".card b").first().waitFor();
    console.log(await page.locator(".card b").allTextContents());


});


test('UI Controls',async({page})=>{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    await page.locator("#username").fill("admin25@gmail.com");
    await page.locator("#password").fill("Admin123")
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click()
    console.log(await page.locator(".radiotextsty").last().isChecked());
    expect(await page.locator(".radiotextsty").last()).toBeChecked()
    const dropdown= page.locator("select.form-control");
    await dropdown.selectOption("consult");
    await page.locator("#terms").click();
    await expect( page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").toBeChecked()).tobeFalsy();
    await page.locator("[href*='documents-request']").toHaveAttribute("class","blinkingText");
    await page.locator()
    //await page.locator("#login").click();
    
});

test('Child window Handle',async({browser})=>{
    const context=await browser.newContext();
    const page=await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentlink=page.locator("[href*='documents-request']");
    const [newPage]=await Promise.all([
    context.waitForEvent('page'),
    documentlink.click()
    ])
    const text=await newPage.locator(".red").textContent();
    console.log(text);
    const arrayText=text.split("@");
    const domain=arrayText[1].split(" ")[0]
    console.log(domain)
    await page.locator("#username").fill(domain);
    console.log(page.locator("#username").textContent())
    await page.pause()

});


