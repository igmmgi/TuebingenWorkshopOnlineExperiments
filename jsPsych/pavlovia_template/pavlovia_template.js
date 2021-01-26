// Posner Task:
// Example adapted from the PsychoPy Online Video Tutorial:
// https://www.youtube.com/watch?v=ZQd2QEK_Gn4
// Demo Script written as an example for Tübingen Workshop on Online Experiments

function genVpNum() {
  // Participant number based on time
  "use strict";
  let num = new Date();
  num = num.getTime();
  jsPsych.data.addProperties({ vpNum: num });
  return num;
}

function getVersionNumber(num, numberOfVersions) {
  // assign version number
  return (num % numberOfVersions) + 1;
}

// Can't use PHP code on Pavlovia?
// Two options
// Option 1: Assign version randomly based on mod of time
const vpNum1 = genVpNum();
const version_number1 = getVersionNumber(vpNum1, 4);
console.log("Participant number: ", vpNum1);
console.log("Version number: ", version_number1);

// Option 2: Consequtive participant numbers provided by the following link
// https://moryscarter.com/vespr/pavlovia.php
// https://moryscarter.com/vespr/pavlovia.php?folder=igmmgi&experiment=pavlovia_template/
const vpNum2 = jsPsych.data.urlVariables().participant;
const version_number2 = getVersionNumber(vpNum2, 4);
console.log("Participant number: ", vpNum2);
console.log("Version number: ", version_number2);

////////////////////////////////////////////////////////////////////////
//                      Experiment Instructions                       //
////////////////////////////////////////////////////////////////////////
const welcome = {
  type: "html-keyboard-response",
  stimulus: `<H1>Welcome to Pavlovia and jsPsych!<br><br>
    Press the spacebar to continue!</H1>`,
  post_trial_gap: 500,
};

////////////////////////////////////////////////////////////////////////
//                        Pavlovia Interaction                        //
////////////////////////////////////////////////////////////////////////
const pavolvia_init = {
  type: "pavlovia",
  command: "init",
};

const pavolvia_finish = {
  type: "pavlovia",
  command: "finish",
};

////////////////////////////////////////////////////////////////////////
//                    Generate and run experiment                     //
////////////////////////////////////////////////////////////////////////
function genExpSeq() {
  "use strict";

  let exp = [];
  exp.push(pavolvia_init);
  exp.push(welcome);
  exp.push(pavolvia_finish);

  return exp;
}
const EXP = genExpSeq();

jsPsych.init({
  timeline: EXP,
  show_progress_bar: false,
});
