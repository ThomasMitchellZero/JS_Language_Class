//// 8.121 Asynchronous Example /////

const first = ()=> {
    console.log('Hey there!');
    // This function is called, but it delays 2000 ms.
    second();
    // this is called after  second() but because of the delay, this function will complete before second() does.  
    console.log("The end!");
};

const second = () =>{
    setTimeout(()=> {
        console.log('async!');
    
    // first parameter is the callback function, second parameter (2000) is how many milliseconds to wait.
    },2000);
}

first();
