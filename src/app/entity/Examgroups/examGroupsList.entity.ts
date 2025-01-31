import { ExamGroupsListModel } from "../../core/domain/Examgroups/examGroupsList.model";
import { ResponseModel } from "../../core/domain/response.model";

export interface ExamGroupsListEntity extends ResponseModel <ExamGroupsListModel[]>{}