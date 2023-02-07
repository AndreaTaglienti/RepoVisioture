trigger TriggerAIExercise on Account (before insert) {

    for (account a : trigger.new ){
        a.description = a.name + a.industry;
    }

}