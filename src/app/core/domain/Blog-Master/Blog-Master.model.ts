import { FAQList } from "../Blog-fAQ/blog-FAQ-model";

export interface BlogMasterModel {
  id: string;
  authorId: string;
  thumbnail: string;
  blogTitle: string;
  blogHeading: string;
  blogContent: string;
  blogTag: string;
  banner: string;
  readingTime: string;
  isIndex: true;
  seoTitle: string;
  seoKeywords: string;
  seoDescription: string;
  isFeaturePost: true;
  isShowOnIndividualPage: true;
  viewCount: string;
  groupId: string;
  catId: string;
  faq : FAQList[] ;
}

