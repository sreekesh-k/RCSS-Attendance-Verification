import React, { useEffect } from "react";
import Combobox from "../Combobox";

function SubjectSelector({
  selectedTeacher,
  setSubjects,
  subjects,
  selectedSubject,
  setSelectedSubject,
}) {
  useEffect(() => {
    if (selectedTeacher) {
      fetch(`http://localhost:5000/college/subjects`)
        .then((response) => response.json())
        .then((data) => {
          setSubjects(data);
        })
        .catch((error) => setError("Error fetching courses: " + error.message));
    }
  }, [selectedTeacher]);

  return (
    <div className="flex gap-5 w-full">
      <label htmlFor="course" className="font-bold">
        Subjects:
      </label>
      <Combobox
        data={subjects.map((subject) => ({
          value: subject.sid,
          label: subject.sname,
        }))}
        defaultValue={selectedSubject}
        placeholder="--Select Faculty--"
        noResultsMessage="No faculty found."
        onChange={(value) => setSelectedSubject(value)}
        disabled={!selectedTeacher}
      />
    </div>
  );
}

export default SubjectSelector;