export const dateMonthString=(input:string)=>{
const [year, month] = input.split("-");
const date = new Date(`${year}-${month}-01`);
const result = `${date.toLocaleString("en-US", { month: "long" })}, ${year}`;
return result;
}