export interface OfferPeriodModel {
  id: string;
  startDate: string;
  endDate: string;
  bannerStartDate: string;
  bannerEndDate: string;
  isShowTimer: boolean;
  isApplyOnAll: boolean;
  discountRate: number;
  offerEndingText: string;
  applicationName: string;
  isActive: boolean;
}
