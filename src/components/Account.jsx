import { useState, useEffect } from "react";
import { signout } from "@lib/auth_fns";
import { fetchProfileDataById, updateProfileData } from "@lib/profile_fns";
import Avatar from "@components/Avatar";

export default function Account({ session }) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [website, setWebsite] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);

  useEffect(() => {
    getProfile();
  }, [session]);

  const getProfile = async () => {
    try {
      setLoading(true);
      const { user } = session;
      console.log("getProfile_user: ", user);

      let { data, error, status } = await fetchProfileDataById(user?.id);

      if (error && status !== 406) {
        throw error;
      }

      console.log("getProfile_data: ", data);

      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      console.log("Error in getProfile: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (e) => {
    // e.preventDefault();

    try {
      setLoading(true);
      const { user } = session;

      const updates = {
        id: user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      };

      let { error } = await updateProfileData(updates);

      if (error) {
        throw error;
      }
    } catch (error) {
      console.log("Error in updateProfile: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div aria-live="polite">
      {loading ? (
        "Saving ..."
      ) : (
        <form onSubmit={updateProfile} className="form-widget">
          <Avatar
            url={avatar_url}
            size={150}
            onUpload={(url) => {
              console.log("onUpload_url: ", url);
              setAvatarUrl(url);
              updateProfile({ username, website, avatar_url: url });
            }}
          />
          <div className="w-full rounded text-xl text-gray-100">
            Email: {session.user.email}
          </div>
          <div>
            <input
              id="username"
              className="px-3 py-2 mt-4 w-full rounded text-gray-100 bg-gray-800"
              type="text"
              placeholder="username"
              value={username || ""}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <input
              id="website"
              className="px-3 py-2 mt-4 w-full rounded text-gray-100 bg-gray-800"
              type="url"
              placeholder="website"
              value={website || ""}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
          <div>
            <button
              className="block mt-8 px-3 py-2 w-full text-white border rounded hover:border-2 bg-blue-800"
              disabled={loading}
            >
              Update profile
            </button>
          </div>
        </form>
      )}
      <button
        type="button"
        className="block mt-8 px-3 py-2 w-full text-white border rounded hover:border-2"
        onClick={() => signout()}
      >
        Sign Out
      </button>
    </div>
  );
}
