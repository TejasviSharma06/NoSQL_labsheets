// BCA Lab Sheet 01: NoSQL Database Design
// MongoDB Shell (mongosh) commands
// Note: Run this file in mongosh. The script uses StudentDB.
// WARNING: Practical 19 drops the Departments collection.
// WARNING: Practical 20 drops the entire StudentDB database.
// These destructive commands are included because they are part of the lab sheet.

print("\nPRACTICAL 1: Create/select StudentDB and verify");
db = db.getSiblingDB("StudentDB");
print("Current database: " + db.getName());
print("Databases:");
printjson(db.adminCommand({ listDatabases: 1 }).databases.map(x => x.name));

print("\nPRACTICAL 2: Create Students, Faculty, and Courses collections");
for (const name of ["Students", "Faculty", "Courses"]) {
  if (!db.getCollectionNames().includes(name)) db.createCollection(name);
}
printjson(db.getCollectionNames());

print("\nPRACTICAL 3: Insert one student document");
db.Students.insertOne({
  RollNo: 101,
  Name: "Aarav Sharma",
  Department: "Computer Science",
  Semester: 5,
  CGPA: 8.7
});
printjson(db.Students.findOne({ RollNo: 101 }));

print("\nPRACTICAL 4: Insert multiple student documents");
db.Students.insertMany([
  { RollNo: 102, Name: "Priya Verma", Department: "Computer Science", Semester: 5, CGPA: 9.1 },
  { RollNo: 103, Name: "Rahul Singh", Department: "Information Technology", Semester: 5, CGPA: 7.8 },
  { RollNo: 104, Name: "Neha Gupta", Department: "Computer Science", Semester: 4, CGPA: 8.4 },
  { RollNo: 105, Name: "Kabir Mehta", Department: "Commerce", Semester: 5, CGPA: 8.0 }
]);
print("Inserted multiple student documents.");

print("\nPRACTICAL 5: Display all student documents");
printjson(db.Students.find({}).toArray());

print("\nPRACTICAL 6: Find a student by RollNo");
printjson(db.Students.find({ RollNo: 102 }).toArray());

print("\nPRACTICAL 7: Find students by Department");
printjson(db.Students.find({ Department: "Computer Science" }).toArray());

print("\nPRACTICAL 8: Show only Name and Department");
printjson(db.Students.find({}, { _id: 0, Name: 1, Department: 1 }).toArray());

print("\nPRACTICAL 9: Update department of one student using updateOne()");
printjson(db.Students.updateOne(
  { RollNo: 103 },
  { $set: { Department: "Computer Science" } }
));
printjson(db.Students.findOne({ RollNo: 103 }));

print("\nPRACTICAL 10: Update semester for a department using updateMany()");
printjson(db.Students.updateMany(
  { Department: "Computer Science" },
  { $set: { Semester: 6 } }
));
printjson(db.Students.find({ Department: "Computer Science" }).toArray());

print("\nPRACTICAL 11: Replace one student document using replaceOne()");
printjson(db.Students.replaceOne(
  { RollNo: 105 },
  { RollNo: 105, Name: "Kabir Mehta", Department: "Business Studies", Semester: 5, CGPA: 8.2 }
));
printjson(db.Students.findOne({ RollNo: 105 }));

print("\nPRACTICAL 12: Add Email field to all student documents");
printjson(db.Students.updateMany(
  {},
  [{ $set: { Email: { $concat: [{ $toString: "$RollNo" }, "@example.com"] } } }]
));
printjson(db.Students.find({}, { _id: 0, RollNo: 1, Name: 1, Email: 1 }).toArray());

print("\nPRACTICAL 13: Remove an existing field from all documents ($unset)");
printjson(db.Students.updateMany({}, { $unset: { Email: "" } }));
printjson(db.Students.find({}, { _id: 0, RollNo: 1, Name: 1, Email: 1 }).toArray());

