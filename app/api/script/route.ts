import dbConnect from "@/lib/db";
import { catchAsyncError, CustomError } from "@/lib/utils";
import Project from "@/model/Project";
import { NextRequest, NextResponse } from "next/server";

export const GET = catchAsyncError(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get("project-id");

  await dbConnect();
  const project = await Project.findById(projectId);

  if (!project) {
    throw new CustomError("404 Page Not found", 404);
  }
  const newHeaders = new Headers(req.headers);

  newHeaders.set("content-type", "text/javascript");

  const script = generateScript({
    notifications: JSON.stringify(project.popups),
  });

  const response = new NextResponse(script, {
    headers: newHeaders,
  });

  return response;
});

function generateScript({ notifications }: { notifications: string }) {
  return `
  const notifications = ${notifications};
  
  const delayBetweenNotification = 1000;
    const baseDelay = 2000;
    const hideAfter = 5000;

    $(document).ready(() => {
      let delay = baseDelay;
      
      const notificationContainer = $('<div>', { class: '_notification-container' }).appendTo('body');
      
      notifications.forEach(notification => {
        setTimeout(() => {
          const notificationElement = createNotificationElement(notification);
          notificationContainer.prepend(notificationElement);
          
          notificationElement.slideDown(500).delay(hideAfter).slideUp(500, () => {
            notificationElement.remove();
          });
        }, delay);
        
        delay += delayBetweenNotification;
      });
    });

    function createNotificationElement({ heading, message, icon, timeago }) {
      const notificationElement = $('<div>', { class: '_notification' }).hide();
      
      const notificationAvatar = $('<img>', { src: icon, class: '_notification-avatar' });
      const notificationContent = $('<div>', { class: '_notification-content' });
      const notificationHeading = $('<h3>', { class: '_notification-heading', text: heading });
      const notificationMessage = $('<p>', { class: '_notification-message', text: message });
      const notificationTimeAgo = $('<span>', { class: '_notification-timeago', text: timeago });
      
      notificationContent.append(notificationHeading, notificationMessage);
      notificationElement.append(notificationAvatar, notificationContent, notificationTimeAgo);
      
      return notificationElement;
    }`;
}
