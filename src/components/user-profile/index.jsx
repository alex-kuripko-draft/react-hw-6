import { useState, useEffect } from 'react';
import axios from 'axios';

import styles from './user-profile.module.css';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            setLoading(true);
            const res = await axios.get('https://randomuser.me/api/');
            setUser(res.data.results[0]);
        } catch (error) {
            console.error('Error fetching user:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!user) {
        return <p>User not found :(</p>;
    }

    return (
        <div className={styles.container}>
            <img src={user.picture.large} alt={`${user.name.first} ${user.name.last}`} />
            <h2>{`${user.name.first} ${user.name.last}`}</h2>
            <p>{user.email}</p>
            <p>{user.location.city}, {user.location.country}</p>
            <button onClick={fetchUser}>Load New User</button>
        </div>
    );
};

export default UserProfile;
