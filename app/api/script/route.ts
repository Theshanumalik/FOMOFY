import dbConnect from "@/lib/db";
import { catchAsyncError, CustomError } from "@/lib/utils";
import Project from "@/model/Project";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

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
    notifications: JSON.stringify(project.toJSON()),
  });

  const response = new NextResponse(script, {
    headers: newHeaders,
  });

  return response;
});

function generateScript({ notifications }: { notifications: string }) {
  let className = "`_notification-container ${settings.position}`";
  return `
    const notificationData = ${notifications};

    const settings = notificationData.settings;
    const popups = notificationData.popups;

    $(document).ready(() => {
      let delay = settings.delayBetweenPopups;

      const notificationContainer = $('<div>', { class: ${className} }).appendTo('body');

      popups.forEach((notification, index) => {
        setTimeout(() => {
          const notificationElement = createNotificationElement(notification);
          notificationElement.css({
            backgroundColor: settings.backgroundColor,
            color: settings.textColor
          });
          notificationContainer.prepend(notificationElement);

          notificationElement.slideDown(500).delay(5000).slideUp(500, () => {
            notificationElement.remove();
          });
        }, delay * (index + 1));
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
    }
  `;
}
