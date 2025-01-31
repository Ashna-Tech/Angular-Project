export interface UpdateExamTestCategoryPayload {
  examId: string;
  examTestCategories: ExamTestCategoryPutModel[];
}

export interface ExamTestCategoryPutModel {
  catId: string;
  name: string;
  isOptionalCategory: boolean;
  examPreference: string;
  isIgnoreMarks: boolean;
  negMarks: number;
  isSplittedSection: boolean;
}
