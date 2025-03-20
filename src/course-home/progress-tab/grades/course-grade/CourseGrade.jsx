import React from "react";
import { useSelector } from "react-redux";
import { injectIntl, intlShape } from "@edx/frontend-platform/i18n";

import { useModel } from "../../../../generic/model-store";

import CourseGradeFooter from "./CourseGradeFooter";
import CourseGradeHeader from "./CourseGradeHeader";
import GradeBar from "./GradeBar";
import CreditInformation from "../../credit-information/CreditInformation";

import messages from "../messages";

const CourseGrade = ({ intl }) => {
  const { courseId } = useSelector((state) => state.courseHome);

  const {
    creditCourseRequirements,
    gradesFeatureIsFullyLocked,
    gradesFeatureIsPartiallyLocked,
    gradingPolicy: { gradeRange },
  } = useModel("progress", courseId);

  const passingGrade = Number(
    (Math.min(...Object.values(gradeRange)) * 100).toFixed(0)
  );

  const applyLockedOverlay = gradesFeatureIsFullyLocked ? "locked-overlay" : "";

  return (
    <section className="text-dark-700 my-4 rounded raised-card">
      {(gradesFeatureIsFullyLocked || gradesFeatureIsPartiallyLocked) && (
        <CourseGradeHeader />
      )}
      <div
        className={applyLockedOverlay}
        aria-hidden={gradesFeatureIsFullyLocked}
      >
        <div className="row w-100 m-0 p-4">
          <div className="col-12 col-sm-6 p-0 pr-sm-5.5">
            <h2>
              <svg
                width="54"
                height="54"
                viewBox="0 0 54 54"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_d_8651_16831)">
                  <circle
                    cx="27.1951"
                    cy="24.2742"
                    r="15.9236"
                    fill="#FDBD1A"
                  />
                  <circle
                    cx="27.1951"
                    cy="24.2742"
                    r="15.1609"
                    stroke="white"
                    stroke-width="1.5254"
                  />
                </g>
                <path
                  d="M33.1416 28.9299L32.7103 28.0277L33.1416 28.9299ZM33.5717 28.32H32.5717H33.5717ZM26.595 31.1609L26.1374 32.0501L26.595 31.1609ZM28.4236 31.1852L28.8549 32.0874L28.4236 31.1852ZM18.6662 21.7636L18.2317 20.863L18.6662 21.7636ZM18.6662 22.3721L18.2317 23.2728L18.6662 22.3721ZM27.948 26.4177L28.3825 27.3184L27.948 26.4177ZM27.0522 26.4177L27.4867 25.5171L27.0522 26.4177ZM36.334 21.7636L36.7685 20.863L36.334 21.7636ZM36.334 22.3721L35.8995 21.4715L36.334 22.3721ZM22.2655 28.933L22.723 28.0438L22.2655 28.933ZM27.948 17.718L27.5135 18.6187L27.948 17.718ZM27.0522 17.718L27.4867 18.6187L27.0522 17.718ZM37.4251 22.0561C37.4251 21.5038 36.9774 21.0561 36.4251 21.0561C35.8728 21.0561 35.4251 21.5038 35.4251 22.0561H37.4251ZM35.4251 25.8811C35.4251 26.4334 35.8728 26.8811 36.4251 26.8811C36.9774 26.8811 37.4251 26.4334 37.4251 25.8811H35.4251ZM27.5135 18.6187L35.8995 22.6643L36.7685 20.863L28.3825 16.8174L27.5135 18.6187ZM35.8995 21.4715L27.5135 25.5171L28.3825 27.3184L36.7685 23.2728L35.8995 21.4715ZM19.1007 22.6643L27.4867 18.6187L26.6176 16.8174L18.2317 20.863L19.1007 22.6643ZM27.4867 25.5171L22.2944 23.0122L21.4254 24.8135L26.6176 27.3184L27.4867 25.5171ZM22.2944 23.0122L19.1007 21.4715L18.2317 23.2728L21.4254 24.8135L22.2944 23.0122ZM20.8599 23.9128V28.3352H22.8599V23.9128H20.8599ZM21.8079 29.8222L26.1374 32.0501L27.0525 30.2717L22.723 28.0438L21.8079 29.8222ZM28.8549 32.0874L33.5728 29.8321L32.7103 28.0277L27.9923 30.283L28.8549 32.0874ZM34.5717 28.32L34.5717 23.9128L32.5717 23.9128L32.5717 28.32H34.5717ZM33.5728 29.8321C34.1104 29.5752 34.5717 29.0339 34.5717 28.32H32.5717C32.5717 28.1072 32.7059 28.0298 32.7103 28.0277L33.5728 29.8321ZM26.1374 32.0501C26.9726 32.4799 28.008 32.4922 28.8549 32.0874L27.9923 30.283C27.7058 30.4199 27.3282 30.4135 27.0525 30.2717L26.1374 32.0501ZM18.2317 20.863C17.7913 21.0754 17.4526 21.5159 17.4526 22.0679C17.4526 22.6199 17.7913 23.0604 18.2317 23.2728L19.1007 21.4715C19.2563 21.5465 19.4526 21.7514 19.4526 22.0679C19.4526 22.3843 19.2563 22.5892 19.1007 22.6643L18.2317 20.863ZM27.5135 25.5171C27.5175 25.5151 27.5181 25.5154 27.5148 25.5162C27.5115 25.5169 27.5063 25.5176 27.5001 25.5176C27.4938 25.5176 27.4887 25.5169 27.4854 25.5162C27.4821 25.5154 27.4827 25.5151 27.4867 25.5171L26.6176 27.3184C27.1682 27.584 27.832 27.584 28.3825 27.3184L27.5135 25.5171ZM35.8995 22.6643C35.7439 22.5892 35.5475 22.3843 35.5475 22.0679C35.5475 21.7514 35.7439 21.5465 35.8995 21.4715L36.7685 23.2728C37.2088 23.0604 37.5475 22.6199 37.5475 22.0679C37.5475 21.5159 37.2088 21.0754 36.7685 20.863L35.8995 22.6643ZM20.8599 28.3352C20.8599 29.0247 21.2921 29.5568 21.8079 29.8222L22.723 28.0438C22.7337 28.0493 22.8599 28.1304 22.8599 28.3352H20.8599ZM28.3825 16.8174C27.832 16.5518 27.1682 16.5518 26.6176 16.8174L27.4867 18.6187C27.4827 18.6206 27.4821 18.6203 27.4854 18.6196C27.4887 18.6189 27.4938 18.6182 27.5001 18.6182C27.5063 18.6182 27.5115 18.6189 27.5148 18.6196C27.5181 18.6203 27.5175 18.6206 27.5135 18.6187L28.3825 16.8174ZM35.4251 22.0561V25.8811H37.4251V22.0561H35.4251Z"
                  fill="black"
                />
                <defs>
                  <filter
                    id="filter0_d_8651_16831"
                    x="0.66305"
                    y="0.0995815"
                    width="53.064"
                    height="53.0645"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="2.35743" />
                    <feGaussianBlur stdDeviation="5.30422" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_8651_16831"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_8651_16831"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
              {creditCourseRequirements
                ? intl.formatMessage(messages.gradesAndCredit)
                : intl.formatMessage(messages.grades)}
            </h2>
            <p className="small">
              {intl.formatMessage(messages.courseGradeBody)}
            </p>
          </div>
          <GradeBar passingGrade={passingGrade} />
        </div>
        <div className="row w-100 m-0 px-4">
          <CreditInformation />
        </div>
        <CourseGradeFooter passingGrade={passingGrade} />
      </div>
    </section>
  );
};

CourseGrade.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(CourseGrade);
