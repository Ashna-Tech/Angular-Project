import { TestStatus } from "../../enums/test-status.enum";

export interface updateTestStatusParams{
    id:string;
    status:TestStatus;
}