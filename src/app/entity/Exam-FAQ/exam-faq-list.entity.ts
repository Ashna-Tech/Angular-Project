import { ExamFAQListModel } from "../../core/domain/Exam-FAQ/exam-faq-list.model";
import { ResponseModel } from "../../core/domain/response.model";

export interface ExamFAQListEntity extends ResponseModel <ExamFAQListModel[]>{}