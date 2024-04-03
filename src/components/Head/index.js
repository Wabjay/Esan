import React from "react";
import { useEffect } from "react";
import PropTypes from "prop-types";

import { HeadProvider as Head } from 'react-head';

import METADATA from "../../constants/metadata";

import Meta from "./Meta";

const propTypes = {
  title: PropTypes.string.isRequired,
};

const defaultProps = {
  title: "",
};

const HeadShare = (props) => {
  const { title, ...attr } = props;

  useEffect(() => {
    document.body.setAttribute("data-sidebar", "dark");
  });

  return (
    <Head>
      <title>{(title ? title + " | " : "") + METADATA.APP_NAME}</title>

      <Meta {...attr} />
    </Head>
  );
};

HeadShare.propTypes = propTypes;

HeadShare.defaultProps = defaultProps;

export default HeadShare;
