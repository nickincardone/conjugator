function findDifference(targetString, inputString) {
  // This function will highlight the difference between a user's input and
  // a target string. Will return array of differences and similarities
  if (inputString.toLowerCase() === targetString.toLowerCase())
    return [[[0, targetString]],[[0, inputString]]];

  let inputArray = [];
  let targetArray = [];

  let targetCounter = 0;
  let currentlyRight = true;
  for (let i = 0; i < inputString.length; i++) {
    if (targetCounter === targetString.length) continue;
    if (inputString[i].toLowerCase() === targetString[targetCounter].toLowerCase()) {
      if (currentlyRight && i !== 0) {
        inputArray[inputArray.length-1][1] +=  inputString[i];
        targetArray[targetArray.length-1][1] +=  targetString[targetCounter];
      } else {
        inputArray.push([0, inputString[i]]);
        if (i!==0 && targetArray[targetArray.length-1][0] === 0) {
          targetArray[targetArray.length-1][1] +=  targetString[targetCounter];
        } else {
          targetArray.push([0, targetString[targetCounter]]);
        }
        currentlyRight = true;
      }
      targetCounter++;
    } else {
      if (!currentlyRight && (!targetArray.length>0 || targetArray[targetArray.length-1][0] !== 1)) {
        inputArray[inputArray.length-1][1] +=  inputString[i];
      } else {
        if (inputString.substring(i, i+3).toLowerCase().indexOf(targetString[targetCounter].toLowerCase()) === -1) {
          if (targetArray.length>0 && targetArray[targetArray.length-1][0] === 1) {
            targetArray[targetArray.length-1][1] +=  targetString[targetCounter];
          } else {
            targetArray.push([1, targetString[targetCounter]]);
          }
          targetCounter++;
          i--;
        } else {
          if (inputArray.length > 0 && inputArray[inputArray.length-1][0] === -1) {
            inputArray[inputArray.length-1][1] +=  inputString[i];
          } else {
            inputArray.push([-1, inputString[i]]);
          }
        }
        currentlyRight = false;
      }
    }
  }

  while (targetCounter < targetString.length) {
    if (targetArray.length !== 0 && targetArray[targetArray.length-1][0] === 1) {
      targetArray[targetArray.length-1][1] +=  targetString[targetCounter];
    } else {
      targetArray.push([1, targetString[targetCounter]]);
    }
    targetCounter++;
  }

  return [targetArray, inputArray]
}

function findDifferenceRec(targetString, inputString, number=-1, answerArray=[]) {
  if (inputString === '' || inputString === null) return answerArray;
  if (targetString.toLowerCase().indexOf(inputString.toLowerCase()) !== -1) {
    console.log('found substring up top: ' + inputString);
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
    console.log('checking in ' +targetString.toLowerCase()+ ' for substring: ' + substring);
    if (targetString.toLowerCase().indexOf(substring) !== -1) {
      console.log('found substring: ' + substring);
      answerArray.push(inputString.substring(i, i+number));
      foundSubstring = true;
      break;
    }
  }

  if (foundSubstring) {
    const splitTarget = targetString.split(answerArray[answerArray.length-1]);
    const splitInput = inputString.split(answerArray[answerArray.length-1]);
    findDifferenceRec(splitTarget[0], splitInput[0], -1, answerArray);
    findDifferenceRec(splitTarget[1], splitInput[1], -1, answerArray);
    return answerArray;
  }
  number--;
  return findDifferenceRec(targetString, inputString, number, answerArray);
}

//console.log(findDifferenceRec('xyz', 'xayz'));  // [ [ [ 0, 'xyz' ] ], [ [ 0, 'x' ], [ -1, 'a' ], [ 0, 'yz' ] ] ]
//console.log(findDifferenceRec('abcdefghijklmnop', 'nopabcdexklmxxp')); // [[ [ 0, 'xyz' ], [ 1, 'w' ] ],[ [ 0, 'x' ], [ -1, 'a' ], [ 0, 'yz' ] ]]
//console.log(findDifferenceRec('axyz', 'xyz')); //[ [ [ 1, 'a' ], [ 0, 'xyz' ] ], [ [ 0, 'xyz' ] ] ]
//console.log(findDifferenceRec('abxyz', 'xyz'))
//console.log(findDifference('abxyz', 'dexyde'));
//console.log(findDifferenceRec('nop', 'xxp'))




// abcdef
// zxcdni
// [1, ab], [0, cdef], [1, ef]
// [-1,zx], [0, cdef], [-1, ni]