const initialState = {
    isAdminLogged: false,
    temporaryBlogImageUrl: '',
    temporaryBlogAuthor: '',
    temporaryBlogTitle: '',
    temporaryBlogDescription: '',
    temporaryCourseTitle: '',
    temporaryCourseImageUrl: '',
    temporaryCourseNumberOfLessons: 0,
    temporaryCoursePrice: 0,
    temporaryCoursePriceBeforeThirtyDays: 0,
    temporaryCourseSalesContent: '',
    temporaryCourseLinkToYoutube: '',
    temporaryCourseContentList: '',
    temporaryCourseAuthor: '',
    temporaryCourseId: '',
    temporaryCourseAccessCode: '',
    temporaryCourseViewId: '',
    temporaryCourseViewNumberOfLessons: '',
    temporaryCourseViewTitle: '',
    temporaryCourseViewAuthor: '',
    temporaryCourseViewCourseContent: '',
    temporaryCourseViewCourseLinks: '',
} 

function reducer(state=initialState, action){
    switch(action.type){
        case 'CHANGE_ADMIN_LOGGED':
            return {...state, isAdminLogged: !state.isAdminLogged}
        case 'CHANGE_TEMPORARY_BLOG_IMAGE_URL': 
            return {...state, temporaryBlogImageUrl: action.temporaryBlogImageUrl}
        case 'CHANGE_TEMPORARY_BLOG_AUTHOR':
            return {...state, temporaryBlogAuthor: action.temporaryBlogAuthor}
        case 'CHANGE_TEMPORARY_BLOG_TITLE':
            return {...state, temporaryBlogTitle: action.temporaryBlogTitle}
        case 'CHANGE_TEMPORARY_BLOG_DESCRIPTION':
            return {...state, temporaryBlogDescription: action.temporaryBlogDescription}
        case 'CHANGE_TEMPORARY_COURSE_TITLE':
            return {...state, temporaryCourseTitle: action.temporaryCourseTitle}
        case 'CHANGE_TEMPORARY_COURSE_IMAGE_URL':
            return {...state, temporaryCourseImageUrl: action.temporaryCourseImageUrl}
        case 'CHANGE_TEMPORARY_COURSE_NUMBER_OF_LESSONS':
            return {...state, temporaryCourseNumberOfLessons: action.temporaryCourseNumberOfLessons}
        case 'CHANGE_TEMPORARY_COURSE_PRICE':
            return {...state, temporaryCoursePrice: action.temporaryCoursePrice}
        case 'CHANGE_TEMPORARY_COURSE_PRICE_BEFORE_THIRTY_DAYS':
            return {...state, temporaryCoursePriceBeforeThirtyDays: action.temporaryCoursePriceBeforeThirtyDays}
        case 'CHANGE_TEMPORARY_COURSE_SALES_CONTENT':
            return {...state, temporaryCourseSalesContent: action.temporaryCourseSalesContent}
        case 'CHANGE_TEMPORARY_COURSE_LINK_TO_YOUTUBE':
            return {...state, temporaryCourseLinkToYoutube: action.temporaryCourseLinkToYoutube}
        case 'CHANGE_TEMPORARY_COURSE_CONTENT_LIST':
            return {...state, temporaryCourseContentList: action.temporaryCourseContentList}
        case 'CHANGE_TEMPORARY_COURSE_AUTHOR':
            return {...state, temporaryCourseAuthor: action.temporaryCourseAuthor}
        case 'CHANGE_TEMPORARY_COURSE_ID':
            return {...state, temporaryCourseId: action.temporaryCourseId}
        case 'CHANGE_TEMPORARY_COURSE_ACCESS_CODE':
            return {...state, temporaryCourseAccessCode: action.temporaryCourseAccessCode}
        case 'CHANGE_TEMPORARY_COURSE_VIEW_ID':
            return {...state, temporaryCourseViewId: action.temporaryCourseViewId}
        case 'CHANGE_TEMPORARY_COURSE_VIEW_NUMBER_OF_LESSONS':
            return {...state, temporaryCourseViewNumberOfLessons: action.temporaryCourseViewNumberOfLessons}
        case 'CHANGE_TEMPORARY_COURSE_VIEW_TITLE':
            return {...state, temporaryCourseViewTitle: action.temporaryCourseViewTitle}
        case 'CHANGE_TEMPORARY_COURSE_VIEW_AUTHOR':
            return {...state, temporaryCourseViewAuthor: action.temporaryCourseViewAuthor}
        case 'CHANGE_TEMPORARY_COURSE_VIEW_COURSE_CONTENT':
            return {...state, temporaryCourseViewCourseContent: action.temporaryCourseViewCourseContent}
        case 'CHANGE_TEMPORARY_COURSE_VIEW_COURSE_LINKS':
            return {...state, temporaryCourseViewCourseLinks: action.temporaryCourseViewCourseLinks}
         default:
            return {...state}
    }
}

export default reducer