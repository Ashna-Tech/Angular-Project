import { Routes } from '@angular/router';
import { MainScreenComponent } from './presentation/screens/main-screen/main-screen.component';
import { ManageCategoryComponent } from './presentation/screens/manage-category/manage-category.component';
import { ManageChapterComponent } from './presentation/screens/manage-chapter/manage-chapter.component';
import { ManageSubCatagoryComponent } from './presentation/screens/manage-sub-catagory/manage-sub-catagory.component';
import { YoutubeCategoryComponent } from './presentation/screens/youtube-category/youtube-category.component';
import { YoutubeSubCategoryComponent } from './presentation/screens/youtube-sub-category/youtube-sub-category.component';
import { YoutubeFeedComponent } from './presentation/screens/youtube-feed/youtube-feed.component';
import { BlogComponent } from './presentation/screens/blog/blog.component';
import { BlogMasterComponent } from './presentation/screens/blog-master/blog-master.component';
import { BlogCategoryComponent } from './presentation/screens/blog-category/blog-category.component';
import { BlogAuthorComponent } from './presentation/screens/blog-author/blog-author.component';
import { CuetBlogComponent } from './presentation/screens/cuet-blog/cuet-blog.component';
import { BlogDtlComponent } from './presentation/screens/blog-dtl/blog-dtl.component';
import { BlogFAQComponent } from './presentation/screens/blog-faq/blog-faq.component';
import { BlogLeftImageComponent } from './presentation/screens/blog-left-image/blog-left-image.component';
import { BlogPdfComponent } from './presentation/screens/blog-pdf/blog-pdf.component';
import { BlogPdfNewComponent } from './presentation/screens/blog-pdf-new/blog-pdf-new.component';
import { DashboardSliderComponent } from './presentation/screens/dashboard-slider/dashboard-slider.component';
import { DetailsComponent } from './presentation/screens/details/details.component';
import { ExamTypeComponent } from './presentation/screens/exam-type/exam-type.component';
import { QuestionMasterComponent } from './presentation/screens/question-master/question-master.component';
import { NotificationComponent } from './presentation/screens/notification/notification.component';
import { SliderimageComponent } from './presentation/screens/sliderimage/sliderimage.component';
import { ExamCategoryComponent } from './presentation/screens/exam-category/exam-category.component';
import { PlanMasterComponent } from './presentation/screens/plan-master/plan-master.component';
import { CouponAffiliateDetailComponent } from './presentation/screens/coupon-affiliate-detail/coupon-affiliate-detail.component';
import { AffiliateMasterComponent } from './presentation/screens/affiliate-master/affiliate-master.component';
import { CouponMasterComponent } from './presentation/screens/coupon-master/coupon-master.component';
import { CouponPlanDetailComponent } from './presentation/screens/coupon-plan-detail/coupon-plan-detail.component';
import { IncludedPlanComponent } from './presentation/screens/included-plan/included-plan.component';
import { PlanFacultyMasterComponent } from './presentation/screens/plan-faculty-master/plan-faculty-master.component';
import { PlanHighlightComponent } from './presentation/screens/plan-highlight/plan-highlight.component';
import { PlanHighlightDetailComponent } from './presentation/screens/plan-highlight-detail/plan-highlight-detail.component';
import { PlansComponent } from './presentation/screens/plans/plans.component';
import { ImageUploadComponent } from './presentation/screens/image-upload/image-upload.component';
import { PlanScheduleMasterComponent } from './presentation/screens/plan-schedule-master/plan-schedule-master.component';
import { PlanWiseFaqComponent } from './presentation/screens/plan-wise-faq/plan-wise-faq.component';
import { ExamGroupMasterSeoDataComponent } from './presentation/screens/exam-group-master-seo-data/exam-group-master-seo-data.component';
import { SeoKeywordPageComponent } from './presentation/screens/seo-keyword-page/seo-keyword-page.component';
import { EssayWrittingComponent } from './presentation/screens/essay-writting/essay-writting.component';
import { EssayWrittingDetailComponent } from './presentation/screens/essay-writting-detail/essay-writting-detail.component';
import { LandingPageMasterComponent } from './presentation/screens/landing-page-master/landing-page-master.component';
import { LandingPageContentComponent } from './presentation/screens/landing-page-content/landing-page-content.component';
import { QzSeoComponent } from './presentation/screens/qz-seo/qz-seo.component';
import { ReviewComponent } from './presentation/screens/review/review.component';
import { ExamLandingPageFaqComponent } from './presentation/screens/exam-landing-page-faq/exam-landing-page-faq.component';
import { FacultyPlanDetailComponent } from './presentation/screens/faculty-plan-detail/faculty-plan-detail.component';
import { TestCategoryComponent } from './presentation/screens/test-category/test-category.component';
import { TestSubcategoryComponent } from './presentation/screens/test-subcategory/test-subcategory.component';
import { TestMessageComponent } from './presentation/screens/test-message/test-message.component';
import { TestPaperFilesComponent } from './presentation/screens/test-paper-files/test-paper-files.component';
import { ExamTestCategoryComponent } from './presentation/screens/exam-test-category/exam-test-category.component';
import { LawExFaqComponent } from './presentation/screens/law-ex-faq/law-ex-faq.component';
import { LawExMagazineComponent } from './presentation/screens/law-ex-magazine/law-ex-magazine.component';
import { SimilarQuestionComponent } from './presentation/screens/similar-question/similar-question.component';
import { ChapterLayerComponent } from './presentation/screens/chapter-layer/chapter-layer.component';
import { OfferPeriodComponent } from './presentation/screens/offer-period/offer-period.component';
import { VideoScheduleComponent } from './presentation/screens/video-schedule/video-schedule.component';
import { PricingFaqComponent } from './presentation/screens/pricing-faq/pricing-faq.component';
import { MultipleSelectExamplansComponent } from './presentation/screens/exam-type/multiple-select-examplans/multiple-select-examplans.component';
import { LoginComponent } from './presentation/screens/login/login.component';
import { ExamgroupsComponent } from './presentation/screens/examgroups/examgroups.component';
import { TestComponent } from './presentation/screens/test/test.component';
import { ReasoningAptitudeComponent } from './presentation/screens/reasoning-aptitude/reasoning-aptitude.component';
import { ExamMasterCategoryComponent } from './presentation/screens/exam-master-category/exam-master-category.component';
import { ManageKeywordComponent } from './presentation/screens/manage-keyword/manage-keyword.component';
import { AppSliderComponent } from './presentation/screens/app-slider/app-slider.component';
import { ExamContentComponent } from './presentation/screens/exam-content/exam-content.component';
import { ExamSeoComponent } from './presentation/screens/exam-seo/exam-seo.component';
import { TotalChapterQuestionComponent } from './presentation/screens/total-chapter-question/total-chapter-question.component';
import { ExamFaqComponent } from './presentation/screens/exam-faq/exam-faq.component';
import { QuestionBulkUploadComponent } from './presentation/screens/question-bulk-upload/question-bulk-upload.component';
import { ViewQuestionsComponent } from './presentation/screens/view-questions/view-questions.component';
import { AddTestQuestionComponent } from './presentation/screens/add-test-question/add-test-question.component';
import { AddQuestionToTestComponent } from './presentation/screens/add-question-to-test/add-question-to-test.component';
import { QuestionsComponent } from './presentation/screens/main-screen/questions/questions.component';
import { AddPdfComponent } from './presentation/screens/add-pdf/add-pdf.component';
import { ReadyLaunchComponent } from './presentation/screens/ready-launch/ready-launch.component';
import { ChatSupportScreenComponent } from './presentation/screens/chat-support-screen/chat-support-screen.component';
import { UpdateTestPdfComponent } from './presentation/screens/update-test-pdf/update-test-pdf.component';
import { UpdateTestLanguageComponent } from './presentation/screens/update-test-language/update-test-language.component';
import { TopperTimeExamLevelMasterComponent } from './presentation/screens/topper-time-exam-level-master/topper-time-exam-level-master.component';
import { SetTestTopperTimeComponent } from './presentation/screens/set-test-topper-time/set-test-topper-time.component';
import { TopperTimeMasterComponent } from './presentation/screens/topper-time-master/topper-time-master.component';
import { SearchComponent } from './presentation/screens/search/search.component';
import { ManageTestResultComponent } from './presentation/screens/manage-test-result/manage-test-result.component';
import { QuestionDetailComponent } from './presentation/screens/question-detail/question-detail.component';




