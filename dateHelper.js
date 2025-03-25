export function getCurrentDate(){
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate());
    return currentDate.toISOString().split("T")[0];
}