import LoginForm from '@/app/components/LoginForm';

const EmployeeLoginPage = () => (
  <LoginForm title="Employee Portal" redirectTo="/employee/dashboard" />
);

export default EmployeeLoginPage;