export const routes: Routes = [
  { path: 'chat-support', component : ChatSupportScreenComponent},
  {
    path: 'dashboard',
    component: MainScreenComponent,
    children: [
      { path: 'manage-category', component: ManageCategoryComponent },
      { path: 'manage-chapter', component: ManageChapterComponent },
      { path: 'manage-sub-category', component: ManageSubCatagoryComponent },
      { path: 'youtube-category', component: YoutubeCategoryComponent },
      { path: 'youtube-sub-category', component: YoutubeSubCategoryComponent },
      { path: 'youtube-feed', component: YoutubeFeedComponent },
      { path: 'blog', component: BlogComponent },
      { path: 'blog-master', component: BlogMasterComponent },
      { path: 'blog-category', component: BlogCategoryComponent },
      { path: 'blog-author', component: BlogAuthorComponent },
      { path: 'cuet-blog', component: CuetBlogComponent },
      { path: 'blog-dtl', component: BlogDtlComponent },
      { path: 'Blog-FAQ', component: BlogFAQComponent },
      { path: 'blog-left-image', component: BlogLeftImageComponent },
      { path: 'blog-pdf', component: BlogPdfComponent },
      { path: 'blog-pdf-new', component: BlogPdfNewComponent },
      { path: 'dashboard-slider', component: DashboardSliderComponent },
      { path: 'details', component: DetailsComponent },
      { path: 'exam-type', component: ExamTypeComponent },
      { path: 'question-master', component: QuestionMasterComponent },
      { path: 'notification', component: NotificationComponent },
      { path: 'sliderimage', component: SliderimageComponent },
      { path: 'exam-category', component: ExamCategoryComponent },
      { path: 'exam-master-category', component: ExamMasterCategoryComponent},
      { path: 'plan-master',component :PlanMasterComponent},
      { path: 'coupon affiliate-detail', component : CouponAffiliateDetailComponent},
      { path: 'affiliate-master', component : AffiliateMasterComponent},   
      { path: 'coupon-master',component : CouponMasterComponent},
      { path: 'coupon-plan-detail',component : CouponPlanDetailComponent},
      { path: 'included-plan',component : IncludedPlanComponent},
      { path: 'plan-faculty-master', component : PlanFacultyMasterComponent},
      { path: 'plan-highlight', component : PlanHighlightComponent},
      { path: 'plan-highlight-detail', component : PlanHighlightDetailComponent},
      { path: 'image-upload', component : ImageUploadComponent},
      { path: 'plans', component : PlansComponent},
      { path: 'plan-schedule-master', component : PlanScheduleMasterComponent},
      { path:'plan-wise-faq',component : PlanWiseFaqComponent},
      { path: 'exam-group-master-seo-data',component :ExamGroupMasterSeoDataComponent },
      { path: 'seo-keyword-page', component:SeoKeywordPageComponent},
      { path: 'essay-writting', component : EssayWrittingComponent},
      { path: 'essay-writting-detail', component : EssayWrittingDetailComponent},
      { path: 'landing-page-master', component : LandingPageMasterComponent},
      { path: 'landing-page-content', component : LandingPageContentComponent},
      { path: 'qz-seo', component : QzSeoComponent},
      { path: 'review', component : ReviewComponent},
      { path: 'exam-landing-page-faq', component : ExamLandingPageFaqComponent},
      { path: 'faculty-plan-detail', component : FacultyPlanDetailComponent},
      { path: 'test-category', component : TestCategoryComponent},
      { path: 'test-subcategory', component : TestSubcategoryComponent},
      { path: 'test-message', component : TestMessageComponent},
      { path: 'test-paper-files', component : TestPaperFilesComponent},
      { path: 'exam-test-category', component : ExamTestCategoryComponent},
      { path: 'law-ex-faq', component : LawExFaqComponent},
      { path: 'law-ex-magazine', component : LawExMagazineComponent},
      { path: 'similar-question', component : SimilarQuestionComponent},
      { path: 'chapter-layer', component : ChapterLayerComponent},
      { path: 'offer-period', component : OfferPeriodComponent},
      { path: 'video-schedule', component : VideoScheduleComponent},
      { path: 'pricing-faq', component : PricingFaqComponent},
      { path: 'exam-faq', component : ExamFaqComponent}, 
      { path: 'multiple-select-examplans', component : MultipleSelectExamplansComponent},
      { path: 'login', component : LoginComponent},
      { path: 'examgroups', component : ExamgroupsComponent},
      { path:'test', component : TestComponent},
      { path: 'view-edit-question', component : ReasoningAptitudeComponent},
      { path: 'manage-keyword', component : ManageKeywordComponent},
      { path: 'app-slider', component : AppSliderComponent},
      { path: 'exam-content', component : ExamContentComponent},
      { path: 'exam-seo', component : ExamSeoComponent},
      { path: 'total-chapter-question', component : TotalChapterQuestionComponent}, 
      { path: 'question-bulk-upload', component : QuestionBulkUploadComponent}, 
      { path: 'view-questions', component: ViewQuestionsComponent},
      { path: 'add-test-question', component : AddTestQuestionComponent},
      { path: 'add-question-to-test', component : AddQuestionToTestComponent},
      { path: 'questions', component : QuestionsComponent}, 
      // { path: 'reasoning', component : ReasoningComponent},
      { path: 'add-pdfs', component : AddPdfComponent},
      { path: 'ready-to-launch', component : ReadyLaunchComponent},
      { path: 'update-test-pdf', component : UpdateTestPdfComponent},
      { path: 'update-test-language', component : UpdateTestLanguageComponent}, 
      { path: 'topper-time-exam-level-master', component : TopperTimeExamLevelMasterComponent},
      { path: 'set-test-topper-time', component : SetTestTopperTimeComponent},
      { path: 'topper-time-master', component : TopperTimeMasterComponent},
      { path: 'search', component : SearchComponent},
      { path: 'manage-test-result', component : ManageTestResultComponent},
      { path: 'question-detail', component : QuestionDetailComponent},
    ],
  },
];
