//select elements 
let day = document.getElementById("dayInput"),
      month = document.getElementById("monthInput"),
      year = document.getElementById("yearInput"),
      form = document.querySelector("form"),
      yearsOutput = document.getElementById("years"),
      monthsOutput = document.getElementById("months"),
      daysOutput = document.getElementById("days");
  
//set current date
const TODAY =  new Date();

//set error msgs
const errorMessages = {
  invalid: (str) => `Must be a valid ${str}`,
  past: "Must be in the past",
  required: "This field is required"
}
const validateForm = (e) => {
  e.preventDefault();
  const [dd, mm, yyyy] = [day.value, month.value, year.value]
  
  //set max date
  const birthMaxDate = new Date(yyyy, mm, 0).getDate()
  day.setAttribute("max", birthMaxDate)

  //set max year
  year.setAttribute("max", TODAY.getFullYear())
  // isFututre
  // const isFuture = new Date(yyyy,mm,dd).getTime() > TODAY.getTime()
  //set year validation
     year.validity.rangeOverflow ? year.setCustomValidity(errorMessages.past)
       : year.validity.rangeUnderflow ? year.setCustomValidity(errorMessages.invalid('year'))
       : year.validity.valueMissing ? year.setCustomValidity(errorMessages.required)
       : year.setCustomValidity("")

     year.nextElementSibling.textContent = year.validationMessage
     !year.checkValidity()
       ? year.previousElementSibling.classList.add("red")
       : year.previousElementSibling.classList.remove("red")

 
  //set month validation
    month.validity.rangeOverflow || month.validity.rangeUnderflow
      ? month.setCustomValidity(errorMessages.invalid('month'))
      : (yyyy == TODAY.getFullYear() && mm-1 > TODAY.getMonth()) ||
        (yyyy == TODAY.getFullYear() &&
          mm-1 == TODAY.getMonth() &&
          dd > TODAY.getDate())
      ? month.setCustomValidity(errorMessages.past)
      : month.validity.valueMissing
      ? month.setCustomValidity(errorMessages.required)
      : month.setCustomValidity("")

      month.nextElementSibling.textContent = month.validationMessage
      !month.checkValidity()
      ? month.previousElementSibling.classList.add("red")
      : month.previousElementSibling.classList.remove("red")

    //set date validation
    day.validity.rangeUnderflow ? day.setCustomValidity(errorMessages.invalid("day"))
    : year.checkValidity() && month.checkValidity() && day.validity.rangeOverflow ? day.setCustomValidity(errorMessages.invalid("date"))
    : day.validity.valueMissing ? day.setCustomValidity(errorMessages.required)
    : day.setCustomValidity("")

    day.nextElementSibling.textContent = day.validationMessage
    !day.checkValidity() ? day.previousElementSibling.classList.add("red")
    : day.previousElementSibling.classList.remove("red")

    //check validity of all inputs to start calculation
    year.checkValidity() && month.checkValidity() && day.checkValidity() ? calculate(yyyy, mm - 1, dd)
    : yearsOutput.textContent =
      monthsOutput.textContent =
      daysOutput.textContent = 
      '- -'

    //start calculation
    function calculate (year, month, day){
      let yearsResult = TODAY.getFullYear() - year
      let monthsResult = TODAY.getMonth() -  month 
      let daysResult = TODAY.getDate() - day

      if(monthsResult < 0 || monthsResult == 0 && daysResult < 0){
        monthsResult+=12;
        yearsResult --;
      }
      if(daysResult < 0){
        monthsResult--;
        // Days in Last Month
        let daysLeft = new Date(TODAY.getFullYear(), TODAY.getMonth(), 0).getDate()
        daysResult += daysLeft
      }
console.log(yearsResult + ' ' + monthsResult + ' ' + daysResult);
yearsOutput.textContent = yearsResult
  monthsOutput.textContent = monthsResult
  daysOutput.textContent = daysResult
}
}
form.addEventListener("submit", validateForm)



