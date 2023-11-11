export const unreadNotificationsFunc = (notifications) => {
  console.log(notifications, "jejejeee");
  return notifications.filter((n) => n?.isRead == false);
};
