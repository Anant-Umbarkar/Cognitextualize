
// weights in percentage
let BT_Weights={
    1:{ level: 0, weights: 0,marks:0,BT_penalty:0, No_Of_Questions:0 },
    2:{ level: 0, weights: 0,marks:0,BT_penalty:0, No_Of_Questions:0 },
    3:{ level: 0, weights: 0,marks:0,BT_penalty:0, No_Of_Questions:0 },
    4:{ level: 0, weights: 0,marks:0,BT_penalty:0, No_Of_Questions:0 },
    5:{ level: 0, weights: 0,marks:0,BT_penalty:0, No_Of_Questions:0 },
    6:{ level: 0, weights: 0,marks:0,BT_penalty:0, No_Of_Questions:0 }, 
};

let ModuleWeights=[];


const { FindBloomLevelsInText } = require("../Regex/Regex")

function Normalize(seqData){
    let sum=0;

    seqData.map(item=>{
        sum+=(+item.M)
    });

    if(sum==100){
        return seqData;
    }

    seqData.map(item=>{
        let percentage=((+item.M)/sum)*100;
        item.M=percentage;
    });

    return seqData;
}

exports.Evaluate=(FormData,SequenceData,sequence,pre_data,Module_Hrs)=>{

    // Convert object to array of [key, value] pairs
    let dataArray = Object.entries(pre_data);

    // Sort array based on the score property of each object
    dataArray.sort((a, b) => {
        if (a[1].score !== b[1].score) {
            return b[1].score - a[1].score; // Sort by score descending
        } else {
            return a[1].level - b[1].level; // Sort by level ascending
        }
    });

    dataArray.map((item,i)=>{
        // can add score using folllowing line
        BT_Weights[item[1].level]={
            level:i+1,
            weights:item[1].score,
            marks:0,
            BT_penalty:0,
            No_Of_Questions:0
        };
        // BT_Weights[item[1].level]=i+1;
    });



    // Convert object to array of [key, value] pairs
    let BT_Final = Object.entries(pre_data);

    // Sort array based on the score property of each object
    BT_Final.sort((a, b) => {
        if (a[1].score !== b[1].score) {
            return b[1].score - a[1].score; // Sort by score descending
        } else {
            return a[1].level - b[1].level; // Sort by level ascending
        }
    });

    // Map sorted data to BT_Weights object
    BT_Final.forEach((item, i) => {
        BT_Weights[item[1].level] = {
            level:i+1,
            weights:item[1].score,
            marks:0,
            BT_penalty:0,
            No_Of_Questions:0,
        };;
    });

    // Set level to length of pre_data + 1 for any levels that were not present in pre_data
    let lowestLevel=Object.keys(pre_data).length + 1;
    for (let key in BT_Weights) {
        if (BT_Weights[key].level === 0) {
            BT_Weights[key].level = Object.keys(pre_data).length + 1;
        }
    }



    // Find Blooms Level of all the COs
    // let CO_BT_Level={}
    // CO_BT_Level[1]=FindBloomLevelsInText(FormData.CO1).highestLevel;
    // CO_BT_Level[2]=FindBloomLevelsInText(FormData.CO2).highestLevel;
    // CO_BT_Level[3]=FindBloomLevelsInText(FormData.CO3).highestLevel;


    // Module Hrs

    let totalHrs=0;
    Module_Hrs.map(i=>{
        totalHrs+=(+i)
    })

    Module_Hrs.map((v,i)=>{
        let newObj={
            expected:(+v)/totalHrs*100,
            actual:0,
        }
        ModuleWeights=[...ModuleWeights,newObj];
        // console.log(i+1,ModuleWeights[i+1]);
    })
    
    console.log(ModuleWeights)
    SequenceData=Normalize(SequenceData)

    // let sum=0;

    // seqData.map(item=>{
    //     sum+=(+item.M)
    // });

    // create map of Question type
    let QT_Map={};
    let CO_Map={};
    let Module_Map={};
    let BT_Map={};
    SequenceData.map(i=>{
        QT_Map[i["Question Type"]]=0;
        let numericalValue = i.Module.match(/\d+\.\d+|\d+/);
        let moduleNumber=0;
        // Check if numericalValue is found
        if (numericalValue) {
            // Convert the found value to a number
            moduleNumber = parseFloat(numericalValue[0]);
        }

        // get the co in number
        let co=parseInt(i.CO.match(/\d+/)[0]);

        Module_Map[moduleNumber]=0;
        CO_Map[co]=0;
        BT_Map[BT_Weights[i["Bloom's Taxonomy Level"]].level]=0;
    })

    let QP=0,C1=0,C2=0,C3=0,C4=0,penaltyCtr=0;
    // console.log(BT_Weights)
    SequenceData.map(i=>{
        let LM=0,HM=0,LR=0,HR=0;
        // let D=BT_Weights[i["Bloom's Taxonomy Level"]].level-BT_Weights[i.CO].level;
        let co=parseInt(i.CO.match(/\d+/)[0]);
        // console.log(i["Bloom's Taxonomy Level"],BT_Weights[i["Bloom's Taxonomy Level"]].level,BT_Weights[co].level);

        let D=BT_Weights[i["Bloom's Taxonomy Level"]].level-BT_Weights[co].level;
        // console.log(D);
        if(D==0 || D==-1){
            LR++;
        } else if(D<-1){
            HR++;
        } else if(D>1){
            HM++;
        } else if(D==1){
            LM++;
        }

        QP=QP+(-LM-(2*HM)+LR+(2*HR));

        // Adding BT value for current Question
        BT_Weights[i["Bloom's Taxonomy Level"]].marks+=(+i.M);
        BT_Weights[i["Bloom's Taxonomy Level"]].No_Of_Questions++;
        // console.log(co)
        CO_Map[co]+=(+i.M);



        // // Adding Module value for current Question
        // // Find Modulenumber and increment the counter
        let numericalValue = i.Module.match(/\d+\.\d+|\d+/);
        let moduleNumber=0;
        // Check if numericalValue is found
        if (numericalValue) {
            // Convert the found value to a number
            moduleNumber = parseFloat(numericalValue[0]);
        }
        ModuleWeights[moduleNumber-1].actual+=(+i.M);

        // // Adding CO value for current Question
        // // get CO number from the CO string
        // let CO_num_Value = i.CO.match(/\d+\.\d+|\d+/);
        // let CONumber=0;
        // // Check if numericalValue is found
        // if (CO_num_Value) {
        //     // Convert the found value to a number
        //     CONumber = parseFloat(CO_num_Value[0]);
        // }
        // C3+=BT_Weights[CO_BT_Level[CONumber]]*(+i.M);



        // // -------- Maintaining count for BT,Module,CO and QT -------
        // QT_Map[i["Question Type"]]++;
        // Module_Map[moduleNumber]++;
        // CO_Map[i.CO]++;
        // BT_Map[i["Bloom's Taxonomy Level"]]++;
    });

    // QP best
    let QPHigh=0,lr=0,hr=0;
    for(let i=0;i<6;i++){
        let item=BT_Weights[i+1];
        let temp=item.level-1;
        if(temp==1){
            lr++;
        } else if(temp>1){
            hr++;
        } else {
            continue;
        }
    }
    QPHigh+=lr+(2*hr);

    // QP worst
    let QPLow=0,lm=0,hm=0;
    for(let i=0;i<6;i++){
        let item=BT_Weights[i+1];
        let temp=(lowestLevel)-item.level;
        if(temp==1){
            lm++;
        } else if(temp>1){
            hm++;
        } else {
            continue;
        }
    }
    QPLow+=lm+(2*hm);
    QPLow*=-1;
    if(QP>QPHigh){
        QP=QPHigh
    }
    if(QP<QPLow){
        QP=QPLow
    }
    let QP_Final=((QP-QPLow)/(QPHigh-QPLow))*100

    // calculate C1 penalty 
    for(let i=0;i<6;i++){
        let item=BT_Weights[i+1];
        if(item.weights!=0 && item.marks==0){
            penaltyCtr++;
        } else {
            let diff=(item.weights-item.marks)/item.weights;
            if(diff>0){
                item.BT_penalty=diff;
                C1+=diff;
            }
        }
    }

    // C2
    ModuleWeights.map(item=>{
        let diff=(item.expected-item.actual)/item.expected;
        if(diff>=0){
            C2+=diff;
        }
    });   
    // console.log(C2)

    // C3
    dataArray.map(item=>{
        console.log(item[1].score,CO_Map[item[0]])
        let diff=(item[1].score-CO_Map[item[0]])/item[1].score;

        if(diff>0){
            C3+=diff;
        }
    });

    let P_Final=(C1+C2+C3);
    let PF_Percentage=(P_Final/3)*100;
    let FinalScore=(QP_Final+PF_Percentage)/2;
    console.log(lowestLevel,QPLow,QPHigh,QP_Final,QP,P_Final,PF_Percentage,FinalScore)
    console.log(C1,C2,C3)
    console.log(dataArray,pre_data,BT_Weights)
}   