import SearchInput from '../searchInput/SearchInput';
import UserList from '../UserList/UserList';
import 'C:/Users/Артем/Desktop/vscode/reactRegistration/my-app/src/App.css';

const SideBar = () => {
  return (
    <div className="side-bar">
      <SearchInput />
      {/* <input className='side-bar__search-input' type="text" placeholder='Find a user' /> */}
      <UserList />
    </div>
  );
}

export default SideBar;