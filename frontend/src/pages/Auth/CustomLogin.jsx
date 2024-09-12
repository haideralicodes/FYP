import React from 'react'
import './CustomLogin.css';

function CustomLogin() {
  return (
    <div>

<section className="bg-white">
  <div className="lg-grid lg-min-h-screen lg-grid-cols-12">
    <aside className="aside-img lg-order-last lg-col-span-5 lg-h-full xl-col-span-6">
      <img
        alt=""
        src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        className="aside-img img"
      />
    </aside>

    <main
      className="main-content sm-px-12 lg-col-span-7 lg-px-16 lg-py-12 xl-col-span-6"
    >
      <div className="max-w-xl lg-max-w-3xl">
        <a className="block text-blue-600" href="#">
          <span className="sr-only">Home</span>
          <svg
            className="h-8 sm-h-10"
            viewBox="0 0 28 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 -2.24612 14 0.428569C17.3607 -2.24612 20.3286 1.02234 22.7361 2.90424C25.1436 4.7861 26.8522 7.4194 27.59 10.3847C28.367 13.5564 27.67 16.9103 26.439 19.9381C25.2325 22.9205 23.5 24 14 24C4.5 24 2.7675 22.9205 1.561 19.9381C0.33 16.9103 -0.367006 13.5564 0.41 10.3847Z"
              fill="currentColor"
            />
          </svg>
        </a>

        <h1 className="mt-6 text-2xl font-bold text-gray-900 sm-text-3xl md-text-4xl">
          Let us build your website.
        </h1>

        <p className="mt-4 leading-relaxed text-gray-500">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi nam
          dolorum aliquam, quibusdam aperiam voluptatum.
        </p>

        <form action="#" className="mt-8 grid grid-cols-6 gap-6">
          <div className="col-span-6 sm-col-span-3">
            <label
              for="FirstName"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>

            <input
              type="text"
              id="FirstName"
              name="first_name"
              className="mt-1 w-full rounded-md border-gray-200 bg-white shadow-sm sm-text-sm"
            />
          </div>

          <div className="col-span-6 sm-col-span-3">
            <label
              for="LastName"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>

            <input
              type="text"
              id="LastName"
              name="last_name"
              className="mt-1 w-full rounded-md border-gray-200 bg-white shadow-sm sm-text-sm"
            />
          </div>

          <div className="col-span-6">
            <label
              for="Email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>

            <input
              type="email"
              id="Email"
              name="email"
              className="mt-1 w-full rounded-md border-gray-200 bg-white shadow-sm sm-text-sm"
            />
          </div>

          <div className="col-span-6">
            <label
              for="Password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>

            <input
              type="password"
              id="Password"
              name="password"
              className="mt-1 w-full rounded-md border-gray-200 bg-white shadow-sm sm-text-sm"
            />
          </div>

          <div className="col-span-6 sm-flex sm-items-center sm-gap-4">
            <button
              className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover-bg-transparent hover-text-blue-600 focus-outline-none focus-ring active-text-blue-500"
            >
              Create an account
            </button>

            <p className="mt-4 text-sm text-gray-500 sm-mt-0">
              Already have an account?
              <a href="#" className="text-gray-700 underline">Log in</a>.
            </p>
          </div>
        </form>
      </div>
    </main>
  </div>
</section>


    </div>
  )
}

export default CustomLogin