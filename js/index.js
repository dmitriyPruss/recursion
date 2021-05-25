'use strict'

// 1. Реализовать возведение в целую степень. (pow(base, exponent) => base**exponent, 
// где base любое число, exponent - натуральное (1, 2, 3) или * целое число(-2, -1, 0, 1, 2)).
console.groupCollapsed('Task 1');
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
console.groupEnd();


// 2. Реализовать вывод в консоль скобок (
// bracketWrapper3(3); // => сразу в консоль)
console.groupCollapsed('Task 2');
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
console.groupEnd();


// 3. ** Реализовать функцию аналог flat для массивов. 
// (https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)

console.group('** Task 3 - method flat');
    function MyArray() {
        if (!new.target) {
            return new MyArray();
        }
        this.length = 0;
    }
    
    const myArrayProto = new MyArray();
    
    myArrayProto.pop = function () {
        if (this.length === 0) {
            return;
        }
        const lastItem = this[this.length - 1];
        delete this[--this.length];
        return lastItem;
    };
    
    myArrayProto.push = function (item) {
        this[this.length] = item;
        return ++this.length;
    };
    
    myArrayProto.shift = function () {
        if (this.length === 0) {
            return;
        }
        const fistItem = this[0];
        for (let i = 0; i < this.length - 1; i++) {
            this[i] = this[i + 1];
        }
        delete this[--this.length];
        return fistItem;
    };
    
    myArrayProto.filter = function (callback) {
        const returningArray = new MyArray();
        for (let i = 0; i < this.length; i++) {
            if (callback(this[i], i, this)) {
                returningArray.push(this[i]);
            }
        }
        return returningArray;
    };
  
    // flat method
    myArrayProto.flat = function(n) {

        const superObj = new MyArray();
        const m = n;

        if (n === 0) {
            return this;
        };

        const runFlat = flatten.bind(this, n);
        runFlat(); 
        
        function flatten(n) {
            for(let i = 0; i < this.length; i++) {
                if ( Array.isArray(this[i]) ) {
                    if (n === undefined) {
                        const arr = this[i].join(',').split(',');
    
                        for (let j = 0; j < arr.length; j++) {
                            superObj.push(arr[j]);
                        }; 
                    } else {
                        this[i].forEach(item => {
                            if ( !Array.isArray(item) ) {
                                superObj.push(item);
                            } else if (n === 1) { 
                                superObj.push(item);
                            } else {
                                flatten.call(this[i], n - 1);
                            }
                        });
                    };
                } else if (this[i] === ' ') {
                    continue;
                } else {
                    if (n === m) {
                        superObj.push(this[i]);
                    };
                };      
            };
        };
        return superObj;
    };

    MyArray.prototype = myArrayProto;
  
    const myArr1 = new MyArray();

    for(let i = 0; i <= 6; i++) {
        if (i === 2) {
            myArr1.push(' ');
        };
        if(i === 3) {
            myArr1.push(['lll', ['dddd', ['Ivan', 'Hert'], 'ffd'], 'GGGG']);
        };
        if(i === 4) {
            myArr1.push(['af', 'ft']);
        };
        if (i === 5) {
            myArr1.push(['w', 's', 'uyu']);
        };

        myArr1.push(i);
    };
    console.log(`myArr1 >>`, myArr1);
    
    const newArr1 = myArr1.flat();
    console.log('newArr1 :>> ', newArr1);

    const newArr2 = myArr1.flat(2);
    console.log('newArr2 :>> ', newArr2);

    const newArr3 = myArr1.flat(3);
    console.log('newArr3 :>> ', newArr3);

    const newArr4 = myArr1.flat(0);
    console.log('newArr4 :>> ', newArr4);
console.groupEnd();