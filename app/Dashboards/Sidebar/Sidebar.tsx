import Image from 'next/image';
import profile from '../../../public/man.jpeg';
import Link from 'next/link';
import './Sidebar.css';

const Sidebar: React.FC = () => {

  return (
    <div className="sidebar">
      <div className="--sidebar-profile">
        <Image src={profile} alt="Picture of the author" />
        <h2>John Doe</h2>
        <p>johndoe20</p>
      </div>
      <div className="--sidebar-profile-details">
        <div className="--sidebar-dashboard">
          <button>Dashboard</button>
        </div>
        <div className="--sidebar-sell">
          <Link href='/productCreation'>
            <button>Sell</button>
          </Link>
        </div>
        <div className="--sidebar-products">
          <Link href='/product'>
            <button>Products</button>
          </Link>
        </div>
        <div className="--sidebar-wallet">
          <Link href="/wallet">
            <button>Wallet</button>
          </Link>
        </div>
        <div className="--sidebar-switch">
          <button>Switch</button>
        </div>
        <div className="--sidebar-settings">
          <button>Settings</button>
        </div>
        <div className="--sidebar-logout">
          <button>Logout</button>
        </div>
      </div>
      {/* <WalletModal isOpen={isWalletModalOpen} onClose={closeWalletModal} /> */}
    </div>
  );
};

export default Sidebar;
