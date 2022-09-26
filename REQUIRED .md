**Logic**;

- [ ] Readme
- [ ] edit seed (users , products , orders , reviews)

- [ ] map (put location )

---

## Delayed

- [ ] change page title using helmet
- [ ] handle categories as array
- [ ] add more validations

## Done

**pages UI**

- [x] sign up
- [x] sign in
- [x] home page
- [x] product page
- [x] cart page
- [x] proceed to buy ( sign-in && shipp && payment && preview order )
- [x] order history
- [x] order details
- [x] cart && placeorder responsive check
- [x] toastify

components

- [x] navbar
- [x] product card
- [x] footer

---

**models**

- [x] user model
- [x] product model
- [x] order model
- [x] cart
- [x] review

**routes**

- [x] auth
- [x] user
- [x] product
- [x] orders
- [x] cart
- [x] review
- [x] make cart Checkout

---

**Pages Logic**

- [x] sign up
- [x] log in

  - [x] track form
  - [x] validate form
  - [x] send request
  - [x] store (token , user Data) in [localstorage , redux or reducer ]
  - [x] show user name in navbar (with frop down options && logout button logic)
  - [x] prevent going to sign up when logged in

- [x] home page

  - [x]fetch products
  - [x] add To cart button Logic
    - [x] send request
    - [x] update cart (local storage , redux or reducer )
    - [x] show badge in cart
    - [x] fetch badge when logging in
    - [x] hide badge when not logged

- [x] product page

  - [x] fetch product
  - [x] add to cart logic (same as prev)
  - [x] fetch reviews
  - [x] add review logic
    - [x] track form
    - [x] send request
    - [x] push review to state

- [x] cart page

  - [x] fetch cart
  - [x] add , remove , delete logic
    - [x] monitor state
    - [x] send req

- [x] proceed To Chcek out

  - [x] store address (redux & localstorage)
  - [x] store payment method (redux & localstorage)
  - [x] place order details
  - [x] checkout route
  - [x] checkout button Logic
  - [x] then redirect to order details page

- [x] order details

  - [x] fetch only

- [x] order history

  - [x] fetch orders only

- [x] protect routes

- [x] edit user profile

- [x] filter & search

  - [x] search route & controller
  - [x] search page
  - [x] track nav form & navigate

- [x] admin

  - [x] orders

    - [x] order details
    - [x] delete order
      - [ ] could add pagination for them (not done)

  - [x] users

    - [x] fetch all users
    - [x] delete user
    - [x] edit user page
      - [x] fetch details
      - [x] edit request

  - [x] produts

    - [x] fetch products
    - [x] delete product
    - [x] add product
    - [x] edit product

  - [x] dashboard
  - [x] Payment Method
    - [x]backend
    - [x] front
      - [x] paypal
      - [x] stripe

- [x] add To cart

  - [x] navbar cartCount
  - [ ] check count in stock (not done)
  - [ ] default behaviour (could make redirect after adding) (not done)

- [x] Deliver Button (same place as paypal Button)
- [x] add product image

  - [x] API
  - [x] handle product images (their url)
  - [x] handle add product (as form data )
