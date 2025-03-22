import React from "react";
import { Button, Card } from "@openedx/paragon";
import { injectIntl, intlShape } from "@edx/frontend-platform/i18n";

import { useSelector } from "react-redux";
import { sendTrackingLogEvent } from "@edx/frontend-platform/analytics";
import messages from "../messages";
import { useModel } from "../../../generic/model-store";

const StartOrResumeCourseCard = ({ intl }) => {
  const { courseId } = useSelector((state) => state.courseHome);

  const { org } = useModel("courseHomeMeta", courseId);

  const eventProperties = {
    org_key: org,
    courserun_key: courseId,
  };

  const {
    resumeCourse: { hasVisitedCourse, url: resumeCourseUrl },
  } = useModel("outline", courseId);

  if (!resumeCourseUrl) {
    return null;
  }

  const logResumeCourseClick = () => {
    sendTrackingLogEvent("edx.course.home.resume_course.clicked", {
      ...eventProperties,
      event_type: hasVisitedCourse ? "resume" : "start",
      url: resumeCourseUrl,
    });
  };

  return (
    <Card
      className="mb-3 raised-card"
      data-testid="start-resume-card"
      style={{ backgroundColor: "#183749" }}
    >
      <Card.Header
        style={{ margin: "1rem !important" }}
        title={
          hasVisitedCourse
            ? intl.formatMessage(messages.resumeBlurb)
            : intl.formatMessage(messages.startBlurb)
        }
      >
        <svg
          width="90"
          height="91"
          viewBox="0 0 90 91"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="45" cy="45.7837" r="45" fill="#F0F6F7" />
        </svg>
        <Button
            variant="brand"
            block
            href={resumeCourseUrl}
            onClick={() => logResumeCourseClick()}
          >
            {hasVisitedCourse ? intl.formatMessage(messages.resume) : intl.formatMessage(messages.start)}
          </Button>
      </Card.Header>
      {/* Footer is needed for internal vertical spacing to work out. If you can remove, be my guest */}
      {/* eslint-disable-next-line react/jsx-no-useless-fragment */}
    </Card>
  );
};

StartOrResumeCourseCard.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(StartOrResumeCourseCard);
