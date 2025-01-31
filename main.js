// mod is a modifier that causes the timer to not advance when not in the youtube tab
let mod = 0

function getVar() {
  function onError(error) {
    console.log(`Error: ${error}`);
  }
  browser.storage.sync.get(["target","sessionHours","sessionMinutes","breakHours","breakMinutes"]).then(checkTime, onError);
}

function checkTime(setings) {
  // the site you get trown to when the time is upp
  let target = setings.target;
  
  // the amount of milliseconds before you get redireckted
  let timeLimit = (parseInt(setings.sessionHours) * 60000 * 60) + (parseInt(setings.sessionMinutes) * 60000) || 10800000;
  if (parseInt(setings.sessionHours) == 0 && parseInt(setings.sessionMinutes) == 0) {
    timeLimit = 0
  }
  let waitPeriodMilliseconds = (parseInt(setings.breakHours) * 60000 * 60) + (parseInt(setings.breakMinutes) * 60000) || 5400000;
  if (parseInt(setings.breakHours) == 0 && parseInt(setings.breakMinutes) == 0) {
    waitPeriodMilliseconds = 0
  }
  
  mod = parseInt(localStorage.getItem("mod")); 
  if (!mod) {
    mod = 0;
  }

  // marker of when the timer started
  let stamp = localStorage.getItem("timeStamp");

  // marker of when the latest pause to the timer started
  let pause = localStorage.getItem("pauseStamp");
  
  let now = Date.now();
  let diff = now - stamp;

  // the time stamp representing the end of the break
  let br = parseInt(localStorage.getItem("returnStamp")) + waitPeriodMilliseconds;
  // variable that makes sure no aditional code runs after a redirect
  let cont = true
  
  if (br) {
    if (now < br) {
      cont = false
      mod = 0;
      localStorage.setItem("mod", mod);
      location.replace(target);
    } else {
      localStorage.removeItem("returnStamp");    
    }
  }

  // this happens if you are in the tab ---> true if the tab is active
  if (!document.hidden && cont) {

    // this runs if you tab in to the youtube tab after having tabed out
    if (pause) {
      localStorage.removeItem("pauseStamp");
      mod = (now - pause) + mod;
      localStorage.setItem("mod", mod);
    }

    if (stamp) {
      // runs if the time spent in the tab exedes the time limit
      if (diff - mod > timeLimit && !pause) {
        mod = 0;
        localStorage.setItem("mod", mod);
        localStorage.setItem("returnStamp", now);
        localStorage.removeItem("timeStamp");
        location.replace(target); //<---------------------------------------------------------------------------------------------------------------- alter site
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
  let display = (diff - mod)/60000;
  let displayLimit = timeLimit/60000;
  console.log(display.toFixed(1) + " / " + displayLimit);
  setTimeout(getVar, 10000);
}

// pause the count when closing the youtube tabb
window.addEventListener('pagehide', (e) => {
  e.preventDefault()
  let p = localStorage.getItem("pauseStamp");
  let s = localStorage.getItem("timeStamp");
  localStorage.setItem("mod", mod);
  if (!p && s) {
    localStorage.setItem("pauseStamp", Date.now());
  }
})//*/

// start the counter
getVar();