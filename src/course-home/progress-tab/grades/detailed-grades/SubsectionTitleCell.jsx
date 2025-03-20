import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import { sendTrackEvent } from "@edx/frontend-platform/analytics";
import { getAuthenticatedUser } from "@edx/frontend-platform/auth";
import { injectIntl, intlShape } from "@edx/frontend-platform/i18n";
import { Collapsible, Icon, Row } from "@openedx/paragon";
import {
  ArrowDropDown,
  ArrowDropUp,
  Blocked,
  Info,
} from "@openedx/paragon/icons";

import messages from "../messages";
import { useModel } from "../../../../generic/model-store";
import ProblemScoreDrawer from "./ProblemScoreDrawer";

const SubsectionTitleCell = ({ intl, subsection }) => {
  const { courseId } = useSelector((state) => state.courseHome);
  const { org } = useModel("courseHomeMeta", courseId);
  const { gradesFeatureIsFullyLocked } = useModel("progress", courseId);

  const { blockKey, displayName, problemScores, url } = subsection;

  const { administrator } = getAuthenticatedUser();
  const logSubsectionClicked = () => {
    sendTrackEvent(
      "edx.ui.lms.course_progress.detailed_grades_assignment.clicked",
      {
        org_key: org,
        courserun_key: courseId,
        is_staff: administrator,
        assignment_block_key: blockKey,
      }
    );
  };

  return (
    <Collapsible.Advanced>
      <Row className="w-100 m-0">
        <Collapsible.Trigger
          className="mr-1 position-absolute"
          aria-label={intl.formatMessage(messages.problemScoreToggleAltText, {
            subsectionTitle: displayName,
          })}
          tabIndex={gradesFeatureIsFullyLocked ? "-1" : "0"}
        >
          <Collapsible.Visible whenClosed>
            <Icon src={ArrowDropDown} />
          </Collapsible.Visible>
          <Collapsible.Visible whenOpen>
            <Icon src={ArrowDropUp} />
          </Collapsible.Visible>
        </Collapsible.Trigger>
        <span className="small d-inline ml-4 pl-1">
          {gradesFeatureIsFullyLocked || subsection.learnerHasAccess ? (
            ""
          ) : (
            <Icon
              id={`detailedGradesBlockedIcon${subsection.blockKey}`}
              aria-label={intl.formatMessage(messages.noAccessToSubsection, {
                displayName,
              })}
              className="mr-1 mt-1 d-inline-flex"
              style={{ height: "1rem", width: "1rem" }}
              src={Blocked}
              data-testid="blocked-icon"
            />
          )}
          {url ? (
            <a
              href={url}
              className="muted-link small"
              style={{ color: "#055B5E" }}
              onClick={logSubsectionClicked}
              tabIndex={gradesFeatureIsFullyLocked ? "-1" : "0"}
              aria-labelledby={`detailedGradesBlockedIcon${subsection.blockKey}`}
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.5154 11.1156H4.57693C3.42138 11.1156 2.48462 12.0523 2.48462 13.2079M14.5154 11.1156V14.254C14.5154 14.8318 14.047 15.3002 13.4692 15.3002H4.57693C3.42138 15.3002 2.48462 14.3634 2.48462 13.2079M14.5154 11.1156V2.74635C14.5154 2.16857 14.047 1.7002 13.4692 1.7002H5.88462M2.48462 13.2079V3.7925C2.48462 2.63695 3.42138 1.7002 4.57693 1.7002H5.88462M8.54065 4.83866H11.4096M8.54065 7.97712H11.4096M5.88462 11.0502V1.7002"
                  stroke="#026062"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              {displayName}
            </a>
          ) : (
            <span className="greyed-out small">{displayName}</span>
          )}
        </span>
      </Row>
      <Collapsible.Body className="d-flex w-100">
        <div className="col">
          {subsection.override && (
            <div className="row w-100 m-0 x-small ml-4 pt-2 pl-1 text-gray-700 flex-nowrap">
              <div>
                <Icon
                  src={Info}
                  className="x-small mr-1 text-primary-500"
                  style={{ height: "1.3em", width: "1.3em" }}
                />
              </div>
              <div>{intl.formatMessage(messages.sectionGradeOverridden)}</div>
            </div>
          )}
          <ProblemScoreDrawer
            problemScores={problemScores}
            subsection={subsection}
          />
        </div>
      </Collapsible.Body>
    </Collapsible.Advanced>
  );
};

SubsectionTitleCell.propTypes = {
  intl: intlShape.isRequired,
  subsection: PropTypes.shape({
    blockKey: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    learnerHasAccess: PropTypes.bool.isRequired,
    override: PropTypes.shape({
      system: PropTypes.string,
      reason: PropTypes.string,
    }),
    problemScores: PropTypes.arrayOf(
      PropTypes.shape({
        earned: PropTypes.number.isRequired,
        possible: PropTypes.number.isRequired,
      })
    ).isRequired,
    url: PropTypes.string,
  }).isRequired,
};

export default injectIntl(SubsectionTitleCell);
