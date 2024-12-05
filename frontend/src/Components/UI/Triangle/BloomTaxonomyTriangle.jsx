import React from 'react';
import './Tri.css'; // Assuming styles are stored here

// Data representation of Bloom's Taxonomy Levels
// const data = {
//   1: { level: 5, weights: 50, marks: 0, BT_penalty: 0, No_Of_Questions: 0 },
//   2: { level: 2, weights: 30, marks: 0, BT_penalty: 0, No_Of_Questions: 0 },
//   3: { level: 1, weights: 20, marks: 0, BT_penalty: 0, No_Of_Questions: 0 },
//   4: { level: 3, weights: 0, marks: 0, BT_penalty: 0, No_Of_Questions: 0 },
//   5: { level: 6, weights: 0, marks: 0, BT_penalty: 0, No_Of_Questions: 0 },
//   6: { level: 4, weights: 0, marks: 0, BT_penalty: 0, No_Of_Questions: 0 }
// };

// Bloom's Taxonomy level names
const bloomLevelNames = {
  1: 'Remembering',
  2: 'Understanding',
  3: 'Applying',
  4: 'Analyzing',
  5: 'Evaluating',
  6: 'Creating'
};

// Define Bloom's level colors (highlight color)
const highlightColor = '#e67e22'; // Orange for highlighting

// Accept highlightedLevel as a prop
const BloomTaxonomyTriangle = ({ data,label,highlightedLevel }) => {
  // Filter and sort the levels with non-zero level values
  // console.log(data);

  const levelsWithUpdatedPositions = Object.keys(data)
    .filter(key => data[key].level !== 0) // Only include non-zero level items
    .sort((a, b) => data[a].level - data[b].level); // Sort by updated level
  
  // console.log(levelsWithUpdatedPositions);
  // console.log(highlightedLevel)

  // Combine levels for rendering
  const orderedLevels = levelsWithUpdatedPositions;

  // Calculate height per level
  const heightPerLevel = 400 / 6; // Divide total height by number of levels
  const labelYPosition = 430; // Y position for the label (adjust as needed)

  return (
    <div className="svg-container">
      <svg width="400" height="500" viewBox="0 0 400 500">
        {orderedLevels.map((key, index) => {
          let currentLevel = data[key].level; // Use the level directly
          if(data[key].weights==0){
            currentLevel=key;
          }
          const levelName = bloomLevelNames[currentLevel]; // Get Bloom's Taxonomy name

          // Calculate position for each rectangular level
          const yPosition = 400 - (index + 1) * heightPerLevel; // Position from bottom to top

          // Determine background color based on whether it's the highlighted level
          console.log(label,currentLevel,highlightedLevel)
          const levelColor = currentLevel == highlightedLevel ? highlightColor : '#7f8c8d'; // Grey for other levels

          return (
            <g key={key}>
              {/* Draw the level's rectangular part */}
              <rect
                x="50"
                y={yPosition}
                width={300} // Fixed width for rectangle
                height={heightPerLevel}
                fill={levelColor}
              />
              {/* Draw the level's text */}
              <text
                x="200"
                y={yPosition + heightPerLevel / 2}
                fontSize="16"
                fill="white"
                fontWeight="bold"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {levelName}
              </text>
            </g>
          );
        })}
        {/* Draw the overall label at the bottom */}
        <text
          x="200"
          y={labelYPosition}
          fontSize="18"
          fill="white"
          fontWeight="bold"
          textAnchor="middle"
        >
          {label}
        </text>
      </svg>
    </div>
  );
};

export default BloomTaxonomyTriangle;
