const{test,expect}=require('@playwright/test')

test('login page Validation',async({page})=>{
    
    
    const userName=page.locator("#username");
    const errorMessage=page.locator("[style*='block']")
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");  
    await userName.fill("rahulshttyacademy");
    await page.locator("#password").screenshot({path:'partialScreenshot.png'})  //screnshot of specific element
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
    await page.screenshot({path:'screeenshot.png'}) //complete page screenshot

    
});
test('Visual Testing',async({page})=>{
    

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); 
    expect(await page.screenshot()).toMatchSnapshot('landing.png') // takes screen and compare with landing.png and if landing.png doesnt exists then it will take screenshot and store it with landing.png and on second run it will get passed if it get match
    
   

    
});