
// weights in percentage
let BT_Weights={
    1:20,
    2:30,
    3:40,
    4:10,
    5:0,
    6:0, 
};

let ModuleWeights={}


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
        let percentage=((+item.M)/sum);
        item.M=percentage;
    });

    return seqData;
}

exports.Evaluate=(FormData,SequenceData,sequence)=>{

    let predata=()=>{
        let data={
            1:{
                bloom:"Analysis",
                score:30
            },
            2:{
                bloom:"Understanding",
                score:30
            },
            2:{
                bloom:"Applying",
                score:30
            },
        }
    }

    // Find Blooms Level of all the COs
    let CO_BT_Level={}
    CO_BT_Level[1]=FindBloomLevelsInText(FormData.CO1).highestLevel;
    CO_BT_Level[2]=FindBloomLevelsInText(FormData.CO2).highestLevel;
    CO_BT_Level[3]=FindBloomLevelsInText(FormData.CO3).highestLevel;


    // Module Hrs
    let Module_Hrs=FormData["Hours per module (1 to 6 space seperated) "].split(" ");
    let totalHrs=0;
    Module_Hrs.map(i=>{
        totalHrs+=(+i)
    })

    Module_Hrs.map((v,i)=>{
        ModuleWeights[i+1]=(+v)/totalHrs*100;
        // console.log(i+1,ModuleWeights[i+1]);
    })

    

    SequenceData=Normalize(SequenceData)

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
        Module_Map[moduleNumber]=0;
        CO_Map[i.CO]=0;
        BT_Map[i["Bloom's Taxonomy Level"]]=0;
    })

    let QP=0,C1=0,C2=0,C3=0,C4=0;

    SequenceData.map(i=>{
        let LM=0,HM=0,LR=0,HR=0;
        let D=i["Bloom's Taxonomy Level"]-CO_BT_Level[i.CO];

        if(D==0){
            LR++;
        } else if(D==-1){
            LM++;
        } else if(D>=1){
            HR++;
        } else {
            HM++;
        }

        QP=QP-LM-(2*HM)+LR+(2*HR);

        // Adding BT value for current Question
        C1+=BT_Weights[i["Bloom's Taxonomy Level"]]*(+i.M);


        // Adding Module value for current Question
        // Find Modulenumber and increment the counter
        let numericalValue = i.Module.match(/\d+\.\d+|\d+/);
        let moduleNumber=0;
        // Check if numericalValue is found
        if (numericalValue) {
            // Convert the found value to a number
            moduleNumber = parseFloat(numericalValue[0]);
        }
        C2+=ModuleWeights[moduleNumber]*(+i.M);

        // Adding CO value for current Question
        // get CO number from the CO string
        let CO_num_Value = i.CO.match(/\d+\.\d+|\d+/);
        let CONumber=0;
        // Check if numericalValue is found
        if (CO_num_Value) {
            // Convert the found value to a number
            CONumber = parseFloat(CO_num_Value[0]);
        }
        C3+=BT_Weights[CO_BT_Level[CONumber]]*(+i.M);



        // -------- Maintaining count for BT,Module,CO and QT -------
        QT_Map[i["Question Type"]]++;
        Module_Map[moduleNumber]++;
        CO_Map[i.CO]++;
        BT_Map[i["Bloom's Taxonomy Level"]]++;
    })
    

    // console.log(QP,C1,C2,C3)
}