var arr = {
    arr1: [{id:1},{id:3},{id:5},{id:7},{id:9}],
    arr2: [{id:2},{id:4},{id:6},{id:8}]
};

var finder = function(type, identifier){
    match = arr[type].findIndex(function(){
        return arr[type].id === identifier;
    })
    arr[type].splice(match, 1)
}

console.log(arr.arr1);

finder('arr1',5);

console.log(arr.arr1);





