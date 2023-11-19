function TestBasicFuntionLibrary(){
    console.log("Basic Function lib exists!")
}

function shallowEqual(object1, object2) {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
  
    if (keys1.length !== keys2.length) {
      return false;
    }
  
    for (let key of keys1) {
      if (object1[key] !== object2[key]) {
        return false;
      }
    }
  
    return true;
  }

function deepEqual(object1, object2) {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    for (const key of keys1) {
        const val1 = object1[key];
        const val2 = object2[key];
        const areObjects = isObject(val1) && isObject(val2);
        if (areObjects && !deepEqual(val1, val2) ||!areObjects && val1 !== val2) {
          return false;
        }
    }

    return true;
}

function isObject(object) {
    return object != null && typeof object === 'object';
}

function isDuplicated(arr,element){
  if(arr.includes(element)){
    return true
  }else{
    return false
  }
}

function shallowCopy(originalObj){
  return JSON.parse(JSON.stringify(originalObj))
}

function findCombinations(arrays) { 
  function backtrack(currCombination, remainingArrays) {
      if (remainingArrays.length === 0) {
      combinations.push(currCombination.join(' '));//join('_')
      return;
      }
  
      const currentArray = remainingArrays[0];
      for (let i = 0; i < currentArray.length; i++) {
      const element = currentArray[i];
      backtrack(currCombination.concat(element), remainingArrays.slice(1));
      }
  }
  
  const combinations = [];
  backtrack([], arrays);
  // const data = {}
  // combinations.forEach(C=>{
  //     data[C]={
  //         quantity:0,
  //         price:0,
  //     }
  // })
  // update("data",data)
  return combinations;
}

function IntToFixDisgitString(integer,digit){
  console.log("fn to fix",integer.toLocaleString('en-US', {minimumIntegerDigits: digit, useGrouping:false}))
  return integer.toLocaleString('en-US', {minimumIntegerDigits: digit, useGrouping:false})
}

function IntToProdIndex(integer){
  console.log("fn to fix",integer.toLocaleString('en-US', {minimumIntegerDigits: 3, useGrouping:false}))
  return integer.toLocaleString('en-US', {minimumIntegerDigits: 3, useGrouping:false})
}

function findNextIndexString(ArrOfString){
  const digit = ArrOfString[0].length
  const nIndex = Math.max(...ArrOfString.map(str=> parseInt(str)))+1
  if (nIndex < 10^digit){
    return nIndex.toLocaleString('en-US', {minimumIntegerDigits: digit, useGrouping:false})
  }else{
    throw console.error("overflow");
  }
  
}

function findNextIndex(ArrOfString){
  const digit = ArrOfString[0].length
  const nIndex = Math.max(...ArrOfString.map(str=> parseInt(str)))+1
  if (nIndex < 10^digit){
    return nIndex
  }else{
    throw console.error("overflow");
  }
  
}

function findNextSKUIndex(ArrOfString){
  console.log("function findNextSKUIndex",ArrOfString)
  const digit = ArrOfString[0].length
  const nIndex = Math.max(...ArrOfString.map(str=> parseInt(str.split("-").pop())))+1
  if (nIndex < 10^digit){
    return nIndex
  }else{
    throw console.error("overflow");
  }
  
}

function IndexStringIncreament(IndexString){
    const digit = IndexString.length
    const nIndex = parseInt(IndexString)+1
    if (nIndex < 10^digit){
        return nIndex.toLocaleString('en-US', {minimumIntegerDigits: digit, useGrouping:false})
    }else{
        throw console.error("overflow");
    }

}

function sendResponse(res,result){
  console.log("sending response",result)
  if(result.success){
    res.status(200).send(JSON.stringify(result.data))
  }else{
    res.status(500).send(JSON.stringify(result.data))
  }
}

function wrapResponse(success,data){
  return {success:success,data:data}
}

export default TestBasicFuntionLibrary
export {
  shallowEqual,
  deepEqual,
  isObject,
  isDuplicated,
  shallowCopy,
  findCombinations,
  IntToFixDisgitString,
  findNextIndexString,
  findNextIndex,
  IndexStringIncreament,
  IntToProdIndex,
  findNextSKUIndex,
  sendResponse,
  wrapResponse
}


