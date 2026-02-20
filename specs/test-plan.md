# Swag Labs E-Commerce Test Plan

## Application Overview

Swag Labs is a demo e-commerce application for testing. It includes user authentication, product catalog with sorting, shopping cart functionality, product details, and a multi-step checkout process. The application supports multiple user types (standard, locked, problem, performance_glitch, error, and visual users) with the password 'secret_sauce' for all.

## Test Scenarios

### 1. Authentication

**Seed:** `tests/seed.spec.ts`

#### 1.1. User can login with valid credentials

**File:** `tests/auth/LoginValid.spec.js`

**Steps:**
  1. Navigate to login page
    - expect: Page displays Swag Labs login form
    - expect: Username and password input fields are visible
    - expect: Login button is visible
  2. Enter username 'standard_user' and password 'secret_sauce'
    - expect: Credentials are entered correctly
  3. Click the login button
    - expect: User is redirected to inventory page
    - expect: Page title remains 'Swag Labs'
    - expect: Products are displayed on inventory page

#### 1.2. User cannot login with invalid credentials

**File:** `tests/auth/LoginInvalid.spec.js`

**Steps:**
  1. Navigate to login page
    - expect: Login form is displayed
  2. Enter invalid username and password
    - expect: Input fields accept the values
  3. Click the login button
    - expect: User remains on login page
    - expect: An error message is displayed indicating login failure

#### 1.3. Locked out user cannot login

**File:** `tests/auth/LockedOutUser.spec.js`

**Steps:**
  1. Navigate to login page
    - expect: Login form is displayed
  2. Enter username 'locked_out_user' and password 'secret_sauce'
    - expect: Credentials are entered correctly
  3. Click the login button
    - expect: User cannot login
    - expect: An error message indicates the account is locked

### 2. Product Browsing

**Seed:** `tests/seed.spec.ts`

#### 2.1. User can view products on inventory page

**File:** `tests/products/ViewProducts.spec.js`

**Steps:**
  1. Login with valid credentials
    - expect: Inventory page loads successfully
  2. Observe products on the page
    - expect: Multiple products are displayed
    - expect: Each product shows image, name, description, and price
    - expect: Each product has an 'Add to cart' button

#### 2.2. User can sort products by name A-Z

**File:** `tests/products/SortName.spec.js`

**Steps:**
  1. Login and navigate to inventory
    - expect: Inventory page is displayed
  2. Click sort dropdown
    - expect: Sort options are visible
  3. Select 'Name (A to Z)' option
    - expect: Products are sorted alphabetically from A to Z
    - expect: Backpack appears before Onesie in the list

#### 2.3. User can sort products by price low to high

**File:** `tests/products/SortPrice.spec.js`

**Steps:**
  1. Login and navigate to inventory
    - expect: Inventory page is displayed
  2. Select 'Price (low to high)' from sort dropdown
    - expect: Products are sorted by price in ascending order
    - expect: Lowest priced item appears first

#### 2.4. User can view product details

**File:** `tests/products/ProductDetails.spec.js`

**Steps:**
  1. Login and navigate to inventory
    - expect: Inventory page is displayed
  2. Click on a product name
    - expect: Product detail page loads
    - expect: Product image, name, description, and price are displayed
    - expect: Add to cart button is visible on detail page
  3. Click 'Back to products' button
    - expect: User returns to inventory page

### 3. Shopping Cart

**Seed:** `tests/seed.spec.ts`

#### 3.1. User can add product to cart

**File:** `tests/cart/AddToCart.spec.js`

**Steps:**
  1. Login with valid credentials
    - expect: Inventory page is displayed
  2. Click 'Add to cart' button on any product
    - expect: Product is added to cart
    - expect: Cart icon shows item count

#### 3.2. User can view empty cart

**File:** `tests/cart/ViewEmptyCart.spec.js`

