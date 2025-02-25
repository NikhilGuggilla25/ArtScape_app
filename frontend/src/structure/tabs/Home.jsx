import React, { useState } from 'react';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// import { Button } from 'react-bootstrap';

import { FileEarmarkPlus, PlusSquare } from 'react-bootstrap-icons';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useMediaQuery } from 'react-responsive';

import { Section } from '../../components/Section';
import PlaceholderCard from '../../components/PlaceholderCard';

import UploadDrawingsModal from './drawings/UploadDrawing';
import DrawingCard from './drawings/DrawingCard';
import PlaylistCard from './playlists/PlaylistCard';

import { playlistCreateNew } from '../../sockets/sEmits';

import { getDrawingsLimited } from './drawings/selector';
import { getPlaylistsLimited } from './playlists/selector';
import { setRefreshDrawing } from './drawings/Drawings.slice';
import { setTab } from './Tabs.slice';
import { setShowNewPlaylist } from './playlists/Playlists.slice';

const mapStateToProps = (state) => {
    return { 
        drawings:   getDrawingsLimited(state),
        playlists:  getPlaylistsLimited(state)
     }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setRefreshDrawing:      () => dispatch(setRefreshDrawing(true)),
        handleTab:          (name) => dispatch(setTab(name)),
        setShowNewPlaylist:     () => dispatch(setShowNewPlaylist(true))
    }
}

const Home = ({ drawings, playlists, setRefreshDrawing, handleTab, setShowNewPlaylist }) => {
    const [showUpload, setShowUpload] = useState(false);

    const isMobile = useMediaQuery({ query: '(max-width: 464px)' });

    const carouselResponsive = {
        largeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 6,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 4,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 2.5,
        },
    };

    const handleFileUploaded = () => {
        window.showToast("Updating drawing previews...");
        setRefreshDrawing();
    };

    const renderDrawings = (list) =>
        list.length > 0
            ? list.map((item, index) => <DrawingCard drawing={item} key={index} />)
            : [1, 2, 3, 4, 5, 6, 7].map((_, index) => <PlaceholderCard key={index} />);

    const renderPlaylists = (list) =>
        list.length > 0 ? (
            <Carousel responsive={carouselResponsive} swipeable={true} draggable={true} infinite={true} arrows={!isMobile}>
                {list.map((item, index) => (
                    <PlaylistCard playlist={item} key={index} />
                ))}
            </Carousel>
        ) : (
            <div className="center w-100">
                {/* <Button
                    onClick={() => {
                        setShowNewPlaylist();
                        playlistCreateNew();
                    }}
                >
                    Start by creating a new playlist now
                </Button> */}
            </div>
        );

    return (
        <Container>
            <Row>
                <Col>
                    <Section
                        sectionTitle="Drawings"
                        // sectionButton="Upload new drawing"
                        buttonIcon={FileEarmarkPlus}
                        sectionButtonHandler={() => setShowUpload(true)}
                        titleButtonHandler={() => handleTab("drawings")}
                        display=" None"
                    >
                        <Carousel
                            responsive={carouselResponsive}
                            swipeable={true}
                            draggable={true}
                            arrows={!isMobile}
                        >
                            {renderDrawings(drawings)}
                        </Carousel>
                    </Section>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Section
                        sectionTitle="Playlists"
                        buttonIcon={PlusSquare}
                        sectionButtonHandler={() => {
                            setShowNewPlaylist();
                            playlistCreateNew();
                        }}
                        titleButtonHandler={() => handleTab("playlists")}
                        ssr
                    >
                        {renderPlaylists(playlists)}
                    </Section>
                </Col>
            </Row>
            <UploadDrawingsModal
                show={showUpload}
                handleClose={() => setShowUpload(false)}
                handleFileUploaded={handleFileUploaded}
            />
        </Container>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);