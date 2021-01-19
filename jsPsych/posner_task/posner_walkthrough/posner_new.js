const instructions = {
  type: "html-keyboard-response",
  stimulus: `<h1>Your task is to respond to the location of the target with "Q" and "P" keypresses</h1>`,
  post_trial_gap: 500,
};

const fixation_cross = {
  type: "html-keyboard-response",
  stimulus: `<h1>+</h1>`,
  trial_duration: 1000,
  response_ends_trial: false,
};

const cue_stimulus = {
  type: "image-keyboard-response",
  stimulus: jsPsych.timelineVariable("cue"),
};

const imgs = [
  "../images/arrow_left.png",
  "../images/arrow_right.png",
  "../images/target.png",
];

const trial_timeline = {
  timeline: [fixation_cross, cue_stimulus],
  timeline_variables: [{ cue: imgs[0] }, { cue: imgs[1] }],
};

jsPsych.init({
  timeline: [trial_timeline],
  preload_images: imgs,
});
