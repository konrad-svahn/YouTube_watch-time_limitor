const sites = {
  kielikoulu: 'https://kielikoulu.yle.fi/#/history',
  github: 'https://github.com/konrad-svahn/',  
};

let mod = 0;
setTimeout(checkTime, 1000);

function checkTime() {
  let stamp = localStorage.getItem("timeStamp");
  let pause = localStorage.getItem("pauseStamp");
  let now = Date.now();
  let diff = now - stamp;

  if (!document.hidden) {

    if (pause) {
      console.log("tabed in")
      localStorage.removeItem("pauseStamp");
      mod = (now - pause) + mod
    }

    if (stamp) {
      if (diff - mod > 60000 && !pause) {
        mod = 0
        localStorage.setItem("timeStamp", now);
        console.log("reset");
        //location.replace(sites.kielikoulu); //<----------------------------- alter site
      }
    } else {
      localStorage.setItem("timeStamp", now);
    }

  } else {
    if (!pause) {
      console.log("tabed out")
      localStorage.setItem("pauseStamp", now);
    }
  }
  console.log("mod is: " + mod)
  console.log(diff - mod)
  setTimeout(checkTime, 1000);
}