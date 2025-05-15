import mongoose from "mongoose"; // Import Mongoose ORM

// Define the schema for storing paper-related information
const PaperSchema = new mongoose.Schema({
  "College Name": { type: String, required: true }, // Name of the college
  "Branch": { type: String, required: true }, // Branch of study (e.g., Computer Science, Mechanical)
  "Year Of Study": { type: String, required: true }, // Year of study (First, Second, etc.)
  "Semester": { type: String, required: true }, // Semester number (1st, 2nd, etc.)
  "Course Name": { type: String, required: true }, // Name of the course
  "Course Code": { type: String, required: true }, // Unique identifier for the course
  "Course Teacher": { type: String, required: true }, // Name of the teacher handling the course
  "No. Of Questions": { type: String, required: true }, // Total number of questions in the paper
  "Total Marks": { type: String, required: true }, // Maximum marks of the exam paper
  "Sequence": [], // Array to store question sequence
  "Collected Data": [], // Array to store collected answers or metadata
}); 

// Create a model from the schema to interact with the database
const PaperInfo = mongoose.model('PaperInfo', PaperSchema);

export default PaperInfo; // Export the model for use in other parts of the application
