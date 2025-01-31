export interface ExamTestCategoryListModel {
  id: string;
  examId: string;
  catId: string;
  name: string;
  isOptionalCategory: boolean;
  examPreference: string;
  isIgnoreMarks: boolean;
  negMarks: number;
  isSplittedSection: boolean;
}
