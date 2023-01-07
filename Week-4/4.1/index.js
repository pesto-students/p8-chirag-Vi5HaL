// Implement a function named getNumber which generatesa random number. 
// If randomNumber is divisible by 5 it will reject the promise 
// else it will resolve the promise. 
// Let’s also keep the promise resolution/rejection time as a variable.
// 1.JS promises should not be used.
// 2.A custom promise function should be created.
// 3.This function should be able to handle all 3 states Resolve, Reject and Fulfilled.
// 4.Should be able to accept callbacks as props.

function getNumber(){
    const randomNum = Math.floor((Math.random() * 100))
    if(randomNum/5 === 0){
       return console.log("divisble by 5")
    }else{
        throw new Error()
    }
}

function promiseFun(fn){
    try{
        fn()
        return function resolve(){
            return "success"
        }
    }catch{
        return function reject(){
            return "failure"
        }
    }
}
console.log(promiseFun(getNumber))




// custom promise class 
// source : https://medium.com/swlh/implement-a-simple-promise-in-javascript-20c9705f197a
class MyPromise {
    constructor(handler) {
        this.status = "pending";
        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];

        const resolve = value => {
            if (this.status === "pending") {
                this.status = "fulfilled";
                this.value = value;
                this.onFulfilledCallbacks.forEach(fn => fn(value));
            }
        };

        const reject = value => {
            if (this.status === "pending") {
                this.status = "rejected";
                this.value = value;
                this.onRejectedCallbacks.forEach(fn => fn(value));
            }
        };

        try {
            handler(resolve, reject);
        } catch (err) {
            reject(err);
        }
    }

    then(onFulfilled, onRejected) {
        return new Promise((resolve, reject) => {
            if (this.status === "pending") {
                this.onFulfilledCallbacks.push(() => {
                    try {
                        const fulfilledFromLastPromise = onFulfilled(this.value);
                        if (fulfilledFromLastPromise instanceof Promise) {
                            fulfilledFromLastPromise.then(resolve, reject);
                        } else {
                            resolve(fulfilledFromLastPromise);
                        }
                    } catch (err) {
                        reject(err);
                    }
                });
                this.onRejectedCallbacks.push(() => {
                    try {
                        const rejectedFromLastPromise = onRejected(this.value);
                        if (rejectedFromLastPromise instanceof Promise) {
                            rejectedFromLastPromise.then(resolve, reject);
                        } else {
                            reject(rejectedFromLastPromise);
                        }
                    } catch (err) {
                        reject(err);
                    }
                });
            }

            if (this.status === "fulfilled") {
                try {
                    const fulfilledFromLastPromise = onFulfilled(this.value);
                    if (fulfilledFromLastPromise instanceof Promise) {
                        fulfilledFromLastPromise.then(resolve, reject);
                    } else {
                        resolve(fulfilledFromLastPromise);
                    }
                } catch (err) {
                    reject(err);
                }

            }

            if (this.status === "rejected") {
                try {
                    const rejectedFromLastPromise = onRejected(this.value);
                    if (rejectedFromLastPromise instanceof Promise) {
                        rejectedFromLastPromise.then(resolve, reject);
                    } else {
                        reject(rejectedFromLastPromise);
                    }
                } catch (err) {
                    reject(err);
                }
            }
        });

    }
}

// testing code
let p1 = new MyPromise((resolve, reject) => {
    setTimeout(() => resolve('resolved first one'), 1000);
});
p1.then((res) => {
    console.log(res);
    return new MyPromise(resolve => {
        setTimeout(() => resolve('resolved second one'), 1000);
    });
}).then(res => {
    console.log(res);
});

// 1 sec later, 'resolved first one'
// 1 sec later, 'resolved second one'
