export const environment = {
  appName: "Shaj Flower shop",
  production: true,
  oneSignalAppId: "09c8c0ed-5d53-42f9-8384-c66c217bd87e",
  apiBaseUrl: "https://shaj-flower-shop-api.vercel.app/api/v1",
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
