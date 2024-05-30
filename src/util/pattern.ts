export const email_regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
export const password_regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*[^a-zA-Z0-9~!@#$%^*\-_=+/;:,.?\[\]{}]).{6,28}$/;
export const price_usa_regex = /^\$?\d{1,3}(,?\d{3})*(\.\d{1,2})?$/;