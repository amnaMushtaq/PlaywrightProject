const ExcelJs=require('exceljs')
const {test,expect}=require('@playwright/test')



async function writeExcelTest(searchText,replaceText,change, filePath){
//using async & await combination for  Asynchronization
const workbook=new ExcelJs.Workbook()
await workbook.xlsx.readFile(filePath)
const workSheet=workbook.getWorksheet('Sheet1')
const output=await readExcel(workSheet,searchText)

const cell=workSheet.getCell(output.row,output.column+change.colChange)
cell.value=replaceText
await workbook.xlsx.writeFile(filePath)

}
async function readExcel(workSheet,searchText) {
    let output={row:-1,column:-1}
    workSheet.eachRow((row,rowNumber)=>{ // outerloop
        row.eachCell((cell,colNumber)=>{   //inner loop
            //console.log(cell.value)
            if(cell.value===searchText)
            {
                console.log("column: "+colNumber)
                console.log("Row: "+rowNumber)
                output.row=rowNumber
                output.column=colNumber
            }
        })
    })
    return output    
}

test('upload download excel Validation',async({page})=>{
    const searchText='Mango'
    const updateValue='400'

    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html")
    const [download] = await Promise.all([
        page.waitForEvent("download"),
        page.locator("#downloadButton").click(),
    ]);
    const downloadPath = 'C:/Users/mushtamn/Downloads/download.xlsx';
    await download.saveAs(downloadPath);
    writeExcelTest(searchText,updateValue,{rowChange:0,colChange:2},'C:/Users/mushtamn/Downloads/download.xlsx') // colChange :2 means we want to update the value in 0 row 2 column and here we have price
    await page.waitForTimeout(1000);  
    await page.locator('#fileinput').setInputFiles(downloadPath)
    const textlocator=page.getByText(searchText);
    console.log(textlocator)
    const desiredRow=await page.getByRole('row').filter({has:textlocator})   
    await expect(desiredRow.locator('#cell-4-undefined')).toContainText(updateValue)
   
})


