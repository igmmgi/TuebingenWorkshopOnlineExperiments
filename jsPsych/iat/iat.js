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

// Just create two counter-balanced versions (see P614 paragraph 2)
// Version 1:
// 1st combined block: E real + abstract; I imaginary + concrete
// Version 2:
// 1st combined block: E imaginary + abstract; I real + concrete

const expName = getFileName();
const dirName = getDirName();
const vpNum = genVpNum();

////////////////////////////////////////////////////////////////////////
//                           Exp Parameters                           //
////////////////////////////////////////////////////////////////////////
const prms = {
  nBlks: 7,
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
const task_instructions_general = {
  type: "html-keyboard-response",
  stimulus: generate_formatted_html({
    text: `Welcome: <br><br>Your task is to respond to single words presented in the centre of the screen according to word category.
    You will respond using the "E" and "I" keys with your left and right index fingers, respectively. The word category and 
    response key assignment will be indicated to you before each block of trials. Read the instructions carefully. Respond
    as quickly and as accurately as possible! <br><br>
      Press the spacebar to continue!`,
    fontsize: 48,
    lineheight: 1.5,
    align: "left",
    bold: true,
    color: "blue",
    width: "1800px",
  }),
  choices: prms.contKeys,
  post_trial_gap: prms.waitDur,
};

let nVersion = 1;
let resp_key_block1;
if (nVersion === 1) {
  resp_key_e = ["real", "concrete"];
  resp_key_i = ["imaginary", "abstract"];
} else {
  resp_key_e = ["imaginary", "concrete"];
  resp_key_i = ["real", "abstract"];
}

const task_instructions_practice_block1 = {
  type: "html-keyboard-response",
  stimulus: generate_formatted_html({
    text: `Block 1: <br><br>The following block consists of 16 training trials. Respond according the the word category: "real" vs. "imaginary" with the following key assignment:<br><br>
      E key = "${resp_key_e[0]}"<br>I key = "${resp_key_i[0]}"
      <br><br>Press the spacebar to continue!`,
    fontsize: 48,
    lineheight: 1.5,
    align: "left",
    bold: true,
    color: "blue",
    width: "1800px",
  }),
  choices: prms.contKeys,
  post_trial_gap: prms.waitDur,
};

const task_instructions_practice_block2 = {
  type: "html-keyboard-response",
  stimulus: generate_formatted_html({
    text: `Block 2: <br><br>The following block consists of 16 training trials. Respond according the the word category: "abstract" vs. "concrete" with the following key assignment:<br><br>
      E key = "${resp_key_e[1]}"<br>I key = "${resp_key_i[1]}"
      <br><br>Press the spacebar to continue!`,
    fontsize: 48,
    lineheight: 1.5,
    align: "left",
    bold: true,
    color: "blue",
    width: "1800px",
  }),
  choices: prms.contKeys,
  post_trial_gap: prms.waitDur,
};

function blockFeedbackTxt(filter_options) {
  "use strict";
  let dat = jsPsych.data
    .get()
    .filter({ ...filter_options, blockNum: prms.cBlk });
  // let nError = dat.select("error").values.filter(function (x) {
  //   return x !== 0;
  // }).length;

  let nTotal = dat.count();
  let nError = dat.select("error").sum();
  let meanRT = dat.select("rt").mean();
  let meanER = Math.round((nError / nTotal) * 100);

  let blockFbTxt =
    "<H1>Block: " +
    prms.cBlk +
    " of " +
    prms.nBlks +
    "</H1><br>" +
    "<H1>Mean RT: " +
    meanRT +
    " ms </H1>" +
    "<H1>Error Rate: " +
    meanER +
    " %</H1><br>" +
    "<H2>Press any key to continue the experiment!</H2>";
  prms.cBlk += 1;
  return blockFbTxt;
}

const blk_feedback = {
  type: "html-keyboard-response",
  stimulus: "",
  response_ends_trial: true,
  post_trial_gap: prms.waitDur,
  on_start: function (trial) {
    trial.stimulus = blockFeedbackTxt({ stim: "iat" });
  },
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

const stimuli_block1 = stimuli.filter(function (stim) {
  return stim.category == "real" || stim.category == "imaginary";
});

const stimuli_block2 = stimuli.filter(function (stim) {
  return stim.category == "abstract" || stim.category == "concrete";
});

////////////////////////////////////////////////////////////////////////
//                          jsPsych Objects                           //
////////////////////////////////////////////////////////////////////////

function codeTrial() {
  let dat = jsPsych.data.get().last(1).values()[0];

  let error = 0;
  let key = jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(dat.key_press);
  if (key === "e") {
    if (!resp_key_e.includes(dat.category)) {
      error = 1;
    }
  } else if (key === "i") {
    if (!resp_key_i.includes(dat.category)) {
      error = 1;
    }
  }

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
  stimulus: "",
  post_trial_gap: prms.iti,
  choices: prms.contKeys,
  on_start: function (trial) {
    let txt;
    if (prms.cBlk === 1) {
      txt = `E key = "${resp_key_e[0]}"<br>I key = "${resp_key_i[0]}"<br><br>
                      Press the spacebar to continue!`;
    } else if (prms.cBlk === 2) {
      txt = `E key = "${resp_key_e[1]}"<br>I key = "${resp_key_i[1]}"<br><br>
                        Press the spacebar to continue!`;
    }
    trial.stimulus = generate_formatted_html({
      text: txt,
      fontsize: 48,
      lineheight: 1.5,
      align: "center",
      bold: true,
      color: "red",
    });
  },
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

  // general instructions
  exp.push(task_instructions_general);

  let blk_timeline;

  // block 1
  exp.push(task_instructions_practice_block1);
  blk_timeline = {
    timeline: [iat_stimulus, if_error, iti],
    timeline_variables: stimuli_block1,
    randomize_order: true,
    repetitions: 2,
  };
  exp.push(blk_timeline);
  exp.push(blk_feedback);

  // block 2
  exp.push(task_instructions_practice_block2);
  blk_timeline = {
    timeline: [iat_stimulus, if_error, iti],
    timeline_variables: stimuli_block2,
    randomize_order: true,
    repetitions: 2,
  };
  exp.push(blk_timeline);

  exp.push(save_data);
  exp.push(debrief_en);
  exp.push(fullscreen_off);
  exp.push(showMouseCursor);

  return exp;
}
const EXP = genExpSeq();

jsPsych.init({
  timeline: EXP,
});
