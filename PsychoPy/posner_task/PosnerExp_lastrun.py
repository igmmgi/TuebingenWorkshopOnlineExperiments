#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
This experiment was created using PsychoPy3 Experiment Builder (v2020.2.10),
    on Tue Jan 19 11:47:26 2021
If you publish work using this script the most relevant publication is:

    Peirce J, Gray JR, Simpson S, MacAskill M, Höchenberger R, Sogo H, Kastman E, Lindeløv JK. (2019) 
        PsychoPy2: Experiments in behavior made easy Behav Res 51: 195. 
        https://doi.org/10.3758/s13428-018-01193-y

"""

from __future__ import absolute_import, division

from psychopy import locale_setup
from psychopy import prefs
from psychopy import sound, gui, visual, core, data, event, logging, clock
from psychopy.constants import (NOT_STARTED, STARTED, PLAYING, PAUSED,
                                STOPPED, FINISHED, PRESSED, RELEASED, FOREVER)

import numpy as np  # whole numpy lib is available, prepend 'np.'
from numpy import (sin, cos, tan, log, log10, pi, average,
                   sqrt, std, deg2rad, rad2deg, linspace, asarray)
from numpy.random import random, randint, normal, shuffle
import os  # handy system and path functions
import sys  # to get file system encoding

from psychopy.hardware import keyboard



# Ensure that relative paths start from the same directory as this script
_thisDir = os.path.dirname(os.path.abspath(__file__))
os.chdir(_thisDir)

# Store info about the experiment session
psychopyVersion = '2020.2.10'
expName = 'PosnerExp'  # from the Builder filename that created this script
expInfo = {'participant': '', 'session': '001'}
dlg = gui.DlgFromDict(dictionary=expInfo, sortKeys=False, title=expName)
if dlg.OK == False:
    core.quit()  # user pressed cancel
expInfo['date'] = data.getDateStr()  # add a simple timestamp
expInfo['expName'] = expName
expInfo['psychopyVersion'] = psychopyVersion

# Data file name stem = absolute path + name; later add .psyexp, .csv, .log, etc
filename = _thisDir + os.sep + u'data/%s_%s_%s' % (expInfo['participant'], expName, expInfo['date'])

# An ExperimentHandler isn't essential but helps with data saving
thisExp = data.ExperimentHandler(name=expName, version='',
    extraInfo=expInfo, runtimeInfo=None,
    originPath='/Users/Admin/Desktop/posner_task/PosnerExp_lastrun.py',
    savePickle=True, saveWideText=True,
    dataFileName=filename)
# save a log file for detail verbose info
logFile = logging.LogFile(filename+'.log', level=logging.DEBUG)
logging.console.setLevel(logging.WARNING)  # this outputs to the screen, not a file

endExpNow = False  # flag for 'escape' or other condition => quit the exp
frameTolerance = 0.001  # how close to onset before 'same' frame

# Start Code - component code to be run after the window creation

# Setup the Window
win = visual.Window(
    size=[2560, 1440], fullscr=False, screen=1, 
    winType='pyglet', allowGUI=True, allowStencil=False,
    monitor='testMonitor', color=[0,0,0], colorSpace='rgb',
    blendMode='avg', useFBO=True, 
    units='height')
# store frame rate of monitor if we can measure it
expInfo['frameRate'] = win.getActualFrameRate()
if expInfo['frameRate'] != None:
    frameDur = 1.0 / round(expInfo['frameRate'])
else:
    frameDur = 1.0 / 60.0  # could not measure, so guess

# create a default keyboard (e.g. to check for escape)
defaultKeyboard = keyboard.Keyboard()

# Initialize components for Routine "instructions"
instructionsClock = core.Clock()
instructionsTxtx = visual.TextStim(win=win, name='instructionsTxtx',
    text='default text',
    font='Arial',
    pos=(0, 0), height=0.04, wrapWidth=None, ori=0, 
    color='white', colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=0.0);
startExp = event.Mouse(win=win)
x, y = [None, None]
startExp.mouseClock = core.Clock()
StartButton = visual.TextStim(win=win, name='StartButton',
    text='Click here to start',
    font='Arial',
    pos=(0.4, -0.4), height=0.02, wrapWidth=None, ori=0, 
    color='white', colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=-2.0);

# Initialize components for Routine "trial"
trialClock = core.Clock()
fixation = visual.TextStim(win=win, name='fixation',
    text='default text',
    font='Arial',
    pos=(0, 0), height=0.1, wrapWidth=None, ori=0, 
    color='white', colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=0.0);
cue = visual.ImageStim(
    win=win,
    name='cue', 
    image='sin', mask=None,
    ori=0, pos=(0, 0), size=(0.3, 0.3),
    color=[1,1,1], colorSpace='rgb', opacity=1,
    flipHoriz=False, flipVert=False,
    texRes=512, interpolate=True, depth=-1.0)
target = visual.ImageStim(
    win=win,
    name='target', 
    image='images/target.png', mask=None,
    ori=0, pos=[0,0], size=(0.3, 0.3),
    color=[1,1,1], colorSpace='rgb', opacity=1,
    flipHoriz=False, flipVert=False,
    texRes=512, interpolate=True, depth=-2.0)
resp = event.Mouse(win=win)
x, y = [None, None]
resp.mouseClock = core.Clock()

# Initialize components for Routine "end"
endClock = core.Clock()
endMsg = visual.TextStim(win=win, name='endMsg',
    text='Thanks for participating!\n\nClick on the button to end!',
    font='Arial',
    pos=(0, 0), height=0.1, wrapWidth=None, ori=0, 
    color='white', colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=0.0);
endButton = visual.Polygon(
    win=win, name='endButton',
    edges=100, size=(0.2, 0.2),
    ori=0, pos=(0, -0.4),
    lineWidth=1, lineColor=[1,1,1], lineColorSpace='rgb',
    fillColor=[0,1,0], fillColorSpace='rgb',
    opacity=1, depth=-1.0, interpolate=True)
endClick = event.Mouse(win=win)
x, y = [None, None]
endClick.mouseClock = core.Clock()

# Create some handy timers
globalClock = core.Clock()  # to track the time since experiment started
routineTimer = core.CountdownTimer()  # to track time remaining of each (non-slip) routine 

# set up handler to look after randomisation of conditions etc
instrLoop = data.TrialHandler(nReps=1, method='sequential', 
    extraInfo=expInfo, originPath=-1,
    trialList=data.importConditions('InstructionsFile.xlsx'),
    seed=None, name='instrLoop')
thisExp.addLoop(instrLoop)  # add the loop to the experiment
thisInstrLoop = instrLoop.trialList[0]  # so we can initialise stimuli with some values
# abbreviate parameter names if possible (e.g. rgb = thisInstrLoop.rgb)
if thisInstrLoop != None:
    for paramName in thisInstrLoop:
        exec('{} = thisInstrLoop[paramName]'.format(paramName))

for thisInstrLoop in instrLoop:
    currentLoop = instrLoop
    # abbreviate parameter names if possible (e.g. rgb = thisInstrLoop.rgb)
    if thisInstrLoop != None:
        for paramName in thisInstrLoop:
            exec('{} = thisInstrLoop[paramName]'.format(paramName))
    
    # ------Prepare to start Routine "instructions"-------
    continueRoutine = True
    # update component parameters for each repeat
    instructionsTxtx.setText(thisInstruction)
    # setup some python lists for storing info about the startExp
    startExp.x = []
    startExp.y = []
    startExp.leftButton = []
    startExp.midButton = []
    startExp.rightButton = []
    startExp.time = []
    startExp.clicked_name = []
    gotValidClick = False  # until a click is received
    # keep track of which components have finished
    instructionsComponents = [instructionsTxtx, startExp, StartButton]
    for thisComponent in instructionsComponents:
        thisComponent.tStart = None
        thisComponent.tStop = None
        thisComponent.tStartRefresh = None
        thisComponent.tStopRefresh = None
        if hasattr(thisComponent, 'status'):
            thisComponent.status = NOT_STARTED
    # reset timers
    t = 0
    _timeToFirstFrame = win.getFutureFlipTime(clock="now")
    instructionsClock.reset(-_timeToFirstFrame)  # t0 is time of first possible flip
    frameN = -1
    
    # -------Run Routine "instructions"-------
    while continueRoutine:
        # get current time
        t = instructionsClock.getTime()
        tThisFlip = win.getFutureFlipTime(clock=instructionsClock)
        tThisFlipGlobal = win.getFutureFlipTime(clock=None)
        frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
        # update/draw components on each frame
        
        # *instructionsTxtx* updates
        if instructionsTxtx.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            instructionsTxtx.frameNStart = frameN  # exact frame index
            instructionsTxtx.tStart = t  # local t and not account for scr refresh
            instructionsTxtx.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(instructionsTxtx, 'tStartRefresh')  # time at next scr refresh
            instructionsTxtx.setAutoDraw(True)
        # *startExp* updates
        if startExp.status == NOT_STARTED and t >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            startExp.frameNStart = frameN  # exact frame index
            startExp.tStart = t  # local t and not account for scr refresh
            startExp.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(startExp, 'tStartRefresh')  # time at next scr refresh
            startExp.status = STARTED
            startExp.mouseClock.reset()
            prevButtonState = startExp.getPressed()  # if button is down already this ISN'T a new click
        if startExp.status == STARTED:  # only update if started and not finished!
            buttons = startExp.getPressed()
            if buttons != prevButtonState:  # button state changed?
                prevButtonState = buttons
                if sum(buttons) > 0:  # state changed to a new click
                    # check if the mouse was inside our 'clickable' objects
                    gotValidClick = False
                    for obj in [StartButton]:
                        if obj.contains(startExp):
                            gotValidClick = True
                            startExp.clicked_name.append(obj.name)
                    x, y = startExp.getPos()
                    startExp.x.append(x)
                    startExp.y.append(y)
                    buttons = startExp.getPressed()
                    startExp.leftButton.append(buttons[0])
                    startExp.midButton.append(buttons[1])
                    startExp.rightButton.append(buttons[2])
                    startExp.time.append(startExp.mouseClock.getTime())
                    if gotValidClick:  # abort routine on response
                        continueRoutine = False
        
        # *StartButton* updates
        if StartButton.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            StartButton.frameNStart = frameN  # exact frame index
            StartButton.tStart = t  # local t and not account for scr refresh
            StartButton.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(StartButton, 'tStartRefresh')  # time at next scr refresh
            StartButton.setAutoDraw(True)
        
        # check for quit (typically the Esc key)
        if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
            core.quit()
        
        # check if all components have finished
        if not continueRoutine:  # a component has requested a forced-end of Routine
            break
        continueRoutine = False  # will revert to True if at least one component still running
        for thisComponent in instructionsComponents:
            if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                continueRoutine = True
                break  # at least one component has not yet finished
        
        # refresh the screen
        if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
            win.flip()
    
    # -------Ending Routine "instructions"-------
    for thisComponent in instructionsComponents:
        if hasattr(thisComponent, "setAutoDraw"):
            thisComponent.setAutoDraw(False)
    instrLoop.addData('instructionsTxtx.started', instructionsTxtx.tStartRefresh)
    instrLoop.addData('instructionsTxtx.stopped', instructionsTxtx.tStopRefresh)
    # store data for instrLoop (TrialHandler)
    if len(startExp.x): instrLoop.addData('startExp.x', startExp.x[0])
    if len(startExp.y): instrLoop.addData('startExp.y', startExp.y[0])
    if len(startExp.leftButton): instrLoop.addData('startExp.leftButton', startExp.leftButton[0])
    if len(startExp.midButton): instrLoop.addData('startExp.midButton', startExp.midButton[0])
    if len(startExp.rightButton): instrLoop.addData('startExp.rightButton', startExp.rightButton[0])
    if len(startExp.time): instrLoop.addData('startExp.time', startExp.time[0])
    if len(startExp.clicked_name): instrLoop.addData('startExp.clicked_name', startExp.clicked_name[0])
    instrLoop.addData('startExp.started', startExp.tStart)
    instrLoop.addData('startExp.stopped', startExp.tStop)
    instrLoop.addData('StartButton.started', StartButton.tStartRefresh)
    instrLoop.addData('StartButton.stopped', StartButton.tStopRefresh)
    # the Routine "instructions" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset()
    thisExp.nextEntry()
    
# completed 1 repeats of 'instrLoop'


# set up handler to look after randomisation of conditions etc
trials = data.TrialHandler(nReps=1, method='random', 
    extraInfo=expInfo, originPath=-1,
    trialList=data.importConditions('conditions.xlsx'),
    seed=None, name='trials')
thisExp.addLoop(trials)  # add the loop to the experiment
thisTrial = trials.trialList[0]  # so we can initialise stimuli with some values
# abbreviate parameter names if possible (e.g. rgb = thisTrial.rgb)
if thisTrial != None:
    for paramName in thisTrial:
        exec('{} = thisTrial[paramName]'.format(paramName))

for thisTrial in trials:
    currentLoop = trials
    # abbreviate parameter names if possible (e.g. rgb = thisTrial.rgb)
    if thisTrial != None:
        for paramName in thisTrial:
            exec('{} = thisTrial[paramName]'.format(paramName))
    
    # ------Prepare to start Routine "trial"-------
    continueRoutine = True
    # update component parameters for each repeat
    fixation.setText('+')
    cue.setImage(cue_file)
    target.setPos((target_x, target_y))
    # setup some python lists for storing info about the resp
    resp.clicked_name = []
    gotValidClick = False  # until a click is received
    resp.setPos(newPos=(0,0))
    # keep track of which components have finished
    trialComponents = [fixation, cue, target, resp]
    for thisComponent in trialComponents:
        thisComponent.tStart = None
        thisComponent.tStop = None
        thisComponent.tStartRefresh = None
        thisComponent.tStopRefresh = None
        if hasattr(thisComponent, 'status'):
            thisComponent.status = NOT_STARTED
    # reset timers
    t = 0
    _timeToFirstFrame = win.getFutureFlipTime(clock="now")
    trialClock.reset(-_timeToFirstFrame)  # t0 is time of first possible flip
    frameN = -1
    
    # -------Run Routine "trial"-------
    while continueRoutine:
        # get current time
        t = trialClock.getTime()
        tThisFlip = win.getFutureFlipTime(clock=trialClock)
        tThisFlipGlobal = win.getFutureFlipTime(clock=None)
        frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
        # update/draw components on each frame
        
        # *fixation* updates
        if fixation.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            fixation.frameNStart = frameN  # exact frame index
            fixation.tStart = t  # local t and not account for scr refresh
            fixation.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(fixation, 'tStartRefresh')  # time at next scr refresh
            fixation.setAutoDraw(True)
        if fixation.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > fixation.tStartRefresh + 0.5-frameTolerance:
                # keep track of stop time/frame for later
                fixation.tStop = t  # not accounting for scr refresh
                fixation.frameNStop = frameN  # exact frame index
                win.timeOnFlip(fixation, 'tStopRefresh')  # time at next scr refresh
                fixation.setAutoDraw(False)
        
        # *cue* updates
        if cue.status == NOT_STARTED and tThisFlip >= 0.7-frameTolerance:
            # keep track of start time/frame for later
            cue.frameNStart = frameN  # exact frame index
            cue.tStart = t  # local t and not account for scr refresh
            cue.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(cue, 'tStartRefresh')  # time at next scr refresh
            cue.setAutoDraw(True)
        if cue.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > cue.tStartRefresh + 0.2-frameTolerance:
                # keep track of stop time/frame for later
                cue.tStop = t  # not accounting for scr refresh
                cue.frameNStop = frameN  # exact frame index
                win.timeOnFlip(cue, 'tStopRefresh')  # time at next scr refresh
                cue.setAutoDraw(False)
        
        # *target* updates
        if target.status == NOT_STARTED and tThisFlip >= 0.9-frameTolerance:
            # keep track of start time/frame for later
            target.frameNStart = frameN  # exact frame index
            target.tStart = t  # local t and not account for scr refresh
            target.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(target, 'tStartRefresh')  # time at next scr refresh
            target.setAutoDraw(True)
        # *resp* updates
        if resp.status == NOT_STARTED and t >= 0.9-frameTolerance:
            # keep track of start time/frame for later
            resp.frameNStart = frameN  # exact frame index
            resp.tStart = t  # local t and not account for scr refresh
            resp.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(resp, 'tStartRefresh')  # time at next scr refresh
            resp.status = STARTED
            resp.mouseClock.reset()
            prevButtonState = resp.getPressed()  # if button is down already this ISN'T a new click
        if resp.status == STARTED:  # only update if started and not finished!
            buttons = resp.getPressed()
            if buttons != prevButtonState:  # button state changed?
                prevButtonState = buttons
                if sum(buttons) > 0:  # state changed to a new click
                    # check if the mouse was inside our 'clickable' objects
                    gotValidClick = False
                    for obj in [target]:
                        if obj.contains(resp):
                            gotValidClick = True
                            resp.clicked_name.append(obj.name)
                    if gotValidClick:  # abort routine on response
                        continueRoutine = False
        
        # check for quit (typically the Esc key)
        if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
            core.quit()
        
        # check if all components have finished
        if not continueRoutine:  # a component has requested a forced-end of Routine
            break
        continueRoutine = False  # will revert to True if at least one component still running
        for thisComponent in trialComponents:
            if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                continueRoutine = True
                break  # at least one component has not yet finished
        
        # refresh the screen
        if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
            win.flip()
    
    # -------Ending Routine "trial"-------
    for thisComponent in trialComponents:
        if hasattr(thisComponent, "setAutoDraw"):
            thisComponent.setAutoDraw(False)
    trials.addData('fixation.started', fixation.tStartRefresh)
    trials.addData('fixation.stopped', fixation.tStopRefresh)
    trials.addData('cue.started', cue.tStartRefresh)
    trials.addData('cue.stopped', cue.tStopRefresh)
    trials.addData('target.started', target.tStartRefresh)
    trials.addData('target.stopped', target.tStopRefresh)
    # store data for trials (TrialHandler)
    x, y = resp.getPos()
    buttons = resp.getPressed()
    if sum(buttons):
        # check if the mouse was inside our 'clickable' objects
        gotValidClick = False
        for obj in [target]:
            if obj.contains(resp):
                gotValidClick = True
                resp.clicked_name.append(obj.name)
    trials.addData('resp.x', x)
    trials.addData('resp.y', y)
    trials.addData('resp.leftButton', buttons[0])
    trials.addData('resp.midButton', buttons[1])
    trials.addData('resp.rightButton', buttons[2])
    if len(resp.clicked_name):
        trials.addData('resp.clicked_name', resp.clicked_name[0])
    trials.addData('resp.started', resp.tStart)
    trials.addData('resp.stopped', resp.tStop)
    # the Routine "trial" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset()
    thisExp.nextEntry()
    
# completed 1 repeats of 'trials'


# ------Prepare to start Routine "end"-------
continueRoutine = True
# update component parameters for each repeat
# setup some python lists for storing info about the endClick
endClick.clicked_name = []
gotValidClick = False  # until a click is received
# keep track of which components have finished
endComponents = [endMsg, endButton, endClick]
for thisComponent in endComponents:
    thisComponent.tStart = None
    thisComponent.tStop = None
    thisComponent.tStartRefresh = None
    thisComponent.tStopRefresh = None
    if hasattr(thisComponent, 'status'):
        thisComponent.status = NOT_STARTED
# reset timers
t = 0
_timeToFirstFrame = win.getFutureFlipTime(clock="now")
endClock.reset(-_timeToFirstFrame)  # t0 is time of first possible flip
frameN = -1

# -------Run Routine "end"-------
while continueRoutine:
    # get current time
    t = endClock.getTime()
    tThisFlip = win.getFutureFlipTime(clock=endClock)
    tThisFlipGlobal = win.getFutureFlipTime(clock=None)
    frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
    # update/draw components on each frame
    
    # *endMsg* updates
    if endMsg.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        endMsg.frameNStart = frameN  # exact frame index
        endMsg.tStart = t  # local t and not account for scr refresh
        endMsg.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(endMsg, 'tStartRefresh')  # time at next scr refresh
        endMsg.setAutoDraw(True)
    
    # *endButton* updates
    if endButton.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        endButton.frameNStart = frameN  # exact frame index
        endButton.tStart = t  # local t and not account for scr refresh
        endButton.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(endButton, 'tStartRefresh')  # time at next scr refresh
        endButton.setAutoDraw(True)
    # *endClick* updates
    if endClick.status == NOT_STARTED and t >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        endClick.frameNStart = frameN  # exact frame index
        endClick.tStart = t  # local t and not account for scr refresh
        endClick.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(endClick, 'tStartRefresh')  # time at next scr refresh
        endClick.status = STARTED
        endClick.mouseClock.reset()
        prevButtonState = endClick.getPressed()  # if button is down already this ISN'T a new click
    if endClick.status == STARTED:  # only update if started and not finished!
        buttons = endClick.getPressed()
        if buttons != prevButtonState:  # button state changed?
            prevButtonState = buttons
            if sum(buttons) > 0:  # state changed to a new click
                # check if the mouse was inside our 'clickable' objects
                gotValidClick = False
                for obj in [endButton]:
                    if obj.contains(endClick):
                        gotValidClick = True
                        endClick.clicked_name.append(obj.name)
                if gotValidClick:  # abort routine on response
                    continueRoutine = False
    
    # check for quit (typically the Esc key)
    if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
        core.quit()
    
    # check if all components have finished
    if not continueRoutine:  # a component has requested a forced-end of Routine
        break
    continueRoutine = False  # will revert to True if at least one component still running
    for thisComponent in endComponents:
        if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
            continueRoutine = True
            break  # at least one component has not yet finished
    
    # refresh the screen
    if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
        win.flip()

# -------Ending Routine "end"-------
for thisComponent in endComponents:
    if hasattr(thisComponent, "setAutoDraw"):
        thisComponent.setAutoDraw(False)
thisExp.addData('endMsg.started', endMsg.tStartRefresh)
thisExp.addData('endMsg.stopped', endMsg.tStopRefresh)
thisExp.addData('endButton.started', endButton.tStartRefresh)
thisExp.addData('endButton.stopped', endButton.tStopRefresh)
# store data for thisExp (ExperimentHandler)
x, y = endClick.getPos()
buttons = endClick.getPressed()
if sum(buttons):
    # check if the mouse was inside our 'clickable' objects
    gotValidClick = False
    for obj in [endButton]:
        if obj.contains(endClick):
            gotValidClick = True
            endClick.clicked_name.append(obj.name)
thisExp.addData('endClick.x', x)
thisExp.addData('endClick.y', y)
thisExp.addData('endClick.leftButton', buttons[0])
thisExp.addData('endClick.midButton', buttons[1])
thisExp.addData('endClick.rightButton', buttons[2])
if len(endClick.clicked_name):
    thisExp.addData('endClick.clicked_name', endClick.clicked_name[0])
thisExp.addData('endClick.started', endClick.tStart)
thisExp.addData('endClick.stopped', endClick.tStop)
thisExp.nextEntry()
# the Routine "end" was not non-slip safe, so reset the non-slip timer
routineTimer.reset()

# Flip one final time so any remaining win.callOnFlip() 
# and win.timeOnFlip() tasks get executed before quitting
win.flip()

# these shouldn't be strictly necessary (should auto-save)
thisExp.saveAsWideText(filename+'.csv', delim='auto')
thisExp.saveAsPickle(filename)
logging.flush()
# make sure everything is closed down
thisExp.abort()  # or data files will save again on exit
win.close()
core.quit()
