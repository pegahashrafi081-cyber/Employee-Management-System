import LoginForm from '@/app/components/LoginForm';

interface LoginFormProps {
  title:string;
  redirectTo:string;
}

const AdminLoginpage = () => (
  <LoginForm title="Admin Portal" redirectTo="/admin/dashboard" />
);

export default AdminLoginpage;