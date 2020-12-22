import {  notification } from 'antd';

const openNotification = (type,title,description) => {
  const args = {
    message: title,
    description:description,
    duration: 0,
  };
  switch(type)
  {
      case 'info':
          notification.info(args);
          break;
      case 'error':
          notification.error(args);
          break;
      case 'success':
          notification.success(args);
          break;
      case 'warning':
          notification.warning(args);
          break;
      default:
          notification.open(args);
          break;
  }
};
export default openNotification;