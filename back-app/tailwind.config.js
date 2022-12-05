/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./resources/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'nunito': ['Noto Sans Thai', 'sans-serif'],
      },
      backgroundImage: {
        'ic-chkBx': "url('/public/img/ic_chkBx.png')",
        'ic-back': "url('/public/img/ic_back.png')",
        'ic-arrow': "url('/public/img/ic_arrow.png')",
        'ic-minus': "url('/public/img/ic_minus.png')",
        'ic-plus': "url('/public/img/ic_plus.png')",
        'ic-lock': "url('/public/img/ic_lock.png')",
        'ic-phone': "url('/public/img/ic_phone.png')",
        'ic-hide': "url('/public/img/ic_hide.png')",
        'ic-view': "url('/public/img/ic_view.png')",
      }
    },
  },
  plugins: [],
}
