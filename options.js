function saveOptions(e) {
    e.preventDefault();
    browser.storage.sync.set({
        target: document.querySelector("#target").value,
        sessionHours: document.querySelector("#sessionHours").value,
        sessionMinutes: document.querySelector("#sessionMinutes").value,
        breakHours: document.querySelector("#breakHours").value,
        breakMinutes: document.querySelector("#breakMinutes").value
    });
}
  
function restoreOptions() {
    function setCurrentChoice(result) {
        document.querySelector("#target").value = result.target || "about:home"; // https://kielikoulu.yle.fi/#/history
        document.querySelector("#sessionHours").value = result.sessionHours || 3;
        document.querySelector("#sessionMinutes").value = result.sessionMinutes || 0;
        document.querySelector("#breakHours").value = result.breakHours || 1;
        document.querySelector("#breakMinutes").value = result.breakMinutes || 30;
    }
    function onError(error) {
        console.log(`Error: ${error}`);
    }
    browser.storage.sync.get(["target","sessionHours","sessionMinutes","breakHours","breakMinutes"]).then(setCurrentChoice, onError);
}
  
document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
  