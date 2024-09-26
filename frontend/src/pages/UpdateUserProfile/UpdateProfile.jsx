import React, { useEffect, useState } from 'react';
import './UpdateProfile.css';
import avatar from '../../assets/userProfile.jpg';

function UpdateProfile() {

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: 'Business Owner' 
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log("\n Cnsole")
        const response = await fetch('/api/user', {
          headers: {
            'Content-Type': 'application/json', 
          },
        });

        console.log("\n nsole")

        if (!response.ok) {
          console.log("\n nmmmm...........")
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUser(data);
        console.log(data)
      } 
      catch (error) {
        console.error('Error fetching user data!!!!!!!!!!');
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <div className="mainProfileBox">
        <div className="info">
          <h1>Edit User Profile</h1>
          <div className="profileContainer">
            <div className="profileImageInfoCard">
              <div className="userImg">
                <img src={avatar} alt="User avatar" />
                <h3>{user.firstName} {user.lastName}</h3>
              </div>
              <div className="uploadBtns">
                <button className="uploadImgBtn">Upload New</button>
                <button className="saveImgBtn">Remove</button>
              </div>
            </div>
          </div>

          <div className="profileInfo">
            <h1>Personal Information</h1>
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" value={user.firstName} readOnly />
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" value={user.lastName} readOnly />
            <label htmlFor="email">Email address</label>
            <input type="email" id="email" value={user.email} readOnly />
            <label htmlFor="phone">Mobile Number</label>
            <input type="tel" id="phone" value={user.phone} readOnly />
            <label htmlFor="role">Role</label>
            <input type="text" id="role" value={user.role || 'Business Owner'} readOnly />
            <br />
            <br />
          </div>
        </div>

        <div className="bioInfo">
          <div className="bio">
            <h1>Business Description</h1>
            <div className="bioDescription">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus accusamus nostrum omnis earum molestiae. Possimus accusantium magnam odio consequuntur earum! Recusandae consequuntur aperiam cum aliquid alias dolor doloremque mollitia possimus.
              </p>
            </div>
          </div>
          <div className="bio">
            <h1>Social Accounts</h1>
            <div className="bioDescription">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus accusamus nostrum omnis earum molestiae. Possimus accusantium magnam odio consequuntur earum! Recusandae consequuntur aperiam cum aliquid alias dolor doloremque mollitia possimus.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;
