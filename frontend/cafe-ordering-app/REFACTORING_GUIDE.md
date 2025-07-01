# Components Refactoring - Complete Separation of Concerns

This document explains the comprehensive refactoring of admin, home, orders, and profile components following separation of concerns principles.

## New Directory Structure

```
src/
├── components/
│   ├── admin/
│   │   ├── editBanner.jsx       # Refactored banner management
│   │   ├── editMenu.jsx         # Refactored menu management
│   │   ├── editRole.jsx         # Refactored user management
│   │   └── form/                # Form components (unchanged)
│   ├── home/
│   │   ├── BannerCarousel.jsx   # Refactored banner carousel
│   │   ├── MenuList.jsx         # Refactored menu listing
│   │   ├── RecommendedMenu.jsx  # Refactored recommendations
│   │   └── MenuPopup.jsx        # (unchanged)
│   ├── orders/
│   │   ├── ActiveOrders.jsx     # Refactored active orders
│   │   └── OrdersHistory.jsx    # Refactored order history
│   ├── profile/
│   │   ├── ProfileInfo.jsx      # Refactored profile info
│   │   └── ProfileSettings.jsx  # Refactored profile settings
│   └── common/                  # Reusable UI components
│       ├── LoadingSkeleton.jsx  # Loading state component
│       ├── Pagination.jsx       # Pagination component
│       ├── SearchBar.jsx        # Search input component
│       ├── ConfirmDialog.jsx    # Confirmation dialog
│       ├── OrderStatusIcon.jsx  # Order status display
│       ├── OrderCard.jsx        # Order card component
│       ├── EmptyState.jsx       # Empty state component
│       ├── ProfileMenuItem.jsx  # Profile menu item
│       └── index.js             # Common components exports
├── hooks/                       # Custom React hooks
│   ├── useBanners.js           # Banner state management
│   ├── useMenus.js             # Menu state management
│   ├── useUsers.js             # User state management
│   ├── usePagination.js        # Pagination logic
│   ├── useOrders.js            # Order state management
│   ├── useActiveBanners.js     # Active banners hook
│   ├── useRecommendations.js   # Recommendations hook
│   ├── useAuth.js              # Authentication hook
│   └── index.js                # Hooks exports
├── services/                    # API service layer
│   ├── api/
│   │   ├── bannerService.js    # Banner API calls
│   │   ├── menuService.js      # Menu API calls
│   │   ├── userService.js      # User API calls
│   │   ├── orderService.js     # Order API calls
│   │   └── recommendationService.js # Recommendation API calls
│   └── index.js                # Services exports
└── utils/                       # Utility functions and constants
    ├── constants.js            # Application constants
    ├── pagination.js           # Pagination utilities
    ├── validation.js           # Form validation utilities
    ├── orderUtils.js           # Order-related utilities
    └── index.js                # Utils exports
```

## Separation of Concerns Implementation

### 1. Services Layer (`src/services/`)
- **Purpose**: Handle all API communications and business logic
- **Files**: 
  - `bannerService.js` - Banner CRUD operations
  - `menuService.js` - Menu CRUD operations
  - `userService.js` - User CRUD operations
  - `orderService.js` - Order operations
  - `recommendationService.js` - Recommendation API calls
- **Benefits**: 
  - Centralized API logic
  - Easy to test and mock
  - Consistent error handling
  - Reusable across components

### 2. Custom Hooks (`src/hooks/`)
- **Purpose**: Manage component state and side effects
- **Files**:
  - `useBanners.js` - Banner state management
  - `useMenus.js` - Menu state management
  - `useUsers.js` - User state management
  - `usePagination.js` - Pagination state and logic
  - `useOrders.js` - Order state management
  - `useActiveBanners.js` - Active banners hook
  - `useRecommendations.js` - User recommendations
  - `useAuth.js` - Authentication state and actions
- **Benefits**:
  - Reusable stateful logic
  - Cleaner component code
  - Easier testing of business logic
  - Better state management

### 3. Utils (`src/utils/`)
- **Purpose**: Pure utility functions and constants
- **Files**:
  - `constants.js` - Application-wide constants
  - `pagination.js` - Pagination helper functions
  - `validation.js` - Form validation utilities
  - `orderUtils.js` - Order formatting and calculations
