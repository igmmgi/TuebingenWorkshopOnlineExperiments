// jsPsych Template
// Start jsPsych, show "Hello, jsPsych", and wait for key press

// our "Hello, jsPsych" stimulus
const hello = {
  type: "html-keyboard-response",
  stimulus: `<p class = 'myfont'>
    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
    tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At
    vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
    gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.`,
};

const goodbye = {
  type: "html-button-response",
  stimulus: `<p class="myfont"> 🤑🏁 Goodbye, jsPsych! 🏁🤑</p>
             <i class="fas fa-sync-alt fa-spin fa-10x "></i>`,
  choices: ["Click here to continue!"],
};

// stimulus:
// create experiment sequence
let exp = [];
exp.push(hello);
exp.push(goodbye);

const my_emojis = ["🤑", "🏁", "🤑", "🏁", "🤑", "🏁"];

for (let i = 0; i < my_emojis.length; i++) {
  exp.push({
    type: "html-keyboard-response",
    stimulus: '<p class="myfont">` + my_emojis[i] + `</p>',
    choices: ["space"],
    stimulus_duration: 1000,
  });
}

jsPsych.init({
  timeline: exp,
  on_finish: function () {
    jsPsych.data.displayData();
  },
});
