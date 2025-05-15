// Function to normalize sequence data so that the sum of M values equals 100
function Normalize(seqData){
    let updatedData = seqData.map(item => ({...item}));
    let sum=0;
    
    // Calculate total sum of M values
    updatedData.map(item=>{
        sum+=(+item.Marks)
    });

    // If already 100, return as is
    if(sum==100){
        return updatedData;
    }

    // Normalize values to ensure total equals 100
    updatedData.map(item=>{
        let percentage=((+item.Marks)/sum)*100;
        item.Marks=percentage;
    });

    return updatedData;
}

function Evaluate(structurizedData,pre_data,Module_Hrs){
    
    let updated_structurizedData

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

    // Convert object to array of [key, value] pairs
    let dataArray = Object.entries(pre_data);

    // [
    //     [ '1', { level: 2, score: 50 } ],
    //     [ '2', { level: 3, score: 30 } ],
    //     [ '3', { level: 4, score: 20 } ]
    //   ]

    // console.log("******************",dataArray)

    // Sort array based on the score property of each object
    dataArray.sort((a, b) => {
        if (a[1].score !== b[1].score) {
            return b[1].score - a[1].score; // Sort by score descending
        } else {
            return a[1].level - b[1].level; // Sort by level ascending
        }
    });

    // console.log(dataArray)

    dataArray.map((item,i)=>{
        // can add score using folllowing line
        // assigning new order to bloom's taxonomy level and setting the weights to
        // levels present in the CO
        BT_Weights[item[1].level]={
            level:i+1,
            weights:item[1].score,
            marks:0,
            BT_penalty:0,
            No_Of_Questions:0
        };
        // BT_Weights[item[1].level]=i+1;
    });

    // -----------------------------
    // THE CODE BELOW IS REPEATED

    // // Convert object to array of [key, value] pairs
    // let BT_Final = Object.entries(pre_data);

    // Sort array based on the score property of each object
    // BT_Final.sort((a, b) => {
    //     if (a[1].score !== b[1].score) {
    //         return b[1].score - a[1].score; // Sort by score descending
    //     } else {
    //         return a[1].level - b[1].level; // Sort by level ascending
    //     }
    // });

    // // Map sorted data to BT_Weights object
    // BT_Final.forEach((item, i) => {
    //     BT_Weights[item[1].level] = {
    //         level:i+1,
    //         weights:item[1].score,
    //         marks:0,
    //         BT_penalty:0,
    //         No_Of_Questions:0,
    //     };
    // });

    // -----------------------------

    // console.log(BT_Weights);

    // Set level to length of pre_data + 1 for any levels that were not present in pre_data
    let lowestLevel=Object.keys(pre_data).length + 1;
    let l_level=lowestLevel
    for (let key in BT_Weights) {
        if (BT_Weights[key].level === 0) {
            BT_Weights[key].level = l_level++;  // CHANGED THIS LINE
        }
    }

    // console.log(BT_Weights)


    // Find Blooms Level of all the COs
    let CO_BT_Level={}
    // CO_BT_Level[1]=FindBloomLevelsInText(FormData.CO1).highestLevel;
    // CO_BT_Level[2]=FindBloomLevelsInText(FormData.CO2).highestLevel;
    // CO_BT_Level[3]=FindBloomLevelsInText(FormData.CO3).highestLevel;


    // Module Hrs
    let checkModule=true;
    if(Module_Hrs.length==1 && Module_Hrs[0]==0){
        checkModule=false;
    }

    // If the module information is given
    if(checkModule){

        let totalHrs=0;
        Module_Hrs.map(i=>{
            totalHrs+=(+i)
        })

        // get the percentage contribution of modules
        Module_Hrs.map((v,i)=>{
            let newObj={
                expected:((+v)/totalHrs)*100,
                actual:0,
            }
            ModuleWeights.push(newObj);
            // console.log(i+1,ModuleWeights[i+1]);
        })
    
    }

    // Get normalized data
    updated_structurizedData=Normalize(structurizedData)
    // console.log(structurizedData)
    // let sum=0;

    // seqData.map(item=>{
    //     sum+=(+item.M)
    // });

    // create map of Question type
    let QT_Map={};
    let CO_Map={};
    let Module_Map={};
    let BT_Map={};
    updated_structurizedData.map(i=>{
        // console.log(i)

        if(i["Question Type"]){
            QT_Map[i["Question Type"]]=0;
        }
        
        let numericalValue,moduleNumber=0;
        if(checkModule && i.Module){
            numericalValue = i.Module.match(/\d+\.\d+|\d+/);
            // Check if numericalValue is found
            if (numericalValue) {
                // Convert the found value to a number
                moduleNumber = parseFloat(numericalValue[0]);
                Module_Map[moduleNumber]=0;
            }
        }
        

        // get the CO in number from string
        let co=parseInt(i.CO.match(/\d+/)[0]);
        
        CO_Map[co]=0;
        // console.log("----------",i,i["Bloom's Taxonomy Level"],BT_Weights,i["Bloom's Taxonomy Level"],"---------------");
        // Create map of re-organized level to track the number of questions
        if(i["Bloom's Taxonomy Level"]==0) i["Bloom's Taxonomy Level"]=1;
        BT_Map[BT_Weights[i["Bloom's Taxonomy Level"]].level]=0;
    })




    
    // performing main calculation
    let QP=0,C1=0,C2=0,C3=0,C4=0,penaltyCtr=0;
    let newSeqData=updated_structurizedData;
    
    newSeqData.map((i,ind)=>{
        let LM=0,HM=0,LR=0,HR=0;
        // let D=BT_Weights[i["Bloom's Taxonomy Level"]].level-BT_Weights[i.CO].level;
        let co=parseInt(i.CO.match(/\d+/)[0]);
        let QHBTL=BT_Weights[i["Bloom's Taxonomy Level"]].level;
        let COBTL=BT_Weights[co].level;



        // calculating D and adding the reward and penalty
        let D=COBTL-QHBTL;

        if(D==0 || D==-1){
            LR++;
        } else if(D<-1){
            HR++;
        } else if(D>1){
            HM++;
        } else if(D==1){
            LM++;
        }
        
        // Add remark according to the value of D
        if(D==0){
            i["Remark"]="Matches Expected Blooms Level"
        } else if(D<0){
            i["Remark"]="Higher than Expected Blooms Level"
        } else if(D>0){
            i["Remark"]="Lower than Expected Blooms Level"
        }
        
        // Find value of QP according to the given formula
        QP=QP+(-LM-(2*HM)+LR+(2*HR));

        // Adding BT value for current Question
        BT_Weights[i["Bloom's Taxonomy Level"]].marks+=(+i.Marks);
        BT_Weights[i["Bloom's Taxonomy Level"]].No_Of_Questions++;
        // console.log(co)
        CO_Map[co]+=(+i.Marks);

        // Adding Module value for current Question

        if(checkModule && i.Module){
            let numericalValue = i.Module.match(/\d+\.\d+|\d+/);
            let moduleNumber=0;
            // Check if numericalValue is found
            if (numericalValue) {
                // Convert the found value to a number
                moduleNumber = parseFloat(numericalValue[0]);
            }
            let act=ModuleWeights[moduleNumber-1].actual;
            ModuleWeights[moduleNumber-1].actual=(+i.Marks)+act;
        }
        

        // Adding CO value for current Question
        // get CO number from the CO string
        // let CO_num_Value = i.CO.match(/\d+\.\d+|\d+/);
        // let CONumber=0;
        // // Check if numericalValue is found
        // if (CO_num_Value) {
        //     // Convert the found value to a number
        //     CONumber = parseFloat(CO_num_Value[0]);
        // }
        // C3+=BT_Weights[CO_BT_Level[CONumber]]*(+i.M);

        // Maintaining count for BT,Module,CO and QT
        if(i["Question Type"]){
            QT_Map[i["Question Type"]]++;
        }
        if(i.Module){
            Module_Map[i.Module]++;
        }
        CO_Map[i.CO]++;
        BT_Map[i["Bloom's Taxonomy Level"]]++;
    });

    // QP best
    let QPHigh=0,lr=0,hr=0;
    for(let i=0;i<6;i++){
        let item=BT_Weights[i+1];
        let temp=item.level-1;

        // Update the reward counter accordingly
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

        // update the mismatch counters accordingly
        if(temp==1){
            lm++;
        } else if(temp>1){
            hm++;
        } else {
            continue;
        }
    }

    // Find QPLow and QPHigh
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
    let BT_Data=[]
    // Range over all 6 levels
    for(let i=0;i<6;i++){
        let item=BT_Weights[i+1];
        BT_Data.push({expected:item.weights,actual:item.marks})
        if(item.weights!=0 && item.marks==0){
            penaltyCtr++; // increment the penalty counter
        } else {
            // Find the percentage difference
            let diff=(item.weights-item.marks)/item.weights;

            // update the penalty and C1 if the difference is greater than 0
            if(diff>0){
                // LOOK INTO THIS
                BT_Weights[i+1].BT_penalty=diff;
                C1+=diff;
            }
        }
    }

    // C2
    if(checkModule){
        ModuleWeights.map(item=>{
            // Find difference between actual and expected module
            let diff=(item.expected-item.actual)/item.expected;

            // update the C2 if difference is greater than 0
            if(diff>=0){
                C2+=diff;
            }
        });   
    }


    // C3
    let CO_Data=[]
    dataArray.map(item=>{
        CO_Data.push({expected:item[1].score,actual:CO_Map[item[0]]})
        // Find differencce for each CO
        let diff=(item[1].score-CO_Map[item[0]])/item[1].score;
        
        // update C3 if diff is greater than 0
        if(diff>0){
            C3+=diff;
        }
    });


    // Find PF_Percentage depending upon whether the module values
    // are given or not
    let P_Final,PF_Percentage;
    if(checkModule){
        P_Final=(C1+C2+C3);
        PF_Percentage=(P_Final/3)*100;
    } else {
        P_Final=(C1+C3);
        PF_Percentage=(P_Final/2)*100;
    }
    
    // Find the final score
    let FinalScore=(QP_Final+PF_Percentage)/2;

    // DEBUGGING CODE!!!!!

    // console.log(lowestLevel,QPLow,QPHigh,QP_Final,QP,P_Final,PF_Percentage,FinalScore)
    // console.log(C1,C2,C3)
    // console.log(dataArray,pre_data,BT_Weights,CO_Map)
    // console.log(ModuleWeights,BT_Data,CO_Data)


    // Return the expected values
    return {
        QuestionData:structurizedData,
        ModuleData:ModuleWeights,
        BloomsData:BT_Data,
        COData:CO_Data,
        FinalScore:FinalScore,
        updatedBloom: BT_Weights
    }
}   


export default Evaluate;