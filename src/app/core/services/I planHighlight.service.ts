import { Observable } from 'rxjs';
import { SimpleResponse } from '../domain/simple-response.model';
import { PlanHighlightListModel } from '../domain/Plan- Highlight/planHighlightList.model';
import { PlanhighlightModel } from '../domain/Plan- Highlight/planHighlight.model';

export abstract class IPlanHighlightService {
  abstract CreatePlanHighlight(
    name: string,
    heading: string,
    highlight: string
  ): Observable<SimpleResponse>;

  abstract GetPlanHighlightList(): Observable<PlanHighlightListModel[]>;

  abstract UpdatePlanHighlight(
    id: string,
    name: string,
    heading: string,
    highlight: string
  ): Observable<SimpleResponse>;

  abstract DeletePlanHighlight(id: string): Observable<SimpleResponse>;

  abstract GetPlanHighlight(id: string): Observable<PlanhighlightModel>;
}
