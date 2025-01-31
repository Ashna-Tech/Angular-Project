import { MockType } from "../../enums/Mock-type.enum";

export interface ExamTypeListItemModel{
    id: string,
    examType: string,
    name: string,
    examOrder: number,
    mockType: MockType,
    examGroup: string[]
}

