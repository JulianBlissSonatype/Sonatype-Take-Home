//9,007,199,254,740,991
let maxinput = Number.MAX_SAFE_INTEGER;

var digitWords = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
var teenWords = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen']
var tensPlaceWords =  ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']
var numberExtensions = ['', 'thousand', 'million', 'billion', 'trillion', 'quadrillion']
//var numberExtensionsBritish = ['', 'thousand', 'million', 'milliard' ,'billion', 'billiard'];

function find_word_equivalent(inputnum) {

		//error checking
    if(parseInt(inputnum) != inputnum)
    	return "Error: Input value is not an integer";
    inputnum = parseInt(inputnum)
      
    if(Math.abs(inputnum) > maxinput)
    	return "Error: Input value too large; please input a number between " + maxinput.toString() + " and " + "-" + maxinput.toString()
    
    //If the number is zero return zero
    if(inputnum == 0)
    	return "Zero"
    
    //If the number is negative, convert it to positive for now, but make a note so we can return the answer with the prefix "Negative"
    negativePrefix = inputnum < 0 ? "Negative " : ""
    inputnum = Math.abs(inputnum) 
    
    //toLocaleString called with no locales/options will add commas to a number to seperate each thousands place
    splitnum = inputnum.toLocaleString().split(",")
    
    returnNumber = ""
    //for each three digit block in the input, from least to greatest, convert the block to human readable, and add it and its number extension to the return string
    for (var i = splitnum.length-1; i >= 0; i--) {
    		currentTrio = three_digit_pair_word_equivalent(splitnum[i])
        //Only add this trio to the number if it is not zero
        if(currentTrio.replace(" ", "").replace(" ", "") != "") {
    			returnNumber = " " + currentTrio + numberExtensions[splitnum.length-i-1] + returnNumber;
          }
    }
  
    //remove all double spaces and trailing/leading spaces
    returnNumber = returnNumber.replace("  ", " ");
    returnNumber = returnNumber.replace("  ", " ");
    if(returnNumber.charAt(returnNumber.length-1) == " ")
    	returnNumber = returnNumber.substring(0, returnNumber.length-1);
    if(returnNumber.charAt(0) == " ")
    	returnNumber = returnNumber.substring(1, returnNumber.length);
      
    //If the number is negative prefix the word 'negative'
    returnNumber = negativePrefix + returnNumber;
      
    //Capitalize the first letter
    returnNumber = returnNumber.charAt(0).toUpperCase() + returnNumber.slice(1)
      
    //If your number is 3 digits or more, and the final trio isn't a multiple of 100, then you will need to add an "and" before the last number
    if(Math.abs(inputnum) > 100 && inputnum % 100) {
      copyOfinputnumSplit = inputnum.toString().split('')
      penultimateDigit = copyOfinputnumSplit[copyOfinputnumSplit.length - 2]
      lastDigit = copyOfinputnumSplit[copyOfinputnumSplit.length - 1]
      
      //Testing the tens place and ones place lets us know how many words come after the "and"
      wordsAfterAnd = 2
      if(penultimateDigit < 2 || (penultimateDigit > 2 && lastDigit == 0)){
      	wordsAfterAnd = 1
      }
      returnNumber = returnNumber.split(" ")
      returnNumber.splice(returnNumber.length - wordsAfterAnd, 0, "and")
			returnNumber = returnNumber.join(" ")
    }
    //console.log(returnNumber);
    return returnNumber;
}

function three_digit_pair_word_equivalent(trio) {
  returnTrio = ""
  
  //Add the hundreds' place if there isn't one and it's not zero
  if(trio.length == 3 && trio[0] != "0") {
		returnTrio = digitWords[trio[0]] + " hundred "
  }
 
  //Add the tens if your number has a teen or tens place in it
  if(trio.length > 1) {
  	if(trio[trio.length-2] == "1") {
  		returnTrio += teenWords[parseInt(trio[trio.length-1])] + " "
    }
    returnTrio += tensPlaceWords[parseInt(trio[trio.length-2])] + " "
  }
  //Now do the digits as long as you are not a number with a teen in it or ending with a zero
  if(trio[trio.length-2] != "1" && trio[trio.length-1] != "0") {
		returnTrio += digitWords[parseInt(trio[trio.length-1])] + " "
  }
  return returnTrio
	
}

function convertIntegerToText() {
  var convertedInteger = document.getElementById("integerInput").value;
  document.getElementById("convertedIntegerOutput").innerHTML = find_word_equivalent(convertedInteger);
  }
