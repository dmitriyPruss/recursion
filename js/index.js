// 1. Реализовать возведение в целую степень. (pow(base, exponent) => base**exponent, 
// где base любое число, exponent - натуральное (1, 2, 3) или * целое число(-2, -1, 0, 1, 2)).

const pow = (num, n) => {
    switch (true) {
        case (n === 0):
            return 1;
            break;
        case (n >= 1):
            return num * pow(num, n-1);
            break;
        case (n < 0):
            return 1 / num * pow(num, n + 1);
            break;
        default:
            return 'It is not an integer number';
            break; 
    };
};

console.log('pow(5, 3) :>> ', pow(5, 3));
console.log('pow(5, 0) :>> ', pow(5, 0));
console.log('pow(2, -3) :>> ', pow(2, -3));
console.log('pow(5, "asd") :>> ', pow(5, 'asd'));

// 2. Реализовать вывод в консоль скобок (
// bracketWrapper3(3); // => сразу в консоль)

bracketWrapper3(5);

function bracketWrapper3(n) {
    const brackets = [];
    bracketWrapperRec(n);
    
    function bracketWrapperRec(n) {
        if (n === 0) {          
            return;
        };
        brackets.push('(');
        bracketWrapperRec(n - 1);
        brackets.push(')');
    };
    console.log('brackets.join("") :>> ', brackets.join(''));
    return brackets;
};


// 3. ** Реализовать функцию аналог flat для массивов. 
// (https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)