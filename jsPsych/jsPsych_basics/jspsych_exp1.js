// jsPsych Template
// Start jsPsych, show "Hello, jsPsych", and wait for key press

// our "Hello, jsPsych" stimulus
const hello = {
  type: "html-keyboard-response",
  // stimulus: "<h1>Hello, jsPsych!</h1>",
  stimulus: "<p class='myfont'>Hello, jsPsych!</p>",
};

console.log(hello);

jsPsych.init({
  timeline: [hello],
});
