/**
 * MRPFX API Services
 * Central export file for all API services and types
 */

// Base API client
export { default as api } from './api';

// Types
export * from './types';

// Authentication
export { authService } from './auth';
export type { User, AuthResponse } from './auth';

// WooCommerce Cart
export { cartService } from './cart';
export type { CartResponse } from './cart';

// WooCommerce Checkout
export { checkoutService } from './checkout';

// WooCommerce Products
export { productsService } from './products';
export type { ProductReview } from './products';

// WooCommerce Orders (User-facing)
export { ordersService } from './orders';

// LearnPress (User-facing)
export { learnpressService } from './learnpress';

// WordPress Content
export {
    postsService,
    pagesService,
    commentsService,
    categoriesService,
    tagsService,
    contentService,
} from './content';

// WordPress Service (Members, Legacy Orders, Users)
export { wordpressService } from './wordpress';

// Admin Services
export { adminService } from './admin';
export type { AdminUser, AdminOrder, AdminMember, AdminCourse } from './admin';

// Admin API (LearnPress Admin)
export {
    adminStatsService,
    adminUserService,
    adminOrderService,
    adminProductService,
    adminLearnPressService,
} from './admin-api';
