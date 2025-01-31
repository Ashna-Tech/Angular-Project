export interface TestListItemModel{
    id: string;
    testSection: {
        id:string,
        noofQuestions: number;
        cutOff: number;
        categoryId: string;
        categoryName: string;
        addedQues: number;
        oldId: number;
    }[],
    examId: string,
    examName: string,
    testType: string,
    launchedDate: string,
    expireDate: string,
    testTitle: string,
    testLevel: string,
    examGroup: string[],
    totalCutOff: number;
    totalTime: number;
    totalMaxMarks: number
    oldTestId: number;
    isActive: boolean;
  }