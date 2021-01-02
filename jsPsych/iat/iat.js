// Implicit Association Test
// Adapted from:
// Bar-Anan, Liberman & Trope (2006). The Association Between Psychological Distance and Construal Level:
// Evidence From an Implicit Association Test. Journal of Experimental Psychology: General, 609-622
// Demo Script written as an example for Tübingen Workshop on Online Experiments

// Description of the blocks (taken from Exp 1A; exact trial numbers depend on number of word items):
// Block 1 --> 16 near events/distal event trials
// Block 2 --> 16 concrete/abstract event trials
// Block 3 --> combined practice block of 16 trials (same label position as blocks 1+2)
// Block 4 --> combined data collection block of 32 trials (sale label position as block 3)
// Block 5 --> 16 near event/distal event trials (labels reverse position of Block 2)
// Block 6 --> combined practice block of 16 trials (same label position as blocks 1+5)
// Block 7 --> combined data collection block of 32 trials (same label position as blocks 6)
//
// Counter-balancing:
// Half VPs assigned concrete/distal sharing a key in first combined block
// Half VPs assigned concrete/near sharing a key in first combined block
//
// Procedure:
// Each block was preceded by an instruction screen (grey on black) that described the category
//  disciminations and key assignments for the subsequent block
// Stimuli presented in blue against a black background (remained on screen until response)
// Inter-trial-interval 250ms
// Error Trials Followed by a 500 ms beep, followed by reappearance of instructions written in red (until spacebar)
// Words selected randomly without replacement until exahusted (then repeated if required)
// Each stimulus appeared an equal number of times in each block
//
// Experiment 4A Specifics
// Dimension --> hypotheticality
// Stimulus List (16 words)
// 4 real creatures: beetle, dog, dolphin, horse
// 4 imaginary creatures: dragon, troll, nymph, cyclops
// 4 abstract words: general, universal, abstract1, abstract2
// 4 concrete words: specific1, specific2, detailed, defined

const expName = getFileName();
const dirName = getDirName();
const vpNum = genVpNum();

////////////////////////////////////////////////////////////////////////
//                           Exp Parameters                           //
////////////////////////////////////////////////////////////////////////
const prms = {
  waitDur: 1000, // duration to wait following ...
  iti: 250, // inter-trial-interval
  respKeys: ["E", "I"],
  contKeys: ["space"],
  cTrl: 1, // count trials
  cBlk: 1, // count blocks
};

////////////////////////////////////////////////////////////////////////
//                      Welcome Instructionsi                         //
////////////////////////////////////////////////////////////////////////
const task_instructions = {
  type: "html-keyboard-response",
  stimulus: generate_formatted_html({
    text: `Welcome: <br>Your task is to ... <br><br>
      Repond using the "E" and "I" keys. <br><br>
      Press the spacebar to continue!`,
    fontsize: 48,
    lineheight: 1.5,
    align: "left",
    bold: true,
    color: "blue",
  }),
  choices: prms.contKeys,
  post_trial_gap: prms.waitDur,
};

////////////////////////////////////////////////////////////////////////
//                              Stimuli                               //
////////////////////////////////////////////////////////////////////////

// prettier-ignore
const stimuli = [ 
    {"word": "beetle",    "category": "real"},
    {"word": "dog",       "category": "real"},
    {"word": "dolphin",   "category": "real"},
    {"word": "horse",     "category": "real"},
    {"word": "dragon",    "category": "imaginary"},
    {"word": "troll",     "category": "imaginary"},
    {"word": "nymph",     "category": "imaginary"},
    {"word": "cyclops",   "category": "imaginary"},
    {"word": "general",   "category": "abstract"},
    {"word": "universal", "category": "abstract"},
    {"word": "abstract1", "category": "abstract"},
    {"word": "abstract2", "category": "abstract"},
    {"word": "specific1", "category": "concrete"},
    {"word": "specific2", "category": "concrete"},
    {"word": "detailed",  "category": "concrete"},
    {"word": "defined",   "category": "concrete"},
];

////////////////////////////////////////////////////////////////////////
//                          jsPsych Objects                           //
////////////////////////////////////////////////////////////////////////

function codeTrial() {
  let error = Math.random() < 0.5 ? 0 : 1;

  jsPsych.data.addDataToLastTrial({
    date: Date(),
    error: error,
    blockNum: prms.cBlk,
    trialNum: prms.cTrl,
  });
  prms.cTrl += 1;
}

const iat_stimulus = {
  type: "html-keyboard-response",
  stimulus: "",
  response_ends_trial: true,
  choices: prms.respKeys,
  data: {
    stim: "iat",
    word: jsPsych.timelineVariable("word"),
    category: jsPsych.timelineVariable("category"),
  },
  on_start: function (trial) {
    trial.stimulus = generate_formatted_html({
      text: trial.data.word,
      fontsize: 48,
      color: "blue",
    });
  },
  on_finish: function () {
    codeTrial(); // was response correct/incorrect
  },
};

const error_tone = {
  type: "audio-keyboard-response",
  stimulus: "beep.wav",
  choice: prms.respKeys,
  trial_duration: 500,
};

const error_instructions = {
  type: "html-keyboard-response",
  stimulus: generate_formatted_html({
    text: `Welcome: <br>Your task is to ... <br><br>
      Repond using the "E" and "I" keys. <br><br>
      Press the spacebar to continue!`,
    fontsize: 48,
    lineheight: 1.5,
    align: "left",
    bold: true,
    color: "red",
  }),
  post_trial_gap: prms.iti,
  choices: prms.contKeys,
};

const if_error = {
  timeline: [error_tone, error_instructions],
  conditional_function: function () {
    let dat = jsPsych.data.get().last(1).values()[0];
    return dat.error == 1 ? true : false;
  },
};

const iti = {
  type: "html-keyboard-response",
  stimulus: "",
  trial_duration: prms.iti,
  response_ends_trial: false,
};

const trial_timeline = {
  timeline: [iat_stimulus, if_error, iti],
  timeline_variables: stimuli,
};

////////////////////////////////////////////////////////////////////////
//                             Save Data                              //
////////////////////////////////////////////////////////////////////////
const save_data = {
  type: "call-function",
  func: function () {
    let data_filename = dirName + "data/" + expName + "_" + vpNum;
    saveData(
      "/Common/write_data_json.php",
      data_filename,
      { stim: "iat" },
      "json"
    );
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
  exp.push(trial_timeline);

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
