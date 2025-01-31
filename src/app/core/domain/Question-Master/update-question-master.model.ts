export interface UpdateQuestionMasterDTO{
    "id": string;
    "direction": string;
    "explanation": string;
    "summary": string;
    "summaryHin": string;
    "level": "Easy",
    "directionHin": string;
    "keywords": string[],
    "exams": string[]
}