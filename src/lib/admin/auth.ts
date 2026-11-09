export interface AdminCredentials {
  email: string;
  password: string;
}

/** Replace this mock provider with the admin API and email service when they are available. */
export const mockAdminAuth = {
  async signIn({ email, password }: AdminCredentials) {
    return email.trim().toLowerCase() === 'admin@techsalem.se' && password === 'techsalem2026';
  },

  async requestPasswordReset(email: string) {
    return email.trim().length > 0;
  },
};
