import "../styles/Dashboard.css";

const Dashboard = () => {
  return (
    <header>
      <div id="dash-overlay" className="text-center position-fixed">
        <img
          src="./assets/background-cover.png"
          className="dash-img w-100"
          loading="lazy"
          alt="background-cover"
        />
      </div>
    </header>
  );
};

export default Dashboard;
