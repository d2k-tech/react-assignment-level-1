import React from "react";
import { useParams } from "react-router-dom"; 
import { useNavigate } from "react-router-dom";
import userData from ".././asset/userData";
import "./profile.css"

const Profile = () => {
    const { userId } = useParams();
    const user = userData.find((user) => user.id === Number(userId));
    const navigate = useNavigate();
    if (!user) {
        navigate("/");
        return <div>User not found</div>;
    }
    return (
        <div className="profile_container">
            <div className="prof_wrap">

                <div className="backbtn" >
                    <img
                        src={require(".././asset/backArrow.png")}
                        alt="Sort Ascending"
                        width={50}
                        height={50}
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                            navigate("/");
                        }}
                    />
                </div>
                <p className="username" >Details:{user.first_name} {user.last_name} </p>
            </div>
            <div className="user_data" style={{ padding: "0.5rem" }}>
                <p>
                    First Name:<strong> {user.first_name}</strong>
                </p>
                <hr  />
                <p>
                    Last Name:<strong> {user.last_name}</strong>
                </p>
                <hr />
                <p>
                    Company_name:<strong> {user.company_name}</strong>
                </p>
                <hr />
                <p>
                    City:<strong> {user.city}</strong>
                </p>
                <hr />
                <p>
                    State:<strong> {user.state}</strong>
                </p>
                <hr />
                <p>
                    Zip:<strong> {user.zip}</strong>
                </p>
                <hr />
                <p>
                    Email:<strong> {user.email}</strong>
                </p>
                <hr />
                <p>
                    Web:<strong> {user.web}</strong>
                </p>
                <hr />
                <p>
                    Age:<strong> {user.age}</strong>
                </p>
                
            </div>
        </div>
    );
};

export default Profile;
