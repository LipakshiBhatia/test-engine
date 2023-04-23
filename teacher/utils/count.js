function initCount(){
    var count = 0;
    function countDown(){
        count++;
        return count;
    } 
    return countDown;
}