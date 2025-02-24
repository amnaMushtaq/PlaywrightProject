const {test, expect}=require('@playwright/test')
test.only('Add Item to cart',async({page})=>{

    const productName= "ADIDAS ORIGINAL"
    const products=page.locator(".card")
    const email="admin25@gmail.com"
    await page.goto("https://rahulshettyacademy.com/client/")
    await page.getByPlaceholder("email@example.com").fill(email)
    await page.getByPlaceholder("enter your passsword").fill("Admin123")
    await page.getByRole("button",{naame:"Login"}).click()
    products.first().waitFor()
   // const count=await products.count()
    await products.filter({hasText:"ADIDAS ORIGINAL"}).getByRole("button",{name:" Add To Cart"}).click()
    await page.getByRole("listitem").getByRole("button",{name:"   Cart "}).click()
    await page.locator("div li").first().waitFor()
    await expect(page.getByText("ADIDAS ORIGINAL")).toBeVisible();
    await page.getByRole("button",{name:"Checkout"}).click()
    
    await page.getByPlaceholder("Select Country").pressSequentially("aus")
    await page.getByRole("button",{name:" Australia"}).click()
    await expect(page.getByText(email)).toBeVisible()
    await page.getByText("PLACE ORDER").click()
    await expect( page.getByText(" Thankyou for the order. ")).toBeVisible()
    const orderID=await page.locator(".em-spacer-1 .ng-star-inserted").textContent()
    console.log(orderID)
    const updatedorderID=orderID.replace(/\|/g,"").trim()
    console.log(updatedorderID)
    await page.getByRole("listitem").getByRole("button",{name:"  ORDERS"}).click()
    await page.locator("tbody").waitFor()
    const rows=await page.locator("tbody tr")
    await rows.filter({hasText:updatedorderID}).getByText("View").click()
    await expect(page.getByText(updatedorderID)).toBeVisible()
    


});
