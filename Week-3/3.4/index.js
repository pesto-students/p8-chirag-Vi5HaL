function createStack() {
  // Write your code here...
  const inner = function (){
    const items = [];
    const push = (item) => {
      items.push(item);
    }
    const pop = () => {
      return items.pop()
    }
    return {push,pop}
  }
  return inner()
}
const stack = createStack();
stack.push(10);
stack.push(5);
console.log(stack.pop()); // => 5
console.log(stack.items);// => undefined
