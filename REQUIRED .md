## FE

**Logic**;

- [x] edit user profile

- [x] filter & search

  - [x] search route & controller
  - [x] search page
  - [x] track nav form & navigate

- [ ] admin

  - [ ] orders

    - [x] order details
    - [x] delete order
      - [ ] could add pagination for them (not done)

  - [ ] produts

    - [ ] add product
    - [ ] edit product
    - [ ] delete product

  - [ ] users

    - [ ] edit user
    - [ ] delete user

  - [ ] dashboard

- [ ] map (put location )

- [ ] add To cart

  - [ ] default behaviour (could make redirect after adding)
  - [ ] check count in stock
  - [ ] navbar cartCount

- [ ] payment method (missing stripe)

  - [x] backend
  - [x] front
    - [x] paypal
    - [ ] stripe

---

## BE

## Delayed

- [ ] footer
- [ ] change page title using helmet

---

- [ ] check auth & admin auth [ orders , products]
- [ ] check cart responsive
- [ ] when something requires sign in (after sign in make redirect)

---

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

components

- [x] navbar
- [x] product card

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
  - [ ] show user name in navbar (with frop down options && logout button logic)
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
  - [ ] fetch reviews
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
