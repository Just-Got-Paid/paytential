import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import { getUser } from "../adapters/user-adapter";
import { getUsersByOrganization } from "../adapters/organization-adapter"
import { logUserOut } from "../adapters/auth-adapter";
import UpdateUsernameForm from "../components/UpdateUsernameForm";

export default function UserPage() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [userProfile, setUserProfile] = useState(null);
  const [organizationUsers, setOrganizationUsers] = useState([]);
  const [errorText, setErrorText] = useState(null);
  const { id } = useParams();
  const isCurrentUserProfile = currentUser && currentUser.id === Number(id);

  // Load user profile
  useEffect(() => {
    const loadUser = async () => {
      const [user, error] = await getUser(id);
      if (error) return setErrorText(error.message);
      setUserProfile(user);
    };

    loadUser();
  }, [id]);

  // If the current user is an admin, load all users in their organization
  useEffect(() => {
    if (currentUser && currentUser.role === 'admin') {
      const loadOrganizationUsers = async () => {
        const [users, error] = await getUsersByOrganization(currentUser.organization_id); // Fetch users by organization
        if (error) return setErrorText(error.message);
        setOrganizationUsers(users); // Set organization users state
      };

      loadOrganizationUsers();
    }
  }, [currentUser]);

  const handleLogout = async () => {
    logUserOut();
    setCurrentUser(null);
    navigate('/');
  };

  if (!userProfile && !errorText) return null;
  if (errorText) return <p>{errorText}</p>;

  const profileUsername = isCurrentUserProfile ? currentUser.username : userProfile.username;

  return <>
    <h1>{profileUsername}</h1>
    {!!isCurrentUserProfile && <button onClick={handleLogout}>Log Out</button>}
    <p>If the user had any data, here it would be</p>
    <p>Fake Bio or something</p>

    {/* Render the UpdateUsernameForm for the current user */}
    {
      !!isCurrentUserProfile
      && <UpdateUsernameForm currentUser={currentUser} setCurrentUser={setCurrentUser} />
    }

    {/* If the current user is an admin, show the organization users */}
    {
      currentUser && currentUser.role === 'admin' && (
        <>
          <h2>Users in Your Organization</h2>
          <ul>
            {organizationUsers.map(user => (
              <li key={user.id}>
                {user.name} - {user.email} - {user.role}
              </li>
            ))}
          </ul>
        </>
      )
    }
  </>;
}
