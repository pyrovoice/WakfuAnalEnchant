var results = [];

for (let t = 0; t < 1000; t++){
    //First charge is free witht he roll of the item
    var nbrChargeNeeded = -1

    var currentSlots = []

    do{
        nbrChargeNeeded++
        //Use charge for number while number isn't 4
        if(currentSlots.length < 4){
            var nbrSlotToAdd = getRandomSlotsNumber() - currentSlots.length
            for(let i = 0; i < nbrSlotToAdd; i++){
                currentSlots.push(getRandomSlotValue())
            }
        }
        //Use charge for colors while colors aren't all 0 or joker
        else{
            var newSlots = []
            for(let i = 0; i < 4; i++){
                newSlots.push(getRandomSlotValue())
            }
            currentSlots = newSlots

        }
    }while(!isCurrentSlots3Red1BlueAnyJoker());
    results.push(nbrChargeNeeded)
}
const average = results.reduce((a, b) => a + b) / results.length;
results.sort((a, b) => a - b);
const middleIndex = Math.floor(results.length / 2);
const median = results[middleIndex]
var distribution = []
for (let i = 0; i < Math.max.apply(Math, results)+1; i++){
    const countOccurrences = results.reduce((a, v) => (v === i ? a + 1 : a), 0);
    distribution.push(countOccurrences)
}
var arraylength = Math.floor(Math.max.apply(Math, results)/6) + (Math.max.apply(Math, results)%6!=0? 1:0)
var itemUsedDistribution = new Array(120).fill(0);
for (let i = 0; i < results.length; i++){
    var itemUsedNbr = Math.floor(results[i]/6) + (results[i]%6!=0? 1:0) + 1 //original item
    itemUsedDistribution[itemUsedNbr] += 1
}
const averageItem = itemUsedDistribution.reduce((sum, val, index) => sum += (val*index)) / 1000;
console.log(results.toString())
console.log("=====")
console.log(distribution.toString())
console.log("=====")
console.log(itemUsedDistribution.toString())
console.log("=====")
console.log("Average charge spent: " + average + ";Median charge spent: " + median) 
console.log("Average item needed: " + averageItem) 


function isCurrentSlots3Red1BlueAnyJoker(){
    if (currentSlots.length < 4){
        return false
    }
    let countR = 0
    let countU = 0
    let countJoker = 0
    currentSlots.forEach(s => {
        if(s == 1){
            countR++
        }
        if(s == 2){
            countU++
        }
        if(s == 3){
            countJoker++
        }
    })
    if(countU >1){
        return false
    }
    return countR+countU+countJoker == 4
}
function getRandomSlotsNumber(){
    var slotNumber = 0
    var roll = Math.floor(Math.random() * 100);
    if (roll < 20){
        slotNumber = 1
    }else if(roll < 65){
        slotNumber = 2
    }else if(roll < 90){
        slotNumber = 3
    }else{
        slotNumber = 4
    }
    return slotNumber
}

//0 red, 1 green, 2 blue, 3 joker
function getRandomSlotValue(){
    var roll = Math.floor(Math.random() * 100);
    if (roll < 30){
        return 0
    }else if(roll < 60){
        return 1
    }else if(roll < 90){
        return 2
    }else{
        return 3
    }
}