- **Benefits**:
  - Centralized configuration
  - Reusable utility functions
  - Easier maintenance
  - Type safety improvements

### 4. Common Components (`src/components/common/`)
- **Purpose**: Reusable UI components
- **Files**:
  - `LoadingSkeleton.jsx` - Loading state display
  - `Pagination.jsx` - Pagination controls
  - `SearchBar.jsx` - Search input component
  - `ConfirmDialog.jsx` - Confirmation dialogs
  - `OrderStatusIcon.jsx` - Order status display
  - `OrderCard.jsx` - Order information card
  - `EmptyState.jsx` - Empty state component
  - `ProfileMenuItem.jsx` - Profile menu item component
- **Benefits**:
  - Consistent UI across app
  - Reduced code duplication
  - Easier styling updates
  - Better component composition

## Key Improvements

### Before Refactoring Issues:
1. **Mixed Concerns**: Components handled API calls, state management, and UI rendering
2. **Code Duplication**: Similar logic repeated across components
3. **Hard to Test**: Business logic tightly coupled with UI
4. **Poor Reusability**: Difficult to reuse logic or components
5. **Inconsistent Error Handling**: Different error handling patterns

### After Refactoring Benefits:
1. **Single Responsibility**: Each file has one clear purpose
2. **Reusability**: Hooks and services can be used across components
3. **Testability**: Business logic separated from UI concerns
4. **Maintainability**: Changes isolated to specific layers
5. **Consistency**: Standardized patterns across the application

## Usage Examples

### Using Custom Hooks
```jsx
// Order management
import { useOrders } from '../../hooks/useOrders';

const OrderComponent = () => {
  const { loading, getActiveOrders, getOrderHistory } = useOrders();
  const activeOrders = getActiveOrders();
  
  // Component logic here
};

// Authentication
import { useAuth } from '../../hooks/useAuth';

const ProfileComponent = () => {
  const { user, isUserValid, logout } = useAuth();
  
  // Component logic here
};

// Banner carousel
import { useActiveBanners } from '../../hooks/useActiveBanners';

const BannerCarousel = () => {
  const { banners, loading } = useActiveBanners();
  
  // Component logic here
};
```

### Using Services Directly
```jsx
import { orderService, recommendationService } from '../../services';

const handleCreateOrder = async (data) => {
  try {
    await orderService.createOrder(data);
  } catch (error) {
    console.error('Failed to create order:', error);
  }
};
```

### Using Common Components
```jsx
import { 
  LoadingSkeleton, 
  OrderCard, 
  EmptyState,
  OrderStatusIcon 
} from '../../components/common';

const OrdersList = ({ orders, loading }) => (
  <div>
    {loading ? (
      <LoadingSkeleton rows={3} />
    ) : orders.length === 0 ? (
      <EmptyState 
        message="No orders found" 
        actionText="Order now" 
        actionLink="/" 
      />
    ) : (
      orders.map(order => (
        <OrderCard key={order._id} order={order} />
      ))
    )}
  </div>
);
```

### Using Utility Functions
```jsx
import { 
  formatCurrency, 
  formatDate, 
  calculateOrderTotal,
  ORDER_STATUS 
} from '../../utils/orderUtils';

const OrderSummary = ({ order }) => (
  <div>
    <p>Total: Rp {formatCurrency(calculateOrderTotal(order))}</p>
    <p>Date: {formatDate(order.createdAt)}</p>
    <p>Status: {order.status}</p>
  </div>
);
```

## Migration Benefits

1. **Easier Maintenance**: Changes to API endpoints only require updates to service files
2. **Better Testing**: Business logic can be tested independently of UI
3. **Improved Performance**: Better separation allows for optimized re-renders
4. **Scalability**: New features can reuse existing services and hooks
5. **Developer Experience**: Cleaner code structure and better IntelliSense support

## Next Steps

1. **Add Error Boundaries**: Implement error boundaries for better error handling
2. **Add Loading States**: Implement more granular loading states
3. **Add Caching**: Implement caching strategies in services
4. **Add TypeScript**: Convert to TypeScript for better type safety
5. **Add Tests**: Write unit tests for services and hooks
