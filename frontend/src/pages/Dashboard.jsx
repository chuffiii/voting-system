import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Dashboard() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    return storedUser || null;
  });

  const navigate = useNavigate();

  // Load user
  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }
  }, [user, navigate]);

  // Load groups
  useEffect(() => {
    if (!user) return;

    const fetchGroups = async () => {
      try {
        const res = await api.get("/groups");
        setGroups(res.data.groups);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, [user]);

  const handleVote = async (groupId) => {
    try {
      const res = await api.post("/groups/vote", {
        userId: user._id,
        groupId,
      });

      alert(res.data.message);

      if (res.data.status === "success") {
        const updatedUser = {
          ...user,
          hasVoted: true,
        };

        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);

        const groupsRes = await api.get("/groups");
        setGroups(groupsRes.data.groups);
      }
    } catch (err) {
      console.log(err);
      alert("Failed to vote");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const winner =
    groups.length > 0
      ? groups.reduce(
        (max, group) => (group.votes > max.votes ? group : max),
        groups[0]
      )
      : null;

  if (!user) {
    return <p className="text-center mt-10">Redirecting...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-6">
      {/* Header */}
      <div className="max-w-4xl mx-auto flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Online Voting System</h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Winner */}
      {winner && (
        <div className="max-w-4xl mx-auto mb-6">
          <div className="bg-yellow-200 border border-yellow-400 rounded p-4">
            🏆 Leading Candidate:{" "}
            <span className="font-bold">{winner.name}</span>
            {" • "}
            {winner.votes} votes
          </div>
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <p className="text-center">Loading candidates...</p>
      ) : (
        <div className="max-w-4xl mx-auto grid gap-4">
          {groups.map((group) => (
            <div
              key={group._id}
              className="bg-white rounded-lg shadow p-4 flex justify-between items-center"
            >
              <div>
                <h2 className="text-xl font-semibold">{group.name}</h2>
                <p className="text-gray-600">
                  Votes: {group.votes}
                </p>
              </div>

              <button
                disabled={user.hasVoted}
                onClick={() => handleVote(group._id)}
                className={`px-4 py-2 rounded text-white ${user.hasVoted
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600"
                  }`}
              >
                {user.hasVoted ? "Already Voted" : "Vote"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}