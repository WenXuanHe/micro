export default (src) => {
  return new Promise((resolve, reject) => {
    let script = document.createElement('script');
    script.src = src;
    script.onload = function(){
      resolve();
    }
    script.onerror = function(){
      reject(src + "faild to load")
    }
    document.body.appendChild(script);
  })
}