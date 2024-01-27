import BackArrow from "../../components/Navigations/BackwardArrow";
import NotificationCard from "../../components/Notifications/NotificationCard";
import PhonePage from "../../components/Phone/PhonePage";
import PhonePageContent from "../../components/Phone/PhonePageContent";

const NotificationPage = () => {
  return (
    <PhonePage className="grey-bg">
      <section style={{ marginTop: "50px", padding: "0 20px" }}>
        <BackArrow title="Notifications" />
      </section>

      <PhonePageContent>
        <NotificationCard
          danger
          name="notification"
          description="coll description"
        />

        {/* {error ? <AuthError>{error}</AuthError> : null} */}
      </PhonePageContent>
    </PhonePage>
  );
};

export default NotificationPage;
