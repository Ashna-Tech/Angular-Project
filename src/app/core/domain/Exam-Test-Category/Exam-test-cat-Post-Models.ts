export interface CreateExamTestCategoryParams {
  examId: string;
  examTestCategories: ExamTestCategoryModel[];
}

export interface ExamTestCategoryModel {
  catId: string;
  name: string;
  isOptionalCategory: boolean;
  examPreference: string;
  isIgnoreMarks: boolean;
  negMarks: number;
  isSplittedSection: boolean;
}
