    // Function to find the column number of the prerequisite
    interface Card {
      courseDescription: string;
      id: string;
      column: number;
      courseCode: string;
      units: number;
      status: string;
      preRequisite: string[],
      coRequisite: string[],
      error?: string | JSX.Element;
    }

    const findPreReqColumn = (preReqCode: string[], subjects: Card[]) => {
    const preReqSubject = subjects.find(subj => preReqCode.includes(subj.courseCode));
    return preReqSubject ? preReqSubject.column : -1;
  };
  
  // Function to check column validation
  export const validateSubjectColumns = (subjects: Card[]) => {
    subjects.forEach(subject => {
      const { courseCode, column, preRequisite } = subject;
  
      const preReqColumn = findPreReqColumn(preRequisite, subjects);
  
      if (preReqColumn === -1) {
        console.log(`Error: Prerequisite ${preRequisite} for ${courseCode} not found.`);
      } else if (column <= preReqColumn) {
        console.log(`Error: ${courseCode} is scheduled in the same or an earlier semester (column ${column}) than its prerequisite ${preRequisite} (column ${preReqColumn}).`);
      }
    });
  };

  