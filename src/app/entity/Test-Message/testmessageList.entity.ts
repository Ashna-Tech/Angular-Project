import { ResponseModel } from "../../core/domain/response.model";
import { TestmessageListModel } from "../../core/domain/Test-Message/testmessageList.model";

export interface TestmessageListEntity extends ResponseModel <TestmessageListModel[]>{}