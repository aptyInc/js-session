onmessage = function(num) {
  console.log('Message received from main script');
  const answer= 'Result: '+(num.data[0] + num.data[1]);
    postMessage(answer);
  
}