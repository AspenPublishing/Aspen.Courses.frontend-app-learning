import React from "react";
import { Button, Card, Icon } from "@openedx/paragon";
import { injectIntl, intlShape } from "@edx/frontend-platform/i18n";
import { useSelector } from "react-redux";
import { sendTrackingLogEvent } from "@edx/frontend-platform/analytics";
import messages from "../messages";
import { useModel } from "../../../generic/model-store";
import { PlayCircleOutline } from '@openedx/paragon/icons';

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
      style={{ backgroundColor: "#183749", color: "#FFFFFF" }}
    >
      <Card.Body className="d-flex align-items-center gap-3">
        {/* Circle with play icon */}
        <div
          className="d-flex align-items-center justify-content-center"
          style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            backgroundColor: "#F0F6F7",
          }}
        >
          <PlayCircleOutline size="md" className="text-brand" />
        </div>

        {/* Text and button column */}
        <div className="flex-grow-1">
          <div className="fw-bold mb-1" style={{ fontSize: "1.1rem", color: "#fff" }}>
            {
            hasVisitedCourse
              ? intl.formatMessage(messages.resumeBlurb)
              : intl.formatMessage(messages.startBlurb)
          }
          </div>
          <Button
            variant="inverse-brand"
            href={resumeCourseUrl}
            onClick={logResumeCourseClick}
            className="mt-1"
          >
            {hasVisitedCourse
              ? intl.formatMessage(messages.resume)
              : intl.formatMessage(messages.start)}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

StartOrResumeCourseCard.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(StartOrResumeCourseCard);
