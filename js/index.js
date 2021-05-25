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

console.group('Task 12 - method flat');
    function MyArray() {
        if (!new.target) {
          return new MyArray();
        };
        this.length = 0;
    };
      
    const myArrayProto = new MyArray();


    

    myArrayProto.pop = function() {
        if(this.length === 0) {
            return;
        };
        const lastItem = this[this.length-1]
        delete this[--this.length];
        return lastItem;
    };
    myArrayProto.push = function(item) {
        this[this.length] = item;
        return ++this.length;
    };
    myArrayProto.shift = function() {
        if ( this.length === 0 ) {
          return;
        }
        const fistItem = this[0];
        for(let i = 0; i < this.length - 1; i++) {
          this[i] = this[i+1];
        }
        delete this[--this.length];
        return fistItem;
    };
    myArrayProto.unshift = function(item) {
        for(let i = this.length; i >= 0; i--) {
            this[i] = this[i - 1];
        };
        this[0] = item;
        return ++this.length;
    };



    MyArray.prototype = myArrayProto;
    const superObj = new MyArray();
    const arrObj = new MyArray();
    let m = 2;
    
    myArrayProto.flat = function(n) {
    
        let returningObj = new MyArray();

        for(let i = 0; i < this.length; i++) {
            if (n === 0) {
                return this;
            };

            if ( Array.isArray(this[i]) ) {
                if (!n) {
                    const arr = this[i].join(',').split(',');

                    for (let j = 0; j < arr.length; j++) {
                        returningObj.push(arr[j]);
                    };
                };

                console.log('n :>> ', n);
                console.log(`this[${i}] :>> `, this[i]);
                const arr = this[i];

                this[i].forEach(item => {
                   
                    if (!Array.isArray(item) ) {
                        superObj.push(item + ' - rec n = ' + n);
                    } else if (n === 1) { 
                        superObj.push(item + ' - rec n = ' + n);
                    } else {
                        returningObj.flat.call(this[i], n - 1);
                    }
                });
            } else if (this[i] === ' ') {
                delete this[i];
            } else {
                returningObj.push(this[i]);
                if (n === m) {
                    superObj.push(this[i] + '- elem');
                }
            };
            
        };
        
        return returningObj;
    };

      
    const myArr1 = new MyArray();

    for(let i = 0; i <= 6; i++) {
        if (i === 2) {
            myArr1.push(' ');
        };
        if(i === 3) {
            myArr1.push(['lll', ['dddd', ['Ivan', 'Hert'], 'ffd'], 'GGGG']);
        };
        if (i === 5) {
            myArr1.push(['w', 's', 'uyu']);
        };
        if(i === 4) {
            myArr1.push(['af', 'ft']);
        };

        myArr1.push(i);
    };
    console.log(myArr1);

    
    // const newArr1 = myArr1.flat(2);
    // console.log('newArr1 :>> ', newArr1);

    const newArr2 = myArr1.flat(2);
    console.log('newArr2 :>> ', newArr2);

    console.log('superObj :>> ', superObj);

console.groupEnd();