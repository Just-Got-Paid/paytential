import { useContext, useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import { createUser } from "../adapters/user-adapter";

export default function SignUpPage() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [errorText, setErrorText] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [organizationName, setOrganizationName] = useState('');

  if (currentUser) return <Navigate to={`/users/${currentUser.id}`} />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorText('');
    
    // Validate that all fields are filled in
    if (!name || !email || !password || !role || !organizationName) {
      return setErrorText('Please fill all fields.');
    }

    const [user, error] = await createUser({ name, email, password, role, organizationName });
    if (error) return setErrorText(error.message);
    console.log(user)

    setCurrentUser(user);
    navigate('/');
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'name') setName(value);
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
    if (name === 'role') setRole(value);
    if (name === 'organizationName') setOrganizationName(value);
    
  };

  return <>
    <h1>Sign Up</h1>
    <form onSubmit={handleSubmit} onChange={handleChange} aria-labelledby="create-heading">
      <h2 id="create-heading">Create New User</h2>
      
      <label htmlFor="name">Name</label>
      <input
        autoComplete="off"
        type="text"
        id="name"
        name="name"
        onChange={handleChange}
        value={name}
      />

      <label htmlFor="email">Email</label>
      <input
        autoComplete="off"
        type="email"
        id="email"
        name="email"
        onChange={handleChange}
        value={email}
      />

      <label htmlFor="password">Password</label>
      <input
        autoComplete="off"
        type="password"
        id="password"
        name="password"
        onChange={handleChange}
        value={password}
      />

      <label htmlFor="role">Are you an admin or a student?</label>
      <select
        id="role"
        name="role"
        onChange={handleChange}
        value={role}
      >
        <option value="">Select role</option>
        <option value="admin">Admin</option>
        <option value="student">Student</option>
      </select>

      <label htmlFor="organizationName">Organization Name</label>
      <input
        autoComplete="off"
        type="text"
        id="organizationName"
        name="organizationName"
        onChange={handleChange}
        value={organizationName}
      />


      <button>Sign Up Now!</button>
    </form>
    {!!errorText && <p>{errorText}</p>}
    <p>Already have an account with us? <Link to="/login">Log in!</Link></p>
  </>;
}
