const{test,expect}=require('@playwright/test')

test("Calendar Validation",async({page})=>{
    const monthNumber="6"
    const day="15"
    const year="2027"
    const ExpectedList=[monthNumber,day,year]

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers")
    await page.locator(".react-date-picker__calendar-button__icon").click()
    await page.locator(".react-calendar__navigation__label__labelText").click()
    await page.locator(".react-calendar__navigation__label__labelText").click()
    await page.getByText(year).click()
    await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber)-1).click()
    await page.locator("//abbr[text()='"+day+"']").click()
    const inputs=page.locator("react-date-picker__inputGroup__input")
    for(let i=0;i<inputs.length;++i){
        const value=inputs.nth(i).getAttribute("value")
        console.log(value)
        expect(value).toEqual(ExpectedList[i])
    }
    console.log("passed")


    await page.pause()


})