print("\nPRACTICAL 14: Delete one student by RollNo");
printjson(db.Students.deleteOne({ RollNo: 104 }));
printjson(db.Students.find({ RollNo: 104 }).toArray());

print("\nPRACTICAL 15: Delete multiple students meeting a condition");
print("Condition used: CGPA below 8.0");
printjson(db.Students.deleteMany({ CGPA: { $lt: 8.0 } }));
printjson(db.Students.find({}).toArray());

print("\nPRACTICAL 16: Count student documents");
print("Total students: " + db.Students.countDocuments({}));

print("\nPRACTICAL 17: Rename Students collection to StudentDetails");
if (db.getCollectionNames().includes("Students") && !db.getCollectionNames().includes("StudentDetails")) {
  db.Students.renameCollection("StudentDetails");
}
printjson(db.getCollectionNames());

print("\nPRACTICAL 18: Create Departments collection and insert sample information");
if (!db.getCollectionNames().includes("Departments")) db.createCollection("Departments");
db.Departments.insertMany([
  { DepartmentID: "D01", DepartmentName: "Computer Science", HOD: "Dr. Sharma" },
  { DepartmentID: "D02", DepartmentName: "Information Technology", HOD: "Dr. Verma" }
]);
printjson(db.Departments.find({}).toArray());

print("\nPRACTICAL 19: Drop Departments collection and verify");
print("This removes the Departments collection.");
print("Dropped: " + db.Departments.drop());
printjson(db.getCollectionNames());

print("\nPRACTICAL 20: Drop StudentDB database and confirm collections removed");
print("WARNING: This deletes the StudentDB database and its collections.");
// Uncomment the next line only when you are ready to perform this required destructive practical.
// print("Database dropped: " + db.dropDatabase());

print("\nPRACTICAL 21: Recreate StudentDB and insert sample data after deletion");
// Run after Practical 20 has been performed. The database is created when data is inserted.
db = db.getSiblingDB("StudentDB");
db.RecreatedStudents.insertOne({
  RollNo: 201,
  Name: "Sample Student",
  Department: "Computer Science",
  Semester: 5,
  CGPA: 8.5
});
printjson(db.RecreatedStudents.find({}).toArray());

print("\nPRACTICAL 22: CRUD using MongoDB Compass");
print("In MongoDB Compass, connect to your local MongoDB, open StudentDB, then use Documents to Insert, Find, Update, and Delete records.");
print("Compare Compass results with the corresponding mongosh commands in this file.");

print("\nPRACTICAL 23: Demonstrate Shell and Compass");
print("Shell: run commands in mongosh. Compass: perform equivalent actions through the GUI.");
print("Verify database/collection names and document contents in both tools.");

print("\nPRACTICAL 24: MongoDB CRUD vs SQL examples");
print("MongoDB insertOne: db.Students.insertOne({RollNo: 1, Name: 'Asha'})");
print("SQL INSERT: INSERT INTO Students (RollNo, Name) VALUES (1, 'Asha');");
print("MongoDB find: db.Students.find({RollNo: 1})");
print("SQL SELECT: SELECT * FROM Students WHERE RollNo = 1;");
print("MongoDB updateOne: db.Students.updateOne({RollNo: 1}, {$set: {Name: 'Asha'}})");
print("SQL UPDATE: UPDATE Students SET Name = 'Asha' WHERE RollNo = 1;");
print("MongoDB deleteOne: db.Students.deleteOne({RollNo: 1})");
print("SQL DELETE: DELETE FROM Students WHERE RollNo = 1;");
print("MongoDB stores BSON documents; SQL databases commonly store rows in tables with a defined schema.");

print("\nPRACTICAL 25: Laboratory report checklist");
print("Include: objective, software requirements, commands, actual outputs, screenshots, observations, and conclusion.");
print("Take screenshots of successful commands in mongosh and matching CRUD operations in Compass.");
print("\nEND OF LAB SHEET 01");
