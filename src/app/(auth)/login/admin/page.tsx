import LoginForm from '@/app/components/LoginForm';

const AdminLoginPage = () => (
  <LoginForm title="Admin Portal" redirectTo="/admin/dashboard" />
);

export default AdminLoginPage;