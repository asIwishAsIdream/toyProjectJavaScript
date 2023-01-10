Code From - https://youtu.be/_CsGSE5gwTA

What I did is making measure typing speed.


    endTime = Date.now();
      const elapsedTime = endTime - startTime;
      const typingSpeed = Math.floor(wordDisplay.innerText.length / (elapsedTime / 100000));  // speed in characters per second
      speedDisplay.innerText = typingSpeed;