// jsPsych Template
// Start jsPsych, show "Hello, jsPsych", and wait for key press

// our "Hello, jsPsych" stimulus
const hello = {
  type: "html-keyboard-response",
  stimulus: `<p class = 'myfont'>🏁 🙈 🤣 😀 ♧  ☊ ↓ <br>
  This is some text that should span more than one line!
  We can write lots of instructions here! This will automatically add line breaks!`,
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

jsPsych.init({
  timeline: exp,
  on_finish: function () {
    jsPsych.data.displayData();
  },
});
