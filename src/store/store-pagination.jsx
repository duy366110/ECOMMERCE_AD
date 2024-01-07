import { createSlice } from "@reduxjs/toolkit"

const initState = {
    // CATEGORY
    category: {
        elementOfPage: 5,
        elemtItemsPagination: 0,
        currentPage: 0,
    },

    // FEATURED
    featured: {
        elementOfPage: 5,
        elemtItemsPagination: 0,
        currentPage: 0,
    },

    // PRODUCT
    product: {
        elementOfPage: 5,
        elemtItemsPagination: 0,
        currentPage: 0,
    },

    // ORDER
    order: {
        elementOfPage: 5,
        elemtItemsPagination: 0,
        currentPage: 0,
    },

    // ROLE
    role: {
        elementOfPage: 5,
        elemtItemsPagination: 0,
        currentPage: 0,
    },
    // USER
    user: {
        elementOfPage: 5,
        elemtItemsPagination: 0,
        currentPage: 0,
    }
}

const paginationslice = createSlice({
    name: 'pagination slice',
    initialState: initState,
    reducers: {
        // CATEGORY
            // CẬP NHẬT SỐ LƯỢNG NỘI DUNG HIỆN CÓ CỦA TRANG CATEGORY
            updateElementToTalCategory: (state, action) => {
                let { amount } = action.payload;
                state.category.elemtItemsPagination = Math.ceil(Number(amount) / state.category.elementOfPage);
            },

            // PAGINATION CẬP NHẬT TRANG HIỆN TẠI CỦA TRANG CATEGORY
            updateCurrentPageCategory: (state, action) => {
                let { page } = action.payload;

                switch(page) {
                    case 'next':
                        if(state.category.currentPage === (state.category.elemtItemsPagination - 1)) {
                            state.category.currentPage = 0;

                        } else {
                            state.category.currentPage += 1;
                        }

                        break

                    case 'previous':
                        if(state.category.currentPage === 0) {
                            state.category.currentPage = (state.category.elemtItemsPagination - 1);

                        } else {
                            state.category.currentPage -= 1;
                        }
                        break

                    default:
                        state.category.currentPage = Number(page);
                        break
                }
            },
        
        // FEATURED
            // CẬP NHẬT SỐ LƯỢNG NỘI DUNG HIỆN CÓ CỦA TRANG FEATURED
            updateElementToTalFeatured: (state, action) => {
                let { amount } = action.payload;
                state.featured.elemtItemsPagination = Math.ceil(Number(amount) / state.featured.elementOfPage);
            },

            // PAGINATION CẬP NHẬT TRANG HIỆN TẠI CỦA TRANG FEATURED
            updateCurrentPageFeatured: (state, action) => {
                let { page } = action.payload;

                switch(page) {
                    case 'next':
                        if(state.featured.currentPage === (state.featured.elemtItemsPagination - 1)) {
                            state.featured.currentPage = 0;

                        } else {
                            state.featured.currentPage += 1;
                        }

                        break

                    case 'previous':
                        if(state.featured.currentPage === 0) {
                            state.featured.currentPage = (state.featured.elemtItemsPagination - 1);

                        } else {
                            state.featured.currentPage -= 1;
                        }
                        break

                    default:
                        state.featured.currentPage = Number(page);
                        break
                }
            },

        // PRODUCT
            // CẬP NHẬT SỐ LƯỢNG NỘI DUNG HIỆN CÓ CỦA TRANG CATEGORY
            updateElementToTalProduct: (state, action) => {
                let { amount } = action.payload;
                state.product.elemtItemsPagination = Math.ceil(Number(amount) / state.product.elementOfPage);
            },

            // PAGINATION CẬP NHẬT TRANG HIỆN TẠI CỦA TRANG CATEGORY
            updateCurrentPageProduct: (state, action) => {
                let { page } = action.payload;

                switch(page) {
                    case 'next':
                        if(state.product.currentPage === (state.product.elemtItemsPagination - 1)) {
                            state.product.currentPage = 0;

                        } else {
                            state.product.currentPage += 1;
                        }

                        break

                    case 'previous':
                        if(state.product.currentPage === 0) {
                            state.product.currentPage = (state.product.elemtItemsPagination - 1);

                        } else {
                            state.product.currentPage -= 1;
                        }
                        break

                    default:
                        state.product.currentPage = Number(page);
                        break
                }
            },

        // ORDER
            // CẬP NHẬT SỐ LƯỢNG NỘI DUNG HIỆN CÓ CỦA TRANG ORDER
            updateElementToTalOrder: (state, action) => {
                let { amount } = action.payload;
                console.log(amount);
                state.order.elemtItemsPagination = Math.ceil(Number(amount) / state.order.elementOfPage);
            },

            // PAGINATION CẬP NHẬT TRANG HIỆN TẠI CỦA TRANG ORDER
            updateCurrentPageOrder: (state, action) => {
                let { page } = action.payload;

                switch(page) {
                    case 'next':
                        if(state.order.currentPage === (state.order.elemtItemsPagination - 1)) {
                            state.order.currentPage = 0;

                        } else {
                            state.order.currentPage += 1;
                        }

                        break

                    case 'previous':
                        if(state.order.currentPage === 0) {
                            state.order.currentPage = (state.order.elemtItemsPagination - 1);

                        } else {
                            state.order.currentPage -= 1;
                        }
                        break

                    default:
                        state.order.currentPage = Number(page);
                        break
                }
            },

        // ROLE
            // CẬP NHẬT SỐ LƯỢNG NỘI DUNG HIỆN CÓ CỦA TRANG ROLE
            updateElementToTalRole: (state, action) => {
                let { amount } = action.payload;
                state.role.elemtItemsPagination = Math.ceil(Number(amount) / state.role.elementOfPage);
            },

            // PAGINATION CẬP NHẬT TRANG HIỆN TẠI CỦA TRANG ROLE
            updateCurrentPageRole: (state, action) => {
                let { page } = action.payload;

                switch(page) {
                    case 'next':
                        if(state.role.currentPage === (state.role.elemtItemsPagination - 1)) {
                            state.role.currentPage = 0;

                        } else {
                            state.role.currentPage += 1;
                        }

                        break

                    case 'previous':
                        if(state.role.currentPage === 0) {
                            state.role.currentPage = (state.role.elemtItemsPagination - 1);

                        } else {
                            state.role.currentPage -= 1;
                        }
                        break

                    default:
                        state.role.currentPage = Number(page);
                        break
                }
            },

        // USER
            // CẬP NHẬT SỐ LƯỢNG NỘI DUNG HIỆN CÓ CỦA TRANG USER
            updateElementToTalUser: (state, action) => {
                let { amount } = action.payload;
                state.user.elemtItemsPagination = Math.ceil(Number(amount) / state.user.elementOfPage);
            },

            // PAGINATION CẬP NHẬT TRANG HIỆN TẠI CỦA TRANG USER
            updateCurrentPageUser: (state, action) => {
                let { page } = action.payload;
                console.log(page);

                switch(page) {
                    case 'next':
                        if(state.user.currentPage === (state.user.elemtItemsPagination - 1)) {
                            state.user.currentPage = 0;

                        } else {
                            state.user.currentPage += 1;
                        }

                        break

                    case 'previous':
                        if(state.user.currentPage === 0) {
                            state.user.currentPage = (state.user.elemtItemsPagination - 1);

                        } else {
                            state.user.currentPage -= 1;
                        }
                        break

                    default:
                        state.user.currentPage = Number(page);
                        break
                }
            },
    }
})

export const {

    // CATEGORY
    updateElementToTalCategory,
    updateCurrentPageCategory,

    // FEATURED
    updateElementToTalFeatured,
    updateCurrentPageFeatured,

    // PRODUCT
    updateElementToTalProduct,
    updateCurrentPageProduct,

    // ORDER
    updateElementToTalOrder,
    updateCurrentPageOrder,

    // ROLE
    updateElementToTalRole,
    updateCurrentPageRole,

    // USER
    updateElementToTalUser,
    updateCurrentPageUser
} = paginationslice.actions;

export default paginationslice.reducer