// let $input = $('[data-js="input"]').val();
const $buttonsNumber = $('[data-js="button-number"]');
// const $buttonsOperations = $('[data-js="button-operation"]').val();
const $buttonCe = $('[data-js="button-ce"]');
const $buttonEqual = $('[data-js="button-equal"]');
const $buttonRemoveLastChar = $('[data-js="button-remove-last-character"]');
let firstValue, operator, lastValue, lastOperator;

$buttonsNumber.on('click', handleClickNumber);
$buttonCe.on('click', handleClickCe);
$buttonEqual.on('click', handleClickEqual);
$buttonRemoveLastChar.on('click', handleClickRemove);
$('[data-js="button-operation"]').click(function(){
    handleClickOperation(this.value);
});



function handleClickRemove () {
  if (!isZeroTheOnlyValueOnInput()){
      let $input = $('[data-js="input"]').val();
          $input = $input.slice(0, -1);
      $('[data-js="input"]').val($input);
  }
}

function handleClickNumber () {
  addValueToInput(this.value);
}


function addValueToInput (element) {
  if (isZeroTheOnlyValueOnInput()){
    clearInput();
  }

  let $input = $('[data-js="input"]').val();

  $input += element;
  $('[data-js="input"]').val($input);
}


function isZeroTheOnlyValueOnInput() {
  let $input = $('[data-js="input"]').val();
  return $input === '0';
}


function clearInput() {
  $('[data-js="input"]').val('');
}

function addInitialValueToInput() {
  $input = '0';
  $('[data-js="input"]').val(0);

}

function handleClickCe() {
  addInitialValueToInput()
}


function handleClickOperation(value){
  let $input = $('[data-js="input"]').val();

  if (!getOperators().some(operator => $input.slice(-1) === operator)) {
    addValueToInput(value);
  }
}

function getOperators(){
  return ['+','-','x','÷'];
}


function handleClickEqual () {

  let $input = $('[data-js="input"]').val();

      if (getOperators().some(operator => $input.slice(-1) === operator)) {
      $input = $input.slice(0, -1);
      $('[data-js="input"]').val($input);
    }

    const allValues = $input.match(getRegexOperators());
    // console.log(allValues);
    $input = allValues.reduce(calculateAllValues);
  
$('[data-js="input"]').val($input);
}


function getRegexOperators () {
  return new RegExp(`\\d+[${getOperators().join('')}]?`, 'g')
}




function calculateAllValues(acc, curr) {


  let $input = $('[data-js="input"]').val();

    if (getOperators().some(operator => acc.slice(-1) === operator)) {
      firstValue = Number(acc.slice(0, -1));
    }else{
      firstValue = Number(acc);
    }


    if (getOperators().some(operator => curr.slice(-1) === operator)) {
      lastValue = Number(curr.slice(0, -1));
    }else{
      lastValue = Number(curr);
    }

  // lastValue = Number(removeLastItemIfItIsAnOperator(curr))

  operator = getLastChar(acc);

  // firstValue = Number(removeLastItemIfItIsAnOperator(acc))
  // console.log(acc);
  // operator = getLastChar(acc)
  // lastValue = Number(removeLastItemIfItIsAnOperator(curr))
  lastOperator = getLastOperator(curr)

  return makeOperation(operator) + lastOperator;
}

function getLastChar (string) {
  return string.slice(-1);
}


function getLastOperator (string) {
  return isLastCharacterAnOperator(string) ? getLastChar(string) : '';
}


function isLastCharacterAnOperator (string) {
  return getOperators().some(operator => getLastChar(string) === operator)
}


function makeOperation (operator) {
  if (operator === '+')
    return (firstValue + lastValue)
  if (operator === '-')
    return (firstValue - lastValue)
  if (operator === 'x')
    return (firstValue * lastValue)
  if (operator === '÷')
    return (firstValue / lastValue)
}