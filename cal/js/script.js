let $input = $('[data-js="input"]')
const $buttonsNumber = $('[data-js="button-number"]')
const $buttonsOperations = $('[data-js="button-operation"]')
const $buttonCe = $('[data-js="button-ce"]')
const $buttonEqual = $('[data-js="button-equal"]')
const $buttonRemoveLastChar = $('[data-js="button-remove-last-character"]')
let firstValue, operator, lastValue, lastOperator

$buttonsNumber.on('click', handleClickNumber)
$buttonsOperations.on('click', handleClickOperation)
$buttonCe.on('click', handleClickCe)
$buttonEqual.on('click', handleClickEqual)
$buttonRemoveLastChar.on('click', handleClickRemove)

function handleClickRemove () {
  if (!isZeroTheOnlyValueOnInput())
    $input.get().value = removeLastCharacter($input.get().value)
}

function isZeroTheOnlyValueOnInput () {
  return $input.get().value === '0'
}

function removeLastCharacter (string) {
  return string.slice(0, -1)
}

function getOperators () {
  return $buttonsOperations.map(item => item.value)
}

function handleClickEqual () {
  $input.get().value = removeLastItemIfItIsAnOperator($input.get().value)
  const allValues = $input.get().value.match(getRegexOperators())
  $input.get().value = allValues.reduce(calculateAllValues)
}

function getRegexOperators () {
  return new RegExp(`\\d+[${getOperators().join('')}]?`, 'g')
}

function calculateAllValues (acc, curr) {
  firstValue = Number(removeLastItemIfItIsAnOperator(acc))
  operator = getLastChar(acc)
  lastValue = Number(removeLastItemIfItIsAnOperator(curr))
  lastOperator = getLastOperator(curr)

  return makeOperation(operator) + lastOperator
}

function getLastChar (string) {
  return string.slice(-1)
}

function getLastOperator (string) {
  return isLastCharacterAnOperator(string) ? getLastChar(string) : ''
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

function removeLastItemIfItIsAnOperator (string) {
  return isLastCharacterAnOperator(string) ? string.slice(0, -1) : string
}

function handleClickOperation () {
  if (isZeroTheOnlyValueOnInput())
    return addInitialValueToInput()

  $input.get().value = removeLastItemIfItIsAnOperator($input.get().value)
  addValueToInput(this)
}

function handleClickNumber () {
  addValueToInput(this)
}

function handleClickCe () {
  addInitialValueToInput()
}

function addInitialValueToInput () {
  $input.get().value = '0'
}

function isLastCharacterAnOperator (string) {
  return getOperators().some(operator => getLastChar(string) === operator)
}

function addValueToInput (element) {
  if (isZeroTheOnlyValueOnInput())
    clearInput()
  $input.get().value += element.value
}

function clearInput () {
  $input.get().value = ''
}