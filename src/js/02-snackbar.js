function createPromise(value, delay, isValid) {
    const promise = new Promise((resolve, reject) => {
      const data = { value, delay };
      setTimeout(() => {
        if (isValid) {
          resolve(data);
        } else {
          reject(data);
        }
      }, delay);
    });
  
    return promise;
  }
  
for (let i = 0; i < 5; i++) {
    const delay = i * 1000;
    const isActive = Math.random() > 0.5; // true | false
    const promise = createPromise(i, delay, isActive);
    promise.then(onFullFiled, onRejected);
  }