import React from 'react';
import { connect } from 'react-redux';
import { Image, Grid, Row, Col } from 'react-bootstrap';
import SearchBar from './SearchBar.jsx';
import _ from 'lodash';


const Description = ({text}) => {
	const newText = text.length > 100 ? text.slice(0, 97) + '...' : text;
	return (
    <div className="description">
      {newText}
    </div>
	);
};

const Video = (props) => {
	const {
    // id,
    title,
    description,
    thumbnail,
    // publishDate,
    // channelInfo,
    // tags
  } = props;

	return (
    <div className="video">
      <Grid>
        <Row>
          <Col md={2}>
            <Image src={thumbnail.url} thumbnail responsive/>
          </Col>
          <Col md={10}>
            <Row className="title">
              {title}
            </Row>
            <Row className="description">
              <Description text={description}/>
            </Row>
          </Col>
        </Row>
      </Grid>
    </div>
	);
};


const VideosList = ({videos}) => {
	const renderVideo = (video) => <Video key={_.get(video, 'id')} {...video} />;
	return (
    <div className="videos-list">
      {_.map(videos, renderVideo)}
    </div>
	);
};


export const ResultsPage = ({query, videos, onChange, onSubmit}) => {
	return (
    <div className="results">
      <SearchBar query={query} onChange={onChange} onSubmit={onSubmit} />
      <VideosList videos={videos}/>
    </div>
	);
};
