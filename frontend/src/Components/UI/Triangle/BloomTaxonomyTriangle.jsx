import React from 'react';
import './Tri.css'; // Assuming styles are stored here

// Bloom's Taxonomy level names with numeric keys
const bloomLevelNames = {
  6: 'Remembering',
  5: 'Understanding',
  4: 'Applying',
  3: 'Analyzing',
  2: 'Evaluating',
  1: 'Creating'
};

// Define Bloom's level highlightlevelsWithUpdatedPositions color (orange)
const highlightColor = '#3366ff';

const BloomTaxonomyTriangle = ({ data, label, highlightedLevel }) => {
  // Convert data to an array of [key, value] pairs, filtering out items with level "0"
  const levelsWithUpdatedPositions = Object.entries(data)
    .filter(([key, item]) => item.level !== "0")
    .sort(([, a], [, b]) => Number(b.level) - Number(a.level));

  console.log(levelsWithUpdatedPositions)

  // Calculate height per level based on a fixed total height (400) divided by 6 levels
  const heightPerLevel = 400 / 6;
  const labelYPosition = 430; // Adjust Y-position for the overall label as needed

  return (
    <div className="svg-container">
      <svg width="400" height="500" viewBox="0 0 400 500">
        {levelsWithUpdatedPositions.map(([key, levelData], index) => {
          // Determine the "currentLevel". If weights is 0, fallback to the key
          let currentLevel = key;

          // Coerce currentLevel to a number for lookup in bloomLevelNames
          const levelName = bloomLevelNames[Number(currentLevel)];
          console.log(index,key,Number(currentLevel),levelName)
          // Calculate the y-position for this level (positioning from bottom to top)
          const yPosition = 400 - (index + 1) * heightPerLevel;
          
          // Determine the fill color based on whether the current level matches the highlighted level.
          const levelColor =
            Number(currentLevel) === Number(highlightedLevel)
              ? highlightColor
              : '#85a3ff';

          return (
            <g key={key}>
              <rect
                x="50"
                y={yPosition}
                width="300" // Fixed rectangle width
                height={heightPerLevel}
                fill={levelColor}
              />
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
        {/* Overall label displayed at the bottom */}
        <text
          x="200"
          y={labelYPosition}
          fontSize="18"
          fill="black"
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
