import React from 'react';
import { connect } from 'react-redux';
import { Media, Image, Grid, Row, Col, Pagination, Button } from 'react-bootstrap';
import _ from 'lodash';

import actions from '../actions/actions';
import PageLayout from './PageLayout.jsx';
import SearchBar from './SearchBar.jsx';
import PageTitle from './PageTitle.jsx';

import {getYoutubeUrl} from '../utils';


const Description = ({text}) => {
	const newText = text.length > 200 ? text.slice(0, 197) + '...' : text;
	return (
    <div className="description">
      {newText}
    </div>
	);
};

const Video = (props) => {
	const {
    id,
    title,
    description,
    thumbnail,
    publishDate,
    channelInfo,
    // tags
  } = props;
	const videoUrl = getYoutubeUrl(id);

	return (
    <div className="video">
      <Grid>
        <Row>
          <Col md={2}>
            <Image src={thumbnail.url} thumbnail responsive/>
          </Col>
          <Col md={10}>
            <Row className="title">
            	<Button bsStyle="link" target="_blank" href={videoUrl}><Media.Heading>{title}</Media.Heading></Button>
            </Row>
            <Row className="description">
              <Description text={description}/>
            </Row>
						<Row className="bottom-line">
							<Col md={3}>
								Author: {channelInfo.name}
							</Col>
							<Col md={4}>
								Published: {publishDate}
							</Col>
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
		<p><strong>{length} {result_word} found:</strong></p>
	);
};

const ResultsPageLayout = ({query, videos, totalLength, page, totalPages, updateQuery, submitSearch, requestPage}) => {
	return (
		<PageLayout>
	    <div className="results">
				<PageTitle size="small"/>
	      <SearchBar query={query} onChange={updateQuery} onSubmit={submitSearch} />
				<TotalLenghtMessage length={totalLength}/>
	      <VideosList videos={videos}/>
				<Pagination
					prev next ellipsis boundaryLinks maxButtons={5}
					activePage={page} items={totalPages} onSelect={requestPage}
					/>
	    </div>
		</PageLayout>
	);
};

const mapStateToProps = ({data: {query, videos, totalLength, page, totalPages}}) => ({query, videos, totalLength, page, totalPages});
export default connect(mapStateToProps, actions)(ResultsPageLayout);
