
import { Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

const SkeltonSubscription = (props: { count: number }) => {
    return (
        <Row className="row-sm">
            {
                Array(props.count).fill(0).map((_, number) => (
                    <Col key={number} sm={12} md={12} lg={4} xl={4} xxl={4}>
                        <Card className=" custom-card">
                            <Card.Header className=" d-flex custom-card-header border-bottom-0 ">
                                 <Skeleton width={100} height={18} borderRadius={5}/>
                                <div className="card-options">
                                    <Skeleton width={70} height={40} borderRadius={5}/>
                                </div>
                            </Card.Header>
                            <Card.Body style={{width: '100%'}}>
                                <Skeleton  height={18} borderRadius={5} count={5} style={{marginBottom: '0.8rem'}}/>
                            </Card.Body>
                            <Card.Footer  className='w-100'>
                                <Skeleton  height={18} borderRadius={5} style={{marginBottom: '0.8rem'}}/>
                            </Card.Footer>
                        </Card>
                    </Col>
                ))
            }
        </Row>
    )
}

export {SkeltonSubscription};