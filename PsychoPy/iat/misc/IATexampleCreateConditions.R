##some example code for creating conditions files with R
## here for IAT experiment, Workshop (Online-)Experimenting (2021_01_19/26)
## last changed 2021_01_18 kb
setwd("...")

words <- c("dragon", "troll", "cyclops", "beetle", "dolphin", "horse",
           "abstract", "universal", "general", "specific", "detailed", "defined")
types <- c("creature", "feature")
targetlevels <- c("abstract", "concrete")
keys <- c("i", "e")
mapping <- c("incongruent", "congruent")
           
congruentConds <- data.frame(
  targetWord =  words,
  targetType = rep(types, each=6),
  targetCond = rep(condLev, each = 3, times = 2),
  corrKey    = rep(keys, each = 3, times = 2),
  mapping    = "congruent"
)
              
congruentConds ##check!
write.csv(congruentConds,"ConditionsCongruent.csv", quote=FALSE, row.names = FALSE)

incongruentConds <- congruentConds
incongruentConds[incongruentConds$targetType=="feature",]$corrKey <- rep(c("e","i"), each = 3)
incongruentConds$mapping = "incongruent"

incongruentConds
write.csv(incongruentConds,"ConditionsIncongruent.csv", quote=FALSE, row.names = FALSE)
