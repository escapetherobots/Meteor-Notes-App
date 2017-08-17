//mocha - avoid arrow functions

const add = (a, b) => {
  if (typeof b !== 'number'){
    return a+a;
  }
  return a + b;
}

const square = (a) => {
  return a * a;
}

describe('Add Tests', function(){

  //==========================================================
  it('should add two numbers', function(){
    const res = add(3,4);

    if(res !== 7){
      throw new Error("sum was not equal to expected value");
    }
  });

  //==========================================================
  it('should double a single number', function (){
    const res = add(22);

    if(res !== 44) {
      throw new Error('Number was not doubled');
    }
  });

});

describe('Square Tests', function(){

  //==========================================================
  it('should square a number', function () {
    const res = square(4);

    if(res !== 16){
      throw new Error('num was not squared');
    }
  });
});
