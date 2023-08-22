const puppeteer = require("puppeteer");
const url = "https://www.hackerrank.com/auth/login";
const email = "ridod91508@mykcloud.com";
const password = "Temporary User";
const codeObj = require('./codes');
let browserOpen = puppeteer.launch({
  headless: false,
  args: ["--start-maximized"],
  defaultViewport: null,
});
let page;
browserOpen
  .then(function (browserObj) {
    let browserOpenPromise = browserObj.newPage();
    return browserOpenPromise;
  })
  .then(function (newTab) {
    page = newTab;
    let hackerRankOpenPromise = newTab.goto(url);
    return hackerRankOpenPromise;
  })
  .then(function () {
    let emailIsEntered = page.type('input[id="input-1"]', email, { delay: 50 });
    return emailIsEntered;
  })
  .then(function () {
    let passIsEntered = page.type('input[type="password"]', password, {
      delay: 50,
    });
    return passIsEntered;
  })
  .then(function () {
    let loginButtonClicked = page.click(
      "button[data-analytics = 'LoginPassword']",
      { delay: 50 }
    );
    return loginButtonClicked;
  })
  .then(function () {
    let ClickOnAlgoPromise = waitAndClick(
      '.topic-card a[data-attr1="algorithms"]',
      page
    );
    return ClickOnAlgoPromise;
  })
  .then(function () {
    let getToWarmUp = waitAndClick('input[value="warmup"]', page);
    return getToWarmUp;
  })
  .then(function () {
    let waitForATime = page.waitFor(3000);
    return waitForATime;
  })
  .then(function () {
    let allChalangesPromise = page.$$(
      ".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled",
      { delay: 50 }
    );
    return allChalangesPromise;
  })
  .then(function (quesArr) {
    //console.log(quesArr.length);
    let questionsWillBeSolved = questionSolver(page , quesArr[0] , codeObj.answers[0]);

    return questionsWillBeSolved;
  });

function questionSolver(page, question, ans) {
  return new Promise(function (resolve, reject) {
    let questionWillBeClicked = question.click();
    questionWillBeClicked
      .then(function () {
        let EditorInFocusPromise = waitAndClick(
          ".monaco-editor.no-user-select.vs",
          page
        );
        return EditorInFocusPromise;
      })
      .then(function () {
        return waitAndClick(".checkbox-input", page);
      })
      .then(function () {
        return page.waitForSelector("textarea.custominput", page);
      })
      .then(function () {
        return page.type("textarea.custominput", ans, { delay: 10 });
      }).then(function(){
        let ctrlIsPressed = page.keyboard.down('Control');
        return ctrlIsPressed;
      }).then(function(){
        let AisPressed = page.keyboard.press('A',{delay : 100});
        return AisPressed;
      }).then(function(){
        let XisPressed = page.keyboard.press('X' , {delay : 100});
        return XisPressed;
      }).then(function(){
        let ctrlIsUnpressed = page.keyboard.up('Control');
        return ctrlIsUnpressed;
      }).then(function(){
        let mainEditorInFocus = waitAndClick('.monaco-editor.no-user-select.vs' , page );
        return mainEditorInFocus;
      }).then(function(){
        let ctrlIsPressed = page.keyboard.down('Control');
        return ctrlIsPressed;
      }).then(function(){
        let AisPressed = page.keyboard.press('A',{delay : 100});
        return AisPressed;
      }).then(function(){
        let VisPressed = page.keyboard.press('V',{delay : 100});
        return VisPressed;
      }).then(function(){
        let ctrlIsUnpressed = page.keyboard.up('Control');
        return ctrlIsUnpressed;
      }).then(function(){
        return page.click('.hr-monaco__run-code',{delay : 50});
      }).then(function(){
        resolve();
      }).catch(function(err){
        reject();
      })
  });
}

function waitAndClick(selector, cPage) {
  return new Promise(function (resolve, reject) {
    let waitForModelPromise = cPage.waitForSelector(selector);
    waitForModelPromise
      .then(function () {
        let clickModal = cPage.click(selector);
        return clickModal;
      })
      .then(function () {
        resolve();
      })
      .catch(function (err) {
        reject();
      });
  });
}
