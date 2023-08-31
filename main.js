const sites = {
  kielikoulu: 'https://kielikoulu.yle.fi/#/history',
  github: 'https://github.com/konrad-svahn/',  
};

// the amount of milliseconds before you get redireckted
const timeLimit = 10800000

// mod is a modifier that causes the timer to not advance when not in the youtube tab
let mod = 0;
setTimeout(checkTime, 1000);

function checkTime() {
  // marker of when the timer started
  let stamp = localStorage.getItem("timeStamp");

  // marker of when the latest pause to the timer started
  let pause = localStorage.getItem("pauseStamp");
  
  let now = Date.now();
  let diff = now - stamp;

  // this happens if you are in the tab ---> true if the tab is active
  if (!document.hidden) {

    // this runs if you tab in to the youtube tab after having tabed out
    if (pause) {
      localStorage.removeItem("pauseStamp");
      mod = (now - pause) + mod
    }

    if (stamp) {
      // runs if the time spent in the tab exedes the time limit
      if (diff - mod > timeLimit && !pause) {
        mod = 0
        localStorage.removeItem("timeStamp");
        location.replace(sites.kielikoulu); //<---------------------------------------------------------------------------------------------------------------- alter site
      }
    } else {
      localStorage.setItem("timeStamp", now);
    }

  // this runs if you are not in the tab
  } else {
    // on the first frame you are tabed out a timestamp for that time is generated 
    if (!pause) {
      localStorage.setItem("pauseStamp", now);
    }
  }
  // the number shown in the console it shows the nuber of minutes since the last checkpoint
  let display = (diff - mod)/60000
  let displayLimit = timeLimit/60000
  console.log(display.toFixed(1) + " / " + displayLimit)
  setTimeout(checkTime, 60000);
}