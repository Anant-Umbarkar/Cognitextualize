import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useSelector } from "react-redux";



const Report = ({formdata,data,updatedBloom}) => {
  console.log(formdata,data,updatedBloom)
  const doc = new jsPDF('landscape', 'mm', 'a4');
  const state=useSelector(state=>state);
  const [con_info,setCOInfo]=useState()
  useEffect(()=>{
    setCOInfo(state.COInfo);
  },[])

  const GetLevel=(coString)=>{
    let CO_int= parseInt(coString.replace("CO", ""), 10);
    // console.log(CO_int)
    // console.log(con_info)
    let found=con_info.find(item=>item.id==CO_int);
    console.log(found)
    // console.log(coString,found.level)
    return parseInt(found.level,10);
  }

  const exportToPDF = () => {

    let ddata={
      "QuestionData": [
        {
          "Question_No": "Q1",
          "Subquestion": "A)",
          "Type": "",
          "Question": "What are Primary Standard? Discuss criteria/Requirements for choosing primary  standard substances towards preperation of standard solutions used in titrimetry.",
          "Marks": "6",
          "CO": "CO3",
          "Module": "Module 1",
          "Bloom's Verbs": "What, Discuss",
          "Bloom's Taxonomy Level": 2
        },
        {
          "Question_No": "Q1",
          "Subquestion": "B)",
          "Type": "",
          "Question": "List different sources of natural water and compare them with respect to Purity,  Impurities present and their significance. --OR-- Define hardness of water? Why it is caused. List different units used to measure hardness of water with interrelation among them.",
          "Marks": "6",
          "CO": "CO2",
          "Module": "Module 2",
          "Bloom's Verbs": "List, compare, Define, Why, List, measure",
          "Bloom's Taxonomy Level": 5
        },
        {
          "Question_No": "Q1",
          "Subquestion": "C)",
          "Type": "",
          "Question": "With neat labeled diagram, discuss Pb-Ag system.",
          "Marks": "6",
          "CO": "CO1",
          "Module": "Module 3",
          "Bloom's Verbs": "diagram, discuss",
          "Bloom's Taxonomy Level": 2
        },
        {
          "Question_No": "Q2",
          "Subquestion": "A)",
          "Type": "",
          "Question": "Define alloy and discuss with example purposes of making alloys.  --OR-- What are carbon steels? How are they classified? Give composition, properties and uses of High Carbon Steel.",
          "Marks": "4",
          "CO": "CO3",
          "Module": "Module 4",
          "Bloom's Verbs": "Define, discuss, What, How, Give",
          "Bloom's Taxonomy Level": 2
        },
        {
          "Question_No": "Q2",
          "Subquestion": "B)",
          "Type": "",
          "Question": "",
          "Marks": "6",
          "CO": "CO3",
          "Module": "Module 4",
          "Bloom's Verbs": "State",
          "Bloom's Taxonomy Level": 1
        },
        {
          "Question_No": "Q3",
          "Subquestion": "A)",
          "Type": "",
          "Question": "With neat labeled diagram discuss constuction and working of TGA equipment. With  proper example describe TGA thermogram. List at least four applications.",
          "Marks": "10",
          "CO": "CO1",
          "Module": "Module 6",
          "Bloom's Verbs": "diagram, discuss, describe, List",
          "Bloom's Taxonomy Level": 2
        },
        {
          "Question_No": "Q3",
          "Subquestion": "B)",
          "Type": "",
          "Question": "Volume of gas burnt at STP = 0.09m3 ii) Mass of water used in time ‘t’ = 24 Kg iii)Temperature of inlet water = 22 0C iv) Temperature of outlet water = 35 0C v) Mass of steam condensed = 0.03 Kg Calculate Higher and Lower calorific value. (Given: Latent heat of condensation of water vapour 587 Kcal/Kg)",
          "Marks": "3",
          "CO": "CO2",
          "Module": "Module 5",
          "Bloom's Verbs": "Calculate",
          "Bloom's Taxonomy Level": 3
        },
        {
          "Question_No": "Q3",
          "Subquestion": "C)",
          "Type": "",
          "Question": "A sample of coal containing 5% hydrogen was tested in Bomb Calorimeter for it’s  calorific value, following data were recorded. Weight of coal burnt= 0.98gm, Acid correction = 55 Cal. Rise in temperature = 2.52 0C, Water equivalent of bomb & calorimeter = 550 gm, Weight of water taken in copper calorimeter = 2200 gm Latent heat of condensation of steam = 587 cal/gm Calculate Gross & Net calorific value.",
          "Marks": "4",
          "CO": "CO2",
          "Module": "Module 5",
          "Bloom's Verbs": "Calculate",
          "Bloom's Taxonomy Level": 3
        },
        {
          "Question_No": "Q3",
          "Subquestion": "D)",
          "Type": "",
          "Question": "DONOT MAKE THIS DOCU PUBLIC SELECT COURSE CODE Dr. Pendse M.H. - Powar A.A. 218 20% (P.T.O.) (P.T.O.)",
          "Marks": "5",
          "CO": "CO2",
          "Module": "Module 2",
          "Bloom's Verbs": "Compare, use",
          "Bloom's Taxonomy Level": 3
        }
      ],
      "ModuleData": [
        {
          "expected": 15.151515151515152,
          "actual": 12
        },
        {
          "expected": 18.181818181818183,
          "actual": 22
        },
        {
          "expected": 15.151515151515152,
          "actual": 12
        },
        {
          "expected": 18.181818181818183,
          "actual": 20
        },
        {
          "expected": 15.151515151515152,
          "actual": 14
        },
        {
          "expected": 18.181818181818183,
          "actual": 20
        }
      ],
      "BloomsData": [
        {
          "expected": 20,
          "actual": 12
        },
        {
          "expected": 30,
          "actual": 52
        },
        {
          "expected": 50,
          "actual": 24
        },
        {
          "expected": 0,
          "actual": 0
        },
        {
          "expected": 0,
          "actual": 12
        },
        {
          "expected": 0,
          "actual": 0
        }
      ],
      "COData": [
        {
          "expected": 50,
          "actual": 32
        },
        {
          "expected": 30,
          "actual": 36
        },
        {
          "expected": 20,
          "actual": 32
        }
      ],
      "FinalScore": 50.96190476190476,
      "updatedBloom": {
        "1": {
          "level": 3,
          "weights": 20,
          "marks": 12,
          "BT_penalty": 0.4,
          "No_Of_Questions": 1
        },
        "2": {
          "level": 2,
          "weights": 30,
          "marks": 52,
          "BT_penalty": 0,
          "No_Of_Questions": 4
        },
        "3": {
          "level": 1,
          "weights": 50,
          "marks": 24,
          "BT_penalty": 0.52,
          "No_Of_Questions": 3
        },
        "4": {
          "level": 4,
          "weights": 0,
          "marks": 0,
          "BT_penalty": 0,
          "No_Of_Questions": 0
        },
        "5": {
          "level": 5,
          "weights": 0,
          "marks": 12,
          "BT_penalty": 0,
          "No_Of_Questions": 1
        },
        "6": {
          "level": 6,
          "weights": 0,
          "marks": 0,
          "BT_penalty": 0,
          "No_Of_Questions": 0
        }
      }
    }

    const bloomLevelNames = {
      6: 'Remembering',
      5: 'Understanding',
      4: 'Applying',
      3: 'Analyzing',
      2: 'Evaluating',
      1: 'Creating'
    };

    let recommendation_data = data.QuestionData.map((item) => {
      let newObj = {
        "Question_Number": item.Question_No,
        "Sub_Question": item.Subquestion,
        "Expected Blooms Taxonomy Level": bloomLevelNames[GetLevel(item.CO)],
        "Actual Blooms Taxonomy Level": bloomLevelNames[parseInt(item["Bloom's Taxonomy Level"], 10)],
        "Recommendation": ""
      };

      let bloom_int = parseInt(item["Bloom's Taxonomy Level"], 10);
      let actual_updated_bt = updatedBloom[bloom_int]?.level;
      let co_level_number = GetLevel(item.CO);
      let expected_updated_bt = updatedBloom[co_level_number]?.level;

      let deviation = expected_updated_bt - actual_updated_bt;
      let level_name = bloomLevelNames[co_level_number];

      newObj.Recommendation = deviation < 0
        ? `You can frame the question from bloom's taxonomy level ${level_name} and above`
        : `Question follows the given standards`;

      return newObj;
    });

    // Convert Bloom's taxonomy level to names
    data.QuestionData.forEach((item, i) => {
      let co_int = GetLevel(item.CO);
      let newBloom = bloomLevelNames[item["Bloom's Taxonomy Level"]];
      data.QuestionData[i]["Bloom's Taxonomy Level"] = newBloom;
    });

    // Question Data Table
    const questionColumns = Array.from(new Set(data.QuestionData.flatMap(item => Object.keys(item))))
      .map(key => ({ header: key, dataKey: key }));

    doc.addImage(
      'https://res.cloudinary.com/dcglxmssd/image/upload/v1745678450/Group_9_n4igdm.png',
      'PNG',
      50, 50, 40, 40
    );

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(50);
    doc.text("Cognitextualize", 100, 77);
    doc.setFontSize(15);
    doc.text("Meta Data:", 10, 137);
    doc.setFont('helvetica', 'normal');
    doc.text(`College Name: ${formdata["College Name"]}`, 10, 144);
    doc.text(`Branch Name: ${formdata["Branch"]}`, 10, 151);
    doc.text(`Year Of Study: ${formdata["Year Of Study"]}`, 10, 158);
    doc.text(`Semester: ${formdata["Semester"]}`, 10, 165);
    doc.text(`Course Name: ${formdata["Course Name"]}`, 10, 172);
    doc.text(`Course Teacher: ${formdata["Course Teacher"]}`, 10, 179);
    doc.text(`Number Of Questions: ${formdata["No. Of Questions"]}`, 10, 186);
    doc.text(`Total Marks: ${formdata["Total Marks"]}`, 10, 193);
    doc.text(`University Name: ${formdata["University Name"]}`, 10, 200);

    doc.addPage();

    doc.setFont('helvetica', 'bold');
    doc.text("Question Data:", 10, 15);

    autoTable(doc, {
      startY: 25,
      columns: questionColumns,
      body: data.QuestionData,
      theme: 'striped',
      styles: { fontSize: 8, overflow: 'linebreak' },
      headStyles: { fillColor: [51, 102, 255] },
    });


    // Helper to add number column and render table
  const addTableWithIndex = (title, dataArray, prefix, columns) => {
    const formattedData = dataArray.map((item, index) => ({
      [`${prefix} No.`]: index + 1,
      ...item
    }));

    // console.log(dataArray)

    const allKeys = Object.keys(formattedData[0]);
    const tableColumns = allKeys.map(key => ({
      header: key,
      dataKey: key
    }));

    doc.addPage();
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text(`${title}:`, 10, 15);

    autoTable(doc, {
      startY: 25,
      columns: tableColumns,
      body: formattedData,
      theme: 'striped',
      styles: { fontSize: 8, cellWidth: 'auto', overflow: 'linebreak' },
      headStyles: { fillColor: [51, 102, 255] },
      didDrawPage: function (data) {
        let pageSize = doc.internal.pageSize;
        let pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
        doc.setFontSize(10);
        doc.text('Page ' + doc.internal.getNumberOfPages(), data.settings.margin.left, pageHeight - 10);
      }
    });
  };

      // Recommendation Table
      doc.addPage();
      const recommendationColumns = Object.keys(recommendation_data[0]).map(key => ({
        header: key,
        dataKey: key
      }));
  
      autoTable(doc, {
        startY: 25,
        columns: recommendationColumns,
        body: recommendation_data,
        theme: 'striped',
        styles: { fontSize: 8, overflow: 'linebreak' },
        headStyles: { fillColor: [51, 102, 255] },
      });

  // Add Module Data Table
  if(data.ModuleData.length>0){
    addTableWithIndex("Module Data", data.ModuleData, "Module");
  }

  // Add Bloom Data Table
  addTableWithIndex("Bloom's Taxonomy Data", data.BloomsData, "Bloom");

  // Add CO Data Table
  addTableWithIndex("CO Data", data.COData, "CO");

  doc.setFont('helvetica', 'bold');
  doc.text(`Final Score:${data.FinalScore}`, 10, 70);



    doc.save("dynamic-report.pdf");
  };

  return (
    <div style={{"width":"100vw",display:"flex",alignItems:"center","justifyContent":"center"}}>
      <button onClick={exportToPDF} style={{"backgroundColor":"#3366ff"}}
        className="btn box-shadow border-white text-white p-3 fs-5">
        Generate Report
      </button>
    </div>
  );
};

export default Report;
