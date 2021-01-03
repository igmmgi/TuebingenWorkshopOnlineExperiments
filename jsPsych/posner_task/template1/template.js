// jsPsych Template
// Start jsPsych, show "Hello, jsPsych", and wait for key press

// our "Hello, jsPsych" stimulus
const hello = {
  type: "html-keyboard-response",
  stimulus: "<H1>Hello, jsPsych!</H1>",
  // stimulus: "<p><font size='50' color='blue'>Hello, jsPsych!</p>",
  // stimulus: "<div class=myfont>Hello, <br>jsPsych!</div>",
};

const goodbye = {
  type: "html-button-response",
  stimulus: "<H1>Goodbye, jsPsych!</H1>",
  choices: ["Click here to continue!"],
};

// create experiment sequence
let exp = [];
exp.push(hello);
exp.push(goodbye);

jsPsych.init({
  timeline: exp,
});

// jsPsych.init({
//   timeline: exp,
//   on_finish: function () {
//     jsPsych.data.displayData();
//   },
// });
