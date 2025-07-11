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
    invoicenumber: '',
    invoicedateofissue: '',
    dateofsale: '',
    sellercompanyname: '',
    sellercompanystreet: '',
    sellercompanypostcode: '',
    sellercompanycity: '',
    sellercompanynip: '',
    sellercompanyregon: '',
    customername: '',
    customersurname: '',
    customerstreet: '',
    customerpostcode: '',
    customercity: '',
    customercompanyname: '',
    customercompanystreet: '',
    customercompanypostcode: '',
    customercompanycity: '',
    customerinvoice: '',
    customercompanynip: '',
    customercompanyregon: '',
    ordercontent: '',
    orderamount: '',
    basisforvatexemption: '',
    paymentterm: '',
    ordertime: '',
    login: '',
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
        case 'CHANGE_INVOICE_DATA':
            return {...state, 
                invoicenumber: action.invoicenumber,
    invoicedateofissue: action.invoicedateofissue,
    dateofsale: action.dateofsale,
    sellercompanyname: action.sellercompanyname,
    sellercompanystreet: action.sellercompanystreet,
    sellercompanypostcode: action.sellercompanypostcode,
    sellercompanycity: action.sellercompanycity,
    sellercompanynip: action.sellercompanynip,
    sellercompanyregon: action.sellercompanyregon,
    customername: action.customername,
    customersurname: action.customersurname,
    customerstreet: action.customerstreet,
    customerpostcode: action.customerpostcode,
    customercity: action.customercity,
    customercompanyname: action.customercompanyname,
    customercompanystreet: action.customercompanystreet,
    customercompanypostcode: action.customercompanypostcode,
    customercompanycity: action.customercompanycity,
    customerinvoice: action.customerinvoice,
    customercompanynip: action.customercompanynip,
    customercompanyregon: action.customercompanyregon,
    ordercontent: action.ordercontent,
    orderamount: action.orderamount,
    basisforvatexemption: action.basisforvatexemption,
    paymentterm: action.paymentterm,
    ordertime: action.ordertime,
    login: action.login,
            }
         default:
            return {...state}
    }
}

export default reducer