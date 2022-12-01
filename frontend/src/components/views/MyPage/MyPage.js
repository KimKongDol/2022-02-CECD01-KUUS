import React, { useEffect } from 'react'
import axios from 'axios';
import { withRouter, BrowserRouter } from 'react-router-dom';
import { Container, Row, Col, Button, Card, CardTitle, CardText } from 'reactstrap';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../../../_actions/user_action';
import { scheduleJob } from 'node-schedule';
import MyPageSchedule from './MyPageSchedule';

// 무한반복 해결하기 
// https://sir.kr/qa/422561

function MyPage({ match }) {

    const dispatch = useDispatch();

    const [users, setUsers] = useState([]);
    const [mySchedule, setMySchedule] = useState([])
    const [sharedSchedule, setSharedSchedule] = useState([])

    function detailClick(e) {
        window.location.href = 'http://localhost:3000/mypage/schedules/638759c936462573ed5c6e23'
    }

    async function getUsers() {
        dispatch(auth())
            .then(response =>
                axios.get('http://localhost:5000/api/mypage', {
                    withCredentials: true
                })
                    .then((response) => {
                        // console.log('front MyPage.js입니다 response: ')
                        // console.log(response)
                        setUsers(response.data)
                        // console.log('front MyPage.js입니다 response.data:');
                        console.log(response.data)
                        // const myschedules = response.data["myschedules"]
                        setMySchedule(response.data["myschedules"][0])
                        // setScheAuthor(response.data["myschedules"][0].author)
                        setSharedSchedule(response.data["sharedschedules"][0])

                    }).catch(function (error) {
                        console.error(error)
                    })
            )

    }

    useEffect(function () {
        getUsers()
    }, [])

    return (
        <div>
            <div className="static-slider-head-top static-slider-head">
                <Container>
                    <Row className="justify-content-center" >
                        <Col md="7" className="text-center">
                            <h4 className="title">마이페이지</h4>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="bottom-spacer">
                <div className="spacer" id="card-component">
                    <Container>
                        <Row className="justify-content-center">
                            <Col md="7" className="text-center">
                                <h2 className="title font-bold">
                                    {users.name}님 환영합니다 !</h2>
                                <h6 className="subtitle">{users.email}</h6>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <Container>
                    <Row>
                        <Col md="6">
                            <h3 className="title font-bold text-center">나의 일정</h3>
                            <Card body className="card-shadow">
                                <CardTitle className='font-bold display-7'>{mySchedule.ScheduleName}</CardTitle>
                                <CardText></CardText>
                                <Button onClick = {detailClick}>자세히 보기</Button>
                            </Card>
                        </Col>
                        <Col md="6">
                            <h3 className="title font-bold text-center">공유받은 일정</h3>
                            <Card body className="card-shadow">
                            <CardTitle className='font-bold display-7'>{sharedSchedule.ScheduleName}</CardTitle>
                                <CardText></CardText>
                                <Button onClick={detailClick}>자세히 보기</Button>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>

    )
}

export default withRouter(MyPage)