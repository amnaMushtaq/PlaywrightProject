const {test,expect}=require('@playwright/test');

const { POManager } = require('../pageObjects/POManager');





test.only('Add items to cart',async({page})=>{
    const productName= "ADIDAS ORIGINAL"
    //await page.route('**/*.{jpg,png,jpeg}',route=>route.abort())

    const userEmail="admin25@gmail.com"
    const password="Admin123"
    
    const poManager=new POManager(page)
    const loginPage=poManager.getLoginPage()
    await loginPage.goTo()
    await loginPage.validLogin(userEmail,password)
    
    const dashboardPage =poManager.getDashboardPage()
    await dashboardPage.searchProductAddCart(productName)
    await dashboardPage.navigateToCart()

    const cartPage=poManager.getCartpage()
    await cartPage.verifyProductIsDisplayed(productName)
    await cartPage.Checkout()

    const orderReviewPage=poManager.getOrderReviewPage()
    await orderReviewPage.searchCountryAndSelect("aus","Australia")
    await orderReviewPage.verifyEmailId(userEmail)
    const orderId=await orderReviewPage.SubmitAndGetOrderId()
    console.log(orderId)

    await dashboardPage.navigateToOrders()

    const orderHistoryPage=poManager.getOrderHistoryPage()
    await orderHistoryPage.searchOrderAndSelect(orderId)
    expect(orderId.includes(await orderHistoryPage.getOrderId())).toBeTruthy()
    //await page.pause()
});