**Steps:**
  1. Login and navigate to cart page
    - expect: Cart page displays 'Your Cart' heading
  2. Observe cart contents
    - expect: Cart is empty
    - expect: 'Continue Shopping' and 'Checkout' buttons are visible

#### 3.3. User can view cart with items

**File:** `tests/cart/ViewCartWithItems.spec.js`

**Steps:**
  1. Login and add products to cart
    - expect: Products are added successfully
  2. Navigate to cart page
    - expect: Added products appear in cart
    - expect: Quantity and description columns are shown
    - expect: Total price is calculated correctly

#### 3.4. User can continue shopping from cart

**File:** `tests/cart/ContinueShopping.spec.js`

**Steps:**
  1. Navigate to cart page with items
    - expect: Cart is displayed
  2. Click 'Continue Shopping' button
    - expect: User is redirected to inventory page
    - expect: Cart items are preserved

### 4. Checkout Process

**Seed:** `tests/seed.spec.ts`

#### 4.1. User can proceed to checkout information step

**File:** `tests/checkout/CheckoutStep1.spec.js`

**Steps:**
  1. Add items to cart and navigate to cart
    - expect: Cart displays items
  2. Click 'Checkout' button
    - expect: Checkout: Your Information page loads
    - expect: First Name, Last Name, and Zip/Postal Code input fields are visible

#### 4.2. User can fill checkout information

**File:** `tests/checkout/FillCheckoutInfo.spec.js`

**Steps:**
  1. Navigate to checkout step 1
    - expect: Checkout form is displayed
  2. Enter first name 'John', last name 'Doe', zip code '12345'
    - expect: All fields accept input correctly
  3. Click 'Continue' button
    - expect: User proceeds to checkout step 2 (Order Overview)

#### 4.3. User can review order before completion

**File:** `tests/checkout/ReviewOrder.spec.js`

**Steps:**
  1. Fill checkout information and proceed to step 2
    - expect: Checkout: Overview page loads
  2. Observe order summary
    - expect: Cart items are displayed with quantity and description
    - expect: Payment information (SauceCard) is shown
    - expect: Shipping information (Free Pony Express Delivery) is shown
    - expect: Price breakdown shows item total, tax, and total price

#### 4.4. User can complete order

**File:** `tests/checkout/CompleteOrder.spec.js`

**Steps:**
  1. Navigate to checkout overview page
    - expect: Order summary is displayed
  2. Click 'Finish' button
    - expect: Order is processed
    - expect: Checkout: Complete page displays success message
    - expect: 'Thank you for your order!' message is shown
    - expect: Back Home button is available

#### 4.5. User can cancel checkout and return to cart

**File:** `tests/checkout/CancelCheckout.spec.js`

**Steps:**
  1. Navigate to checkout step 1
    - expect: Checkout form is displayed
  2. Click 'Cancel' button
    - expect: User returns to cart page
    - expect: Cart items are still present

### 5. Menu Navigation

**Seed:** `tests/seed.spec.ts`

#### 5.1. User can access menu options

**File:** `tests/navigation/MenuNavigation.spec.js`

**Steps:**
  1. Login and navigate to any page
    - expect: Open Menu button is visible in header
  2. Click 'Open Menu' button
    - expect: Menu dropdown appears
    - expect: Menu shows 'All Items', 'About', 'Logout', and 'Reset App State' options

#### 5.2. User can logout from menu

**File:** `tests/navigation/Logout.spec.js`

**Steps:**
  1. Login successfully
    - expect: User is on inventory page
  2. Click 'Open Menu' and select 'Logout'
    - expect: User is redirected to login page
    - expect: Session is terminated

#### 5.3. User can reset app state

**File:** `tests/navigation/ResetAppState.spec.js`

**Steps:**
  1. Add items to cart
    - expect: Items are in cart
  2. Click 'Open Menu' and select 'Reset App State'
    - expect: Cart is cleared
    - expect: User remains on current page
