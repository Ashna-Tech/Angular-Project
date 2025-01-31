export interface ViewAddedQuestionModel{
    topperTime: number;
    optStatus: string;
    qOrder: number;
    marks: number;
    avgTime: number;
    minTime: number;
    order: number;
    testQuesId: string;
    quesId: string;
    ques: string;
    quesHin: string;
    quesLevel: string;
    optRight: string;
    explanation: string;
    quesOldId: number;
    optAEng: string;
    optAHin: string;
    optBEng: string;
    optBHin: string;
    optCEng: string;
    optCHin: string;
    optDEng: string;
    optDHin: string;
    optEEng: string;
    optEHin: string;
    quesMasterId: string;
    catId: string;
    sCatId: string;
    chapId: string;
    quesMasterLevel: string;
    quesMasterOldId: number;
    chapterName: string;
    direction: string;
    directionHin: string;
    summary: string;
    summaryHin: string;
    exams: string[];
    keywords: string[];
}

export interface ViewAddedQuestionListModel{
    id: string;
    qMarkType: string;
    testSectionId: string;
    categoryId: string;
    totalSectionMarks: number;
    category: string;
    question: ViewAddedQuestionModel[];
}