// Posner Task:
// Example adapted from the PsychoPy Online Video Tutorial:
// https://www.youtube.com/watch?v=ZQd2QEK_Gn4
// Demo Script written as an example for Tübingen Workshop on Online Experiments

const expName = getFileName();
const dirName = getDirName();
const vpNum = genVpNum();

////////////////////////////////////////////////////////////////////////
//                           Exp Parameters                           //
////////////////////////////////////////////////////////////////////////
const prms = {
  nTrlsP: 10, // number of trials in first block (practice)
  nTrlsE: 10, // number of trials in subsequent blocks
  nBlks: 2, // number of blocks
  fixDur: 500, // duration of the fixation cross
  cueDur: 200, // cue duration
  fbDur: 1000, // feedback duration
  cti: 0, // cue-target-interval duration
  targetPos: 200, // target position +-
  waitDur: 1000, // duration to wait following ...
  iti: 1000, // inter-trial-interval
  tooFast: 150, // response criterion for too fast
  tooSlow: 1500, // response criterion for too slow
  respKeys: ["Q", "P", 27], // define response keys
  fbTxt: ["Correct", "Error", "Too Slow", "Too Fast"], // text to show for feedback
  cTrl: 1, // count trials
  cBlk: 1, // count blocks
};

////////////////////////////////////////////////////////////////////////
//                      Experiment Instructions                       //
////////////////////////////////////////////////////////////////////////
const task_instructions = {
  type: "html-keyboard-response",
  stimulus:
    `<H1>Welcome: <br><br>
    Your task is to respond to the location of a circle that is presented <br><br>
    to the left or right side of the screen. Respond with the following keys:<br><br><br>
    Left Side = ` +
    prms.respKeys[0] +
    `&emsp;&emsp;Right Side = ` +
    prms.respKeys[1] +
    ` key<br><br><br> 
    Press the spacebar to continue!</H1>`,
  post_trial_gap: prms.waitDur,
};

////////////////////////////////////////////////////////////////////////
//                              Stimuli                               //
////////////////////////////////////////////////////////////////////////
const fixation_cross = {
  type: "html-keyboard-response",
  stimulus: "<p style='font-size: 50px; color: black;'> ＋</p>", // &#65291;
  choices: jsPsych.NO_KEYS,
  trial_duration: prms.fixDur,
  post_trial_gap: 0,
  data: { stim: "fixation" },
};

const cue_stimulus = {
  type: "html-keyboard-response",
  stimulus: jsPsych.timelineVariable("cue"),
  trial_duration: prms.cueDur,
  response_ends_trial: false,
  choices: prms.respKeys,
  post_trial_gap: prms.cti,
  data: {
    stim: "posner_cue",
    cue_dir: jsPsych.timelineVariable("cue_dir"),
  },
  on_start: function (trial) {
    trial.stimulus =
      "<p style='font-size: 120px; color: red; '>" + trial.stimulus + "</p>";
  },
};

const target_stimulus = {
  type: "html-keyboard-response",
  stimulus: jsPsych.timelineVariable("target"),
  stimulus_pos: jsPsych.timelineVariable("x_pos"),
  trial_duration: prms.tooSlow,
  response_ends_trial: true,
  choices: prms.respKeys,
  post_trial_gap: 0,
  data: {
    stim: "posner_target",
    target_side: jsPsych.timelineVariable("target_side"),
    validity: jsPsych.timelineVariable("validity"),
    corrResp: jsPsych.timelineVariable("key"),
  },
  on_start: function (trial) {
    trial.stimulus =
      "<p style='position: relative; left:" +
      trial.stimulus_pos +
      "px; font-size: 120px; color: red; '>" +
      trial.stimulus +
      "</p>";
  },
  on_finish: function () {
    codeTrial();
  },
};

const trial_feedback = {
  type: "html-keyboard-response",
  stimulus: "",
  trial_duration: prms.fbDur,
  response_ends_trial: false,
  post_trial_gap: prms.iti,
  data: { stim: "feedback" },
  on_start: function (trial) {
    trial.stimulus = trialFeedbackTxt(prms.fbTxt);
  },
};

