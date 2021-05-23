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

console.groupCollapsed('Task 12 - method flat');
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
    myArrayProto.flat = function(item) {
        let returningObj = {};
        
        for(let i = 0; i <= this.length; i++) {
            
            if (Array.isArray(this[i])) {

                
                const self = this[i];
                // console.log('i + 1 :>> ', i + 1);
                // console.log('this[i + 1] :>> ', this[i + 1]);
                
                // for (let j = 0; j < i; j++) {
                //     startObj[j] = this[j];
                // };
                // console.log('startObj :>> ', startObj);
                
                let z = i + 1;
                for (let j = z; j < this.length; j++) {
                    console.log('this.length :>> ', this.length);
                    console.log(`this[${j}] :>> `, this[j]);
                    console.log('j + self.length - 1 :>> ', j + self.length - 1);
                    console.log("------------------------------------");
                    this[j + self.length - 1] = this[j]; 
                };
                
                // endObj.length = Object.keys(endObj).length;
                // console.log('endObj :>> ', endObj);
                let counter = 0;
                delete this[i];
                for(let j = i; j < self.length + i; j++) {
                    // console.log('j :>> ', j);
                    // console.log('self[counter] :>> ', self[counter]);
                    // console.log('self :>> ', self);

                    this[j] = self[counter];
                    counter++;
                };
                
            };
        };

        // returningObj = Object.assign(startObj, middleObj, endObj);
        // console.log('Object.keys(returningObj) :>> ', Object.keys(returningObj));
        
        // returningObj.length = Object.keys(returningObj).length;
    
        // returningObj.__proto__ = myArrayProto;
        return this;
    };
      


    MyArray.prototype = myArrayProto;
      
    const myArr1 = new MyArray();

    for(let i = 0; i <= 5; i++) {
        if (i === 3) {
            myArr1.push(['w', 's', 'uyu']);
        };
        if(i === 4) {
            myArr1.push(['af', 'ft']);
        };
        myArr1.push(i);
    };
    console.log(myArr1);

    const newArr = myArr1.flat();
    console.log('newArr :>> ', newArr);

console.groupEnd();