// What is the output of the below problem and why:

function createIncrement() {
  let count = 0;
  function increment() {
    count++;
  }
  let message = `Count is ${count}`;
  function log() {
    console.log(message);
  }
  return [increment, log];
}
const [increment, log] = createIncrement();
increment();
increment();
increment();
log(); // 0 

// Answer : create Increment is each time defining coutn as zero. 
// so on line 18 when log() is trying to log the message it will read the current contaxt and print 0.
