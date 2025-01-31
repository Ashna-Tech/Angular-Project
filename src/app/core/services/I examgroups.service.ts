import { Observable } from "rxjs";
import { SimpleResponse } from "../domain/simple-response.model";
import { ExamgroupsModel } from "../domain/Examgroups/examgroups.model";
import { ExamgroupsListIdwithnameModel} from "../domain/Examgroups/examgroups-list-idwithname.model";
import { ExamGroupsListModel } from "../domain/Examgroups/examGroupsList.model";

export abstract class IExamgroupService{

abstract createExamgroups(name : string, shortName : string, icon : string, image : string, url : string,
    categorySearch : string[], topicSearch : string [], isMockDrill : string
) : Observable <SimpleResponse>

abstract getExamGroupsList() : Observable <ExamGroupsListModel[]> 


abstract updateExamgroups(id : string, name : string, shortName : string, icon : string, image : string,
    url : string, categorySearch : string[], topicSearch : string [], isMockDrill : string
) : Observable <SimpleResponse>


abstract deleteExamgroups(id : string) : Observable <SimpleResponse>

abstract getExamgroupsById(id : string) : Observable <ExamgroupsModel>

abstract getExamgroupsListIdwithname() : Observable <ExamgroupsListIdwithnameModel[]>

}