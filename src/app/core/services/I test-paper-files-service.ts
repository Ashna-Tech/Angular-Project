import { Observable } from "rxjs";
import { SimpleResponse } from "../domain/simple-response.model";
import { TestPaperFilesListModel } from "../domain/Test-Paper-Files/test-paper-files-list.model";
import { TestPaperFilesModel } from "../domain/Test-Paper-Files/test-paper-files-model";

export abstract class ItestPaperFilesService{

abstract createTestPaperFiles(catId : string, subCatId : string, name : string, testFile : string,
    flag : string, typeName : string, ansSheet : string
) : Observable <SimpleResponse>

abstract getTestPaperFilesList() : Observable <TestPaperFilesListModel[]>

abstract updateTestPaperFiles(id : string, catId : string, subCatId : string, name : string,
    testFile : string, flag : string, typeName : string, ansSheet : string) : Observable <SimpleResponse>

abstract deleteTestPaperFiles(id : string) : Observable <SimpleResponse>

abstract getTestPaperFiles(id : string) : Observable <TestPaperFilesModel>

}

