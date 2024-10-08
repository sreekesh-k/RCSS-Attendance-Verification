import React, { useEffect } from "react";
import Combobox from "../Combobox";

function CourseSelector({
  courses,
  selectedCourse,
  setSelectedCourse,
  sem,
  level,
  setCourses,
  setError,
  isLoading
}) {
  useEffect(() => {
    if (level && sem) {
      fetch(
        `${
          import.meta.env.REACT_APP_API_BASE_URL
        }/college/courses?level=${level}&sem=${sem}`
      )
        .then((response) => response.json())
        .then((data) => {
          setCourses(data);
        })
        .catch((error) => setError("Error fetching courses: " + error.message));
    }
  }, [level, sem]);

  return (
    <div className="flex gap-5 w-full">
      <label htmlFor="course" className="font-bold">
        Course:
      </label>
      <Combobox
        data={courses.map((course) => ({
          value: course.cid,
          label: course.cname,
        }))}
        defaultValue={selectedCourse}
        placeholder="--Select Course--"
        noResultsMessage="No courses found."
        onChange={({ id, name }) => {
          setSelectedCourse({ id: id, name: name });
        }}
        disabled={!sem || isLoading}
      />
    </div>
  );
}

export default CourseSelector;
