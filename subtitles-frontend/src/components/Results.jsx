import React from 'react';
import { connect } from 'react-redux';
import { Image, Grid, Row, Col } from 'react-bootstrap';
import _ from 'lodash';

import actions from '../actions/actions';
import PageLayout from './PageLayout.jsx';
import SearchBar from './SearchBar.jsx';
import PageTitle from './PageTitle.jsx';


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

const TotalLenghtMessage = ({length}) => {
	const result_word = length === 1 ? 'result': 'results';
	return (
		<p><strong>{length || 0} {result_word} found:</strong></p>
	);
};


const ResultsPageLayout = ({query, videos, total_length, updateQuery, submitSearch}) => {
	return (
		<PageLayout>
	    <div className="results">
				<PageTitle size="small"/>
	      <SearchBar query={query} onChange={updateQuery} onSubmit={submitSearch} />
				<TotalLenghtMessage length={total_length}/>
	      <VideosList videos={videos}/>
	    </div>
		</PageLayout>
	);
};

const mapStateToProps = ({query, videos, total_length}) => ({query, videos, total_length});
export const ResultsPage = connect(mapStateToProps, actions)(ResultsPageLayout);
