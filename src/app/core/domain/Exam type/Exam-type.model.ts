import { MockType } from "../../enums/Mock-type.enum";

export interface ExamTypeModel {
  "id"?:string;
  "name": string;
  "displayName": string;
  "order": number;
  "type": MockType;
  "mainCatId": string;
  "examCatId": string;
  "isShow": boolean;
  "isShowInApp": boolean;
  "isShowNewPattern": boolean;
  "includeInDurationBasedPlan": boolean;
  "isHighlighted": boolean;
  "isDiagnosticTest": boolean;
  "hasOptionalCategory": boolean;
  "examPreferenceLabelText": string;
  "isTrendingExam": boolean;
  "hasConnectedSection": boolean;
  "isDescriptiveExam": boolean;
  "isGenerateAutoRank": boolean;
  "isIndex": boolean;
  "isEnableScroll": boolean;
  "isSubSectionExam": boolean;
  "isShowYearWiseMock": boolean;
  "showTopicTest": boolean;
  "hasSmartRead": boolean;
  "isChallengeModeExam": boolean;
  "planIds": string[];
  "groupIds": string[];
}