import { diffChars } from  'diff'

function splitFirst(str, separator) {
  let [first, ...rest] = str.split(separator);
  rest = rest.join(separator);
  return [first, rest];
}

function findStringDifferences(targetString, inputString, number=-1, answerArray=[]) {
  if (inputString === '' || inputString === null) {
    answerArray.push(''); //maybe no
    return answerArray;
  }
  if (targetString.toLowerCase().indexOf(inputString.toLowerCase()) !== -1) {
    answerArray.push(inputString);
    return answerArray;
  }
  if (number === 0 || targetString === '') {
    answerArray.push('');
    return answerArray;
  }
  if (number === -1) number = inputString.length > targetString.length ? targetString.length : inputString.length;
  let foundSubstring = false;
  for (let i = 0; i + number < inputString.length + 1; i++) {
    const substring = inputString.substring(i, i+number).toLowerCase();
    if (targetString.toLowerCase().indexOf(substring) !== -1) {
      answerArray.push(inputString.substring(i, i+number));
      foundSubstring = true;
      break;
    }
  }

  if (foundSubstring) {
    const splitTarget = splitFirst(targetString,answerArray[answerArray.length-1]);
    const splitInput = splitFirst(inputString, answerArray[answerArray.length-1]);
    findStringDifferences(splitTarget[0], splitInput[0], -1, answerArray);
    findStringDifferences(splitTarget[1], splitInput[1], -1, answerArray);
    return answerArray;
  }
  number--;
  return findStringDifferences(targetString, inputString, number, answerArray);
}

function getStringDifferenceArray(str, stringDifference, noMatchNumber, answerArray=[]) {
  if (stringDifference.length === 0) return answerArray;
  if (str.length === 0) {
    stringDifference.shift();
    return answerArray;
  }
  if (stringDifference[0] === '') {
    stringDifference.shift();
    answerArray.push([noMatchNumber, str]);
    return answerArray;
  }
  let currentMatch = stringDifference.shift();
  if (stringDifference.length === 0) {
    if (str === currentMatch) {
      answerArray.push([0, str]);
      return answerArray;
    } else {
      const currentSplitArr = splitFirst(str, currentMatch);
      if (currentSplitArr[0] !== '') answerArray.push([noMatchNumber, currentSplitArr[0]]);
      answerArray.push([0, currentMatch]);
      if (currentSplitArr[1] !== '') answerArray.push([noMatchNumber, currentSplitArr[1]]);
      return answerArray;
    }
  }

  if (currentMatch === '') return answerArray;

  const currentSplitArr = splitFirst(str, currentMatch);
  getStringDifferenceArray(currentSplitArr[0], stringDifference, noMatchNumber, answerArray);
  answerArray.push([0, currentMatch]);
  getStringDifferenceArray(currentSplitArr[1], stringDifference, noMatchNumber, answerArray);
  return answerArray;
}



function _getStringDifferenceArrays(targetString, inputString) { //leaving my own implementation for reference
  if (targetString === null || typeof targetString !== 'string') return null;
  if (inputString === null || inputString === '') return [[[1, targetString]], []];
  if (typeof inputString !== 'string') return null;

  const stringDifference = findStringDifferences(targetString, inputString);
  const stringDifferenceCopy = [...stringDifference];
  const targetArray = getStringDifferenceArray(targetString, stringDifference, 1);
  const inputArray = getStringDifferenceArray(inputString, stringDifferenceCopy, -1);

  return [targetArray, inputArray];

}

function getStringDifferenceArrays(targetString, inputString) {
  const diffArray = diffChars(targetString, inputString, {ignoreCase: true});

  const [targetArray, inputArray] = [[],[]];
  diffArray.forEach(diff => {
    if (diff.added) {
      inputArray.push([-1, diff.value]);
    } else if (diff.removed) {
      targetArray.push([1, diff.value]);
    } else {
      targetArray.push([0, diff.value]);
      inputArray.push([0, diff.value]);
    }
  });

  return [targetArray, inputArray];
}

export {getStringDifferenceArrays}