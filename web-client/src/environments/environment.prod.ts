export const environment = {
  appName: "Shaj Flower shop",
  production: true,
  oneSignalAppId: "651fe52b-1a5e-4045-b722-5efb0c841f76",
  apiBaseUrl: "http://shaj-flower-shop-api.vercel.app/api/v1",
  api: {
    auth: {
      login: "/auth/login/customer/",
      registerCustomer: "/auth/register/customer/",
      registerVerify: "/auth/register/verifyCustomer/",
      resetSubmit: "/auth/reset/customerUserResetPasswordSubmit/",
      resetVerify: "/auth/reset/customerUserVerify/",
      resetPassword: "/auth/reset/customerUserResetPassword/",
    },
    users: {
      getByCode: "/customer-user/",
      updateProfile: "/customer-user/updateCustomerUserProfile/"
    }
  }
};
