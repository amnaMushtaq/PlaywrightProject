class LoginPage{

    constructor(page){
        if (!page) {
            throw new Error("Page instance is undefined in LoginPage! Ensure it is passed from POManager.");
        }
        console.log("✅ Page instance received in LoginPage");

        this.page=page
        this.userEmail=page.locator("#userEmail")
        this.password=page.locator("#userPassword")
        this.loginButton=page.locator("#login")
    }
    async goTo(){
        await this.page.goto("https://rahulshettyacademy.com/client")
    
    }

    async validLogin(userEmail, password)
    {

    await this.userEmail.fill(userEmail)
    await this.password.fill(password)
    await this.loginButton.click()
    await this.page.waitForLoadState('networkidle')

    }

}
module.exports={LoginPage}