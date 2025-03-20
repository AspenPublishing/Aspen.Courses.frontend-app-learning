import React from "react";
import { injectIntl, intlShape } from "@edx/frontend-platform/i18n";

import CompletionDonutChart from "./CompletionDonutChart";
import messages from "./messages";

const CourseCompletion = ({ intl }) => (
  <section className="text-dark-700 mb-4 rounded raised-card p-4">
    <div className="row w-100 m-0">
      <div className="col-12 col-sm-6 col-md-7 p-0">
        <h2>
          <svg
            width="54"
            height="54"
            viewBox="0 0 54 54"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_d_8651_16804)">
              <circle cx="27.1951" cy="24.2742" r="15.9236" fill="#FDBD1A" />
              <circle
                cx="27.1951"
                cy="24.2742"
                r="15.1609"
                stroke="white"
                stroke-width="1.5254"
              />
            </g>
            <g clip-path="url(#clip0_8651_16804)">
              <path
                d="M26.8328 27.214C30.0282 27.214 32.6185 24.6237 32.6185 21.4283C32.6185 18.2329 30.0282 15.6426 26.8328 15.6426C23.6375 15.6426 21.0471 18.2329 21.0471 21.4283C21.0471 24.6237 23.6375 27.214 26.8328 27.214Z"
                stroke="#000001"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M26.8329 23.9993C28.2531 23.9993 29.4043 22.848 29.4043 21.4279C29.4043 20.0077 28.2531 18.8564 26.8329 18.8564C25.4127 18.8564 24.2615 20.0077 24.2615 21.4279C24.2615 22.848 25.4127 23.9993 26.8329 23.9993Z"
                stroke="#000001"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M25.7144 27.1109L24.5829 31.868C24.5605 31.9584 24.5191 32.043 24.4615 32.1162C24.4039 32.1893 24.3313 32.2494 24.2486 32.2923C24.1614 32.3302 24.0673 32.3497 23.9722 32.3497C23.8771 32.3497 23.783 32.3302 23.6958 32.2923L19.4272 30.428C19.3377 30.3857 19.2589 30.3236 19.1968 30.2465C19.1347 30.1694 19.0908 30.0792 19.0685 29.9827C19.0463 29.8862 19.0462 29.7859 19.0682 29.6893C19.0902 29.5927 19.1339 29.5024 19.1958 29.4252L22.5001 25.2852"
                stroke="#000001"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M28.2859 27.0467L29.443 31.8682C29.466 31.9601 29.5091 32.0458 29.5691 32.1192C29.6291 32.1925 29.7046 32.2517 29.7902 32.2924C29.875 32.3308 29.9671 32.3506 30.0602 32.3506C30.1533 32.3506 30.2453 32.3308 30.3302 32.2924L34.573 30.4282C34.6639 30.3863 34.7438 30.3239 34.8063 30.2458C34.8688 30.1676 34.9122 30.076 34.933 29.9782C34.9574 29.8824 34.9585 29.7823 34.9361 29.6861C34.9137 29.5899 34.8686 29.5004 34.8045 29.4253L31.3587 25.041"
                stroke="#000001"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <filter
                id="filter0_d_8651_16804"
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
                  result="effect1_dropShadow_8651_16804"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_8651_16804"
                  result="shape"
                />
              </filter>
              <clipPath id="clip0_8651_16804">
                <rect
                  width="18"
                  height="18"
                  fill="white"
                  transform="translate(18 15)"
                />
              </clipPath>
            </defs>
          </svg>
          {intl.formatMessage(messages.courseCompletion)}
        </h2>
        <p className="small">{intl.formatMessage(messages.completionBody)}</p>
      </div>
      <div className="col-12 col-sm-6 col-md-5 mt-sm-n3 p-0 text-center">
        <CompletionDonutChart />
      </div>
    </div>
  </section>
);

CourseCompletion.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(CourseCompletion);
