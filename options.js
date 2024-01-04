function saveOptions(e) {
    e.preventDefault();
    browser.storage.sync.set({
        target: document.querySelector("#target").value,
        hours: document.querySelector("#hours").value,
        minutes: document.querySelector("#minutes").value
    });
}
  
function restoreOptions() {
    function setCurrentChoice(result) {
        document.querySelector("#target").value = result.target || "about:home"; // https://kielikoulu.yle.fi/#/history
        document.querySelector("#hours").value = result.hours || 3;
        document.querySelector("#minutes").value = result.minutes || 0;
    }
    function onError(error) {
        console.log(`Error: ${error}`);
    }
    browser.storage.sync.get(["target","hours","minutes"]).then(setCurrentChoice, onError);
}
  
document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
  