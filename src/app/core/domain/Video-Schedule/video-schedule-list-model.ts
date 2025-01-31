export interface VideoScheduleListModel {
  id: string;
  videoType: string;
  videoId: string;
  scheduleTime: string;
  title: string;
  description: string;
  chapId: string;
  subCatId: string;
  catId: string;
  duration: string;
  thumbFile: string;
  isDemoClass : boolean;
  isFreeClass : boolean;
}
