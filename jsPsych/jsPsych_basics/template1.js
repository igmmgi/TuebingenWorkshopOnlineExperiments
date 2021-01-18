// jsPsych Template
// Start jsPsych, show "Hello, jsPsych", and wait for key press

// our "Hello, jsPsych" stimulus
const hello = {
  type: "html-keyboard-response",
  stimulus: "<p class='myfont'>Hello, jsPsych!</p>",
};

jsPsych.init({
  timeline: [hello],
});
