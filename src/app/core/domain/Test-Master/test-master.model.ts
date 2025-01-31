import { AllowNav } from "../../enums/allow-nav.enum"
import { Language } from "../../enums/Language.enum"
import { QMarkType } from "../../enums/q-mark-type.enum"
import { TestStatus } from "../../enums/test-status.enum"
import { TestTitle } from "../../enums/test-title.enum"
import { TestLevel } from "../../enums/TestLevel.enum"

export interface TestMasterModel{
    id: string,
    examId: string,
    examType: string,
    testType: string,
    noofSections: number,
    testLevel: TestLevel,
    testTitle: TestTitle,
    allowNav: AllowNav,
    totalQuestions: number,
    totalMaxAttempt: number,
    totalTime: number,
    totalCutOff: number,
    expireDate: string,
    status: TestStatus,
    maxMarks: number,
    negativeMarks: number,
    launchedDate: string,
    isFree: boolean,
    qMarkType: QMarkType,
    srno: number,
    lang: Language,
    pdfUrl: string,
    pdfUrlH: string,
    englishPdf: string,
    hindiPdf: string,
    testPatternType: string,
    isHighlighted: boolean,
    isAppFreePromo: boolean,
    isSplittedSection: boolean,
    isLiveTest: boolean,
    isQuesOptionUpdate: boolean,
    isComingSoon: boolean,
    isRRB: boolean,
    testSection: {
        categoryId: string,
        connectedCatId: string,
        timeLimit: number,
        noofQuestions: number,
        cutOff: number,
        totalSectionMarks: number,
        maxAttempt: number,
        categoryOrderNo: number
    }[]
}