const block_feedback = {
  type: "html-keyboard-response",
  stimulus: "",
  response_ends_trial: true,
  post_trial_gap: prms.waitDur,
  on_start: function (trial) {
    trial.stimulus = blockFeedbackTxt({ stim: "posner_target" });
  },
};

//&#11013; = ⬅
//&#10145; = ➡
// prettier-ignore
const trial_timeline = {
    timeline: [fixation_cross, cue_stimulus, target_stimulus, trial_feedback],
    timeline_variables: [
        { cue: "&#11013;", cue_dir: "left",  target: "&#128907;", target_side: "left",  x_pos: -prms.targetPos, validity: 'valid',   key: prms.respKeys[0] },
        { cue: "&#11013;", cue_dir: "left",  target: "&#128907;", target_side: "left",  x_pos: -prms.targetPos, validity: 'valid',   key: prms.respKeys[0] },
        { cue: "&#11013;", cue_dir: "left",  target: "&#128907;", target_side: "left",  x_pos: -prms.targetPos, validity: 'valid',   key: prms.respKeys[0] },
        { cue: "&#11013;", cue_dir: "left",  target: "&#128907;", target_side: "left",  x_pos: -prms.targetPos, validity: 'valid',   key: prms.respKeys[0] },
        { cue: "&#10145;", cue_dir: "right", target: "&#128907;", target_side: "right", x_pos:  prms.targetPos, validity: 'valid',   key: prms.respKeys[1] },
        { cue: "&#10145;", cue_dir: "right", target: "&#128907;", target_side: "right", x_pos:  prms.targetPos, validity: 'valid',   key: prms.respKeys[1] },
        { cue: "&#10145;", cue_dir: "right", target: "&#128907;", target_side: "right", x_pos:  prms.targetPos, validity: 'valid',   key: prms.respKeys[1] },
        { cue: "&#10145;", cue_dir: "right", target: "&#128907;", target_side: "right", x_pos:  prms.targetPos, validity: 'valid',   key: prms.respKeys[1] },
        { cue: "&#11013;", cue_dir: "left",  target: "&#128907;", target_side: "right", x_pos:  prms.targetPos, validity: 'invalid', key: prms.respKeys[1] },
        { cue: "&#10145;", cue_dir: "right", target: "&#128907;", target_side: "left",  x_pos: -prms.targetPos, validity: 'invalid', key: prms.respKeys[0] },
    ],
};

////////////////////////////////////////////////////////////////////////
//                             Save Data                              //
////////////////////////////////////////////////////////////////////////
const save_data = {
  type: "call-function",
  func: function () {
    let data_filename = dirName + "data/" + expName + "_" + vpNum;
    saveData("/Common/write_data_json.php", data_filename, [
      { stim: "posner_cue" },
      { stim: "posner_target" },
    ]);
  },
  timing_post_trial: 200,
};

////////////////////////////////////////////////////////////////////////
//                    Generate and run experiment                     //
////////////////////////////////////////////////////////////////////////
function genExpSeq() {
  "use strict";

  let exp = [];

  exp.push(fullscreen_on);
  exp.push(hideMouseCursor);

  exp.push(welcome_en);
  // exp.push(vpInfoForm_en);
  exp.push(task_instructions);

  for (let blk = 0; blk < prms.nBlks; blk++) {
    let blk_timeline = { ...trial_timeline };
    blk_timeline.sample = {
      type: "fixed-repetitions",
      size: blk === 0 ? prms.nTrlsP / 10 : prms.nTrlsE / 10,
    };
    exp.push(blk_timeline); // trials within a block
    exp.push(block_feedback); // show previous block performance
  }

  exp.push(save_data);
  exp.push(debrief_en);
  exp.push(fullscreen_off);
  exp.push(showMouseCursor);

  return exp;
}
const EXP = genExpSeq();

jsPsych.init({
  timeline: EXP,
  show_progress_bar: false,
});
