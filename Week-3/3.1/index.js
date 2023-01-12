// Create a memoize function that remembers previous inputs and stores them in cache so that it won’t have 
// to compute the same inputs more than once. The function will take an unspecified number and 
// of integer inputs a reducer method.

function memoize (fn){
    const cache = new Map();
    return function (...args){
        const key = args.toString();
        if(cache.has(key)){
            return cache.get(key)
        }
        cache.set(key,fn(...args))
        return cache.get(key)
    }
}

const add = function (...args){
    return args.reduce((prev,curr) => {
        return prev + curr
    })
}

const addM = memoize(add);

function time(fn){
    console.time()
    fn();
    console.timeEnd()
}

time(() => addM(1,2,3,4,5,3,6,9))
time(() => addM(1,2,3,4,5,3,6,9))