import { Row, Col, Card, } from 'react-bootstrap';
import React from 'react';
import Skelton from 'react-loading-skeleton';

const SkeltonLoadingCard = (props: { count: number }) => {

    return (
        <React.Fragment>

            <Row>
                <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                    <Row className='row-cols-xxl-3'>
                        {
                            Array(props.count).fill(0).map((_, idx) => (
                                <Col xl={3} lg={12} md={12} xs={12} key={idx}>
                                    <Card className="sales-card">
                                        <Row>
                                            <div className="col-8">
                                                <div className="ps-4 pt-4 pe-3 pb-4">
                                                    <div className="">
                                                        <Skelton height={15}/>
                                                    </div>
                                                    <div className="pb-0 mt-0">
                                                        <div className="d-flex">
                                                            <h4 className="tx-22 font-weight-semibold mb-2">
                                                                <Skelton width={100} height={30}/>
                                                            </h4>
                                                        </div>
                                                        <p className="mb-0 tx-12  text-muted">
                                                            <Skelton width={120} height={15}/>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-4">
                                                <div className="circle-icon bg-warning-transparent text-center align-self-center overflow-hidden">
                                                    <Skelton width={50} borderRadius={5} height={55}/>
                                                </div>
                                            </div>
                                        </Row>
                                    </Card>
                                </Col>
                            ))
                        }
                    </Row>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export{ SkeltonLoadingCard};