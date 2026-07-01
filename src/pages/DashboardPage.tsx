import { useEffect, useState } from "react";
import {
  FaBug,
  FaCheckCircle,
  FaClock,
  FaTasks,
  FaUserCheck,
} from "react-icons/fa";

import { getDashboardStats } from "../api/dashboard.api";
import PageLayout from "../components/layout/PageLayout";

interface DashboardStats {
  totalIssues: number;
  open: number;
  inProgress: number;
  closed: number;
  myAssignedIssues: number;
}

const DashboardPage = () => {
  const [stats, setStats] =
    useState<DashboardStats | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    {
      title: "Total Issues",
      value: stats?.totalIssues ?? 0,
      icon: <FaBug />,
      color: "bg-blue-600",
    },
    {
      title: "Open",
      value: stats?.open ?? 0,
      icon: <FaTasks />,
      color: "bg-red-500",
    },
    {
      title: "In Progress",
      value: stats?.inProgress ?? 0,
      icon: <FaClock />,
      color: "bg-yellow-500",
    },
    {
      title: "Closed",
      value: stats?.closed ?? 0,
      icon: <FaCheckCircle />,
      color: "bg-green-500",
    },
    {
      title: "Assigned To Me",
      value: stats?.myAssignedIssues ?? 0,
      icon: <FaUserCheck />,
      color: "bg-purple-600",
    },
  ];

  return (
    <PageLayout title="Dashboard">
      {loading ? (
        <div className="text-center text-lg">
          Loading...
        </div>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {cards.map((card) => (
              <div
                key={card.title}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <div
                  className={`w-12 h-12 rounded-lg text-white flex items-center justify-center ${card.color}`}
                >
                  {card.icon}
                </div>

                <h3 className="text-gray-500 mt-4">
                  {card.title}
                </h3>

                <p className="text-3xl font-bold mt-2">
                  {card.value}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-white mt-8 rounded-xl shadow-md p-8">
            <h2 className="text-xl font-semibold mb-4">
              Welcome to Issue Tracker
            </h2>

            <p className="text-gray-600">
              Use the navigation above to manage issues,
              assign users, update statuses and collaborate
              through comments.
            </p>
          </div>
        </>
      )}
    </PageLayout>
  );
};

export default DashboardPage;