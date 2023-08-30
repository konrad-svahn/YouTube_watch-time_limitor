const sites = {
  kielikoulu: 'https://kielikoulu.yle.fi/#/history',
  github: 'https://github.com/konrad-svahn/',  
};

setTimeout(checkTime, 1000);

function checkTime() {
  let stamp = localStorage.getItem("timeStamp");
  let now = Date.now();
  let diff = now - stamp;

  if (!document.hidden) {
    if (stamp) {
      if (diff > 60000) {
        localStorage.setItem("timeStamp", now);
        location.replace(sites.kielikoulu);
      }
    } else {
      localStorage.setItem("timeStamp", now);
    }
  } else {
    
  }
  console.log(diff)
  setTimeout(checkTime, 1000);
}