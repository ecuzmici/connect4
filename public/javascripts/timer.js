let start = Date.now();

let timer = setInterval( function(){
    let elapsed = Date.now() - start;
    let temp = new Date(elapsed).toISOString().substring(14, 19);
    document.getElementsByClassName("timer")[0].innerHTML = temp;
}, 